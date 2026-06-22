/**
 * Calculadora de Arbitragem (FPT 2026 — eventos estaduais).
 * Funções de cálculo são puras e expostas em ArbitragemCalc (testáveis no Node).
 * A ligação com o DOM só roda no navegador.
 */
(function (global) {
  "use strict";

  // ---------- Formatação ----------
  function money(v) {
    var s = (Number(v) || 0).toFixed(2);
    var parts = s.split(".");
    var inteiro = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return "R$ " + inteiro + "," + parts[1];
  }
  function km1(v) { return String(Number(v) || 0).replace(".", ","); }

  // ---------- Regras (puras) ----------
  function faixaArbitroGeral(inscritos, faixas) {
    for (var i = 0; i < faixas.length; i++) {
      var f = faixas[i];
      if (f.ate === null || f.ate === undefined || inscritos <= f.ate) return f;
    }
    return faixas[faixas.length - 1];
  }

  // 1 auxiliar a cada N quadras, mínimo 1 (AG não pode trabalhar sem auxiliar).
  function auxiliaresPorQuadras(quadras, porAux) {
    var q = Math.max(0, Math.floor(Number(quadras) || 0));
    var n = Math.ceil(q / (porAux || 4));
    return Math.max(1, n);
  }

  function calcular(inp, data) {
    var faixa = faixaArbitroGeral(inp.inscritos, data.faixasArbitroGeral);
    var diariaAG = faixa.valor;

    var dias = inp.dias || [];
    var numDias = dias.length;

    // Árbitro Geral é fixo: conta em todos os dias do torneio.
    var totalAG = diariaAG * numDias;

    // Árbitro Auxiliar é opcional por dia (checkbox). Dia desmarcado = 0 auxiliares.
    var auxPorDia = dias.map(function (d) {
      if (d.arbitroAuxiliar === false) return 0;
      return auxiliaresPorQuadras(d.quadras, data.quadrasPorAuxiliar);
    });
    var totalAuxDiarias = auxPorDia.reduce(function (a, b) { return a + b; }, 0);
    var totalAux = data.valorArbitroAuxiliar * totalAuxDiarias;

    // Deslocamento: cada "ida e volta" = 2 × km de ida. O custo de uma ida e volta
    // é multiplicado pela QUANTIDADE de idas e voltas (não pelos dias do torneio).
    var voltas = Number(inp.idasVoltas);
    if (isNaN(voltas) || voltas < 0) voltas = 0;
    var kmEf = (Number(inp.km) || 0) * 2;                       // km de uma ida e volta
    var custoPorIdaVolta = kmEf * data.valorKm + (Number(inp.pedagios) || 0);
    var deslocamento = custoPorIdaVolta * voltas;

    var alimentacao = 0;
    if (inp.incluirAlimentacao) {
      alimentacao = (Number(inp.refeicoesPorDia) || 0) * (Number(inp.valorRefeicao) || 0) * numDias;
    }

    var totalFinal = totalAG + totalAux + deslocamento + alimentacao;

    return {
      faixa: faixa, diariaAG: diariaAG, numDias: numDias, totalAG: totalAG,
      auxPorDia: auxPorDia, totalAuxDiarias: totalAuxDiarias, totalAux: totalAux,
      voltas: voltas, kmEf: kmEf, custoPorIdaVolta: custoPorIdaVolta, deslocamento: deslocamento,
      alimentacao: alimentacao, totalFinal: totalFinal
    };
  }

  function gerarRecibo(inp, c, data) {
    var L = [];
    L.push(inp.arena || "[Nome da Arena]");
    var periodo = inp.periodoLabel ? (" — " + inp.periodoLabel) : "";
    L.push("Arbitragem" + periodo + " (" + c.numDias + (c.numDias === 1 ? " dia" : " dias") + ")");
    L.push("Total de Participantes: " + inp.inscritos);
    L.push(c.faixa.label + ": " + money(c.diariaAG) + "/dia");
    L.push("Arbitragem Geral: " + c.diariaAG + " x " + c.numDias + " dia(s) = " + money(c.totalAG));
    L.push("Arbitragem Auxiliar: " + data.valorArbitroAuxiliar + " x " + c.totalAuxDiarias + " diária(s) = " + money(c.totalAux));
    if (inp.dias && inp.dias.length) {
      var det = inp.dias.map(function (d, i) {
        return (d.label || ("Dia " + (i + 1))) + ": " +
          (d.arbitroAuxiliar === false ? "sem aux" : (c.auxPorDia[i] + " aux/" + (Number(d.quadras) || 0) + "q"));
      }).join("  |  ");
      L.push("  (" + det + ")");
    }
    L.push("Deslocamento: " + money(c.custoPorIdaVolta) + "/dia x " + c.voltas + " dia(s) = " + money(c.deslocamento));
    L.push("  (" + (Number(inp.km) || 0) + " km x 2 (ida/volta) = " + km1(c.kmEf) +
      " km/dia x " + c.voltas + " dia(s) + pedágios/dia " + money(inp.pedagios || 0) + ")");
    if (c.alimentacao > 0) {
      L.push("Alimentação: " + inp.refeicoesPorDia + " ref/dia x " + money(inp.valorRefeicao) +
        " x " + c.numDias + " dia(s) = " + money(c.alimentacao));
    }
    L.push("Total Arbitragem: " + money(c.totalFinal));
    L.push(data.arbitro.nome);
    L.push("Pix: " + data.arbitro.pix);
    return L.join("\n");
  }

  global.ArbitragemCalc = {
    money: money,
    faixaArbitroGeral: faixaArbitroGeral,
    auxiliaresPorQuadras: auxiliaresPorQuadras,
    calcular: calcular,
    gerarRecibo: gerarRecibo
  };

  // ---------- DOM (só no navegador) ----------
  if (typeof document === "undefined") return;

  document.addEventListener("DOMContentLoaded", function () {
    if (typeof arbitragemData === "undefined") return;
    var data = arbitragemData;
    var $ = function (id) { return document.getElementById(id); };
    var form = $("arb-form");
    if (!form) return;

    // Preenche dados do recibo fixos (exibição)
    if ($("arb-arbitro-nome")) $("arb-arbitro-nome").textContent = data.arbitro.nome;
    if ($("arb-arbitro-pix")) $("arb-arbitro-pix").textContent = data.arbitro.pix;

    // Default do valor da refeição (quantidade é fixa = data.refeicoesPorDiaPadrao)
    if ($("arb-valor-refeicao") && !$("arb-valor-refeicao").value) $("arb-valor-refeicao").value = data.valorRefeicaoSugerido;

    // Estado das quadras / Árbitro Auxiliar por data (preserva valores ao mudar o período)
    var quadrasPorData = {};
    var auxAtivoPorData = {};

    function num(id) {
      var el = $(id); if (!el) return 0;
      var v = parseFloat((el.value || "").replace(",", "."));
      return isNaN(v) || v < 0 ? 0 : v;
    }
    function intNum(id) {
      var el = $(id); if (!el) return 0;
      var v = parseInt(el.value, 10);
      return isNaN(v) || v < 0 ? 0 : v;
    }
    function pad(n) { return (n < 10 ? "0" : "") + n; }
    function labelData(d) { return pad(d.getDate()) + "/" + pad(d.getMonth() + 1); }
    function isoData(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }

    function listaDias() {
      var ini = $("arb-data-inicio").value;
      var fim = $("arb-data-fim").value;
      if (!ini || !fim) return [];
      var d0 = new Date(ini + "T00:00:00");
      var d1 = new Date(fim + "T00:00:00");
      if (isNaN(d0.getTime()) || isNaN(d1.getTime()) || d1 < d0) return [];
      var dias = [], cur = new Date(d0), guard = 0;
      while (cur <= d1 && guard < 90) { dias.push(new Date(cur)); cur.setDate(cur.getDate() + 1); guard++; }
      return dias;
    }

    // (Re)constrói os campos de quadras por dia
    function montarDias() {
      var cont = $("arb-dias");
      cont.innerHTML = "";
      var dias = listaDias();
      if (dias.length === 0) {
        cont.innerHTML = '<p class="arb__dias-vazio">Informe as datas de início e fim para listar os dias.</p>';
        return;
      }
      dias.forEach(function (d) {
        var iso = isoData(d);
        var valor = (iso in quadrasPorData) ? quadrasPorData[iso] : 4;
        quadrasPorData[iso] = valor;
        var temAux = (iso in auxAtivoPorData) ? auxAtivoPorData[iso] : true;
        auxAtivoPorData[iso] = temAux;

        var row = document.createElement("div");
        row.className = "arb__dia" + (temAux ? "" : " arb__dia--sem-aux");

        var lbl = document.createElement("span");
        lbl.className = "arb__dia-data";
        lbl.textContent = labelData(d);

        var grp = document.createElement("div");
        grp.className = "arb__dia-campo";
        var cap = document.createElement("label");
        cap.className = "arb__dia-cap";
        cap.textContent = "Quadras";
        var inp = document.createElement("input");
        inp.type = "number"; inp.min = "0"; inp.step = "1";
        inp.className = "arb__input arb__dia-quadras";
        inp.value = valor;
        var aux = document.createElement("span");
        aux.className = "arb__dia-aux";
        function refresh() {
          var q = parseInt(inp.value, 10); if (isNaN(q) || q < 0) q = 0;
          quadrasPorData[iso] = q;
          if (auxAtivoPorData[iso] === false) {
            aux.textContent = "sem auxiliar";
          } else {
            var n = ArbitragemCalc.auxiliaresPorQuadras(q, data.quadrasPorAuxiliar);
            aux.textContent = n + (n === 1 ? " auxiliar" : " auxiliares");
          }
        }
        inp.addEventListener("input", function () { refresh(); atualizar(); });

        // Lado direito: nº de auxiliares + checkbox "Árbitro Auxiliar" do dia
        var extra = document.createElement("div");
        extra.className = "arb__dia-extra";
        var auxLbl = document.createElement("label");
        auxLbl.className = "arb__dia-ag";
        var auxChk = document.createElement("input");
        auxChk.type = "checkbox"; auxChk.checked = temAux;
        var auxTxt = document.createElement("span");
        auxTxt.textContent = "Árbitro Auxiliar";
        auxChk.addEventListener("change", function () {
          auxAtivoPorData[iso] = auxChk.checked;
          row.classList.toggle("arb__dia--sem-aux", !auxChk.checked);
          inp.disabled = !auxChk.checked;
          refresh();
          atualizar();
        });
        auxLbl.appendChild(auxChk);
        auxLbl.appendChild(auxTxt);
        extra.appendChild(aux);
        extra.appendChild(auxLbl);

        inp.disabled = !temAux;
        refresh();

        grp.appendChild(cap);
        grp.appendChild(inp);
        row.appendChild(lbl);
        row.appendChild(grp);
        row.appendChild(extra);
        cont.appendChild(row);
      });
    }

    function lerEntrada() {
      var dias = listaDias().map(function (d) {
        var iso = isoData(d);
        return {
          label: labelData(d),
          quadras: (iso in quadrasPorData) ? quadrasPorData[iso] : 4,
          arbitroAuxiliar: (iso in auxAtivoPorData) ? auxAtivoPorData[iso] : true
        };
      });
      var periodoLabel = dias.length ? (dias[0].label + " a " + dias[dias.length - 1].label) : "";
      return {
        arena: $("arb-arena").value.trim(),
        inscritos: intNum("arb-inscritos"),
        dias: dias,
        periodoLabel: periodoLabel,
        km: num("arb-km"),
        idasVoltas: num("arb-ida-volta-qtd"),
        pedagios: num("arb-pedagios"),
        incluirAlimentacao: $("arb-incluir-alimentacao").checked,
        refeicoesPorDia: data.refeicoesPorDiaPadrao, // fixo (2)
        valorRefeicao: num("arb-valor-refeicao")
      };
    }

    function linha(rotulo, valor, total) {
      var div = document.createElement("div");
      div.className = "arb__linha" + (total ? " arb__linha--total" : "");
      var r = document.createElement("span"); r.textContent = rotulo;
      var v = document.createElement("strong"); v.textContent = valor;
      div.appendChild(r); div.appendChild(v);
      return div;
    }

    function atualizar() {
      var inp = lerEntrada();
      var c = ArbitragemCalc.calcular(inp, data);

      // Mostra/oculta campos de alimentação
      var alimBox = $("arb-alimentacao-campos");
      if (alimBox) alimBox.style.display = inp.incluirAlimentacao ? "" : "none";

      var resumo = $("arb-resumo");
      resumo.innerHTML = "";
      if (inp.dias.length === 0) {
        resumo.appendChild(linha("Período", "Informe as datas do torneio", false));
      } else {
        resumo.appendChild(linha("Período", inp.periodoLabel + " (" + c.numDias + " dia(s))", false));
        resumo.appendChild(linha(c.faixa.label, ArbitragemCalc.money(c.diariaAG) + "/dia", false));
        resumo.appendChild(linha("Árbitro Geral (" + c.numDias + " dia(s))", ArbitragemCalc.money(c.totalAG), false));
        resumo.appendChild(linha("Auxiliares (" + c.totalAuxDiarias + " diária(s))", ArbitragemCalc.money(c.totalAux), false));
        resumo.appendChild(linha("Deslocamento (" + ArbitragemCalc.money(c.custoPorIdaVolta) + "/dia × " + c.voltas + " dia(s))", ArbitragemCalc.money(c.deslocamento), false));
        if (inp.incluirAlimentacao) {
          resumo.appendChild(linha("Alimentação (" + inp.refeicoesPorDia + " ref/dia × " + c.numDias + ")", ArbitragemCalc.money(c.alimentacao), false));
        }
        resumo.appendChild(linha("Total Final", ArbitragemCalc.money(c.totalFinal), true));
      }

      $("arb-recibo").value = ArbitragemCalc.gerarRecibo(inp, c, data);
    }

    // Recalcula quando as datas mudam (reconstrói os dias) e em qualquer input
    $("arb-data-inicio").addEventListener("change", function () { montarDias(); atualizar(); });
    $("arb-data-fim").addEventListener("change", function () { montarDias(); atualizar(); });
    form.addEventListener("input", atualizar);
    form.addEventListener("submit", function (e) { e.preventDefault(); atualizar(); });

    // Botão Google Maps (abre a rota para você ver os km)
    $("arb-maps").addEventListener("click", function () {
      var origem = encodeURIComponent($("arb-origem").value.trim());
      var destino = encodeURIComponent($("arb-destino").value.trim());
      var url = "https://www.google.com/maps/dir/?api=1";
      if (origem) url += "&origin=" + origem;
      if (destino) url += "&destination=" + destino;
      window.open(url, "_blank", "noopener");
    });

    // Enviar no WhatsApp
    $("arb-whatsapp").addEventListener("click", function () {
      var txt = encodeURIComponent($("arb-recibo").value);
      window.open("https://wa.me/?text=" + txt, "_blank", "noopener");
    });

    montarDias();
    atualizar();
  });
})(typeof window !== "undefined" ? window : globalThis);

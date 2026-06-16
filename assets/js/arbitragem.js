/**
 * Calculadora de Arbitragem.
 * As funções de cálculo são puras e expostas em ArbitragemCalc (testáveis no Node).
 * A ligação com o DOM só roda no navegador.
 */
(function (global) {
  "use strict";

  // ---------- Formatação de moeda (pt-BR, determinística) ----------
  function money(v) {
    var s = (Number(v) || 0).toFixed(2);          // "1234.50"
    var parts = s.split(".");
    var inteiro = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "."); // "1.234"
    return "R$ " + inteiro + "," + parts[1];
  }

  // ---------- Regras de negócio (puras) ----------
  function faixaArbitroGeral(inscritos, faixas) {
    for (var i = 0; i < faixas.length; i++) {
      var f = faixas[i];
      if (f.ate === null || f.ate === undefined || inscritos <= f.ate) return f;
    }
    return faixas[faixas.length - 1];
  }

  function calcular(inp, data) {
    var faixa = faixaArbitroGeral(inp.inscritos, data.faixasArbitroGeral);
    var diariaAG = faixa.valor;
    var totalAG = diariaAG * inp.diasAG;
    var totalAux = data.valorArbitroAuxiliar * inp.diasAux;
    var custoDeslocamento = inp.km * data.valorKm + inp.pedagios;
    var custoRefeicoes = (inp.refeicoes || 0) * data.valorRefeicao;
    var totalFinal = totalAG + totalAux + custoDeslocamento + custoRefeicoes;
    return {
      faixa: faixa,
      diariaAG: diariaAG,
      totalAG: totalAG,
      totalAux: totalAux,
      custoDeslocamento: custoDeslocamento,
      custoRefeicoes: custoRefeicoes,
      totalFinal: totalFinal
    };
  }

  function gerarRecibo(inp, c, data) {
    var L = [];
    L.push(inp.arena || "[Nome da Arena]");
    L.push("Arbitragem");
    L.push("Total de Participantes: " + inp.inscritos);
    L.push(c.faixa.label + " R$ " + c.diariaAG);
    L.push("Arbitragem Geral: " + c.diariaAG + " x " + inp.diasAG + " = " + money(c.totalAG));
    L.push("Arbitragem Auxiliar " + inp.diasAux + " dias = " + money(c.totalAux));
    L.push("Deslocamento: " + inp.km + " km e Pedágios = " + money(c.custoDeslocamento));
    if (c.custoRefeicoes > 0) {
      L.push("Refeições: " + inp.refeicoes + " x R$ " + data.valorRefeicao + " = " + money(c.custoRefeicoes));
    }
    L.push("Total Arbitragem: " + money(c.totalFinal));
    L.push(inp.arbitro || "[Nome do Árbitro]");
    L.push("Pix: " + (inp.pix || "[Chave PIX]"));
    return L.join("\n");
  }

  global.ArbitragemCalc = {
    money: money,
    faixaArbitroGeral: faixaArbitroGeral,
    calcular: calcular,
    gerarRecibo: gerarRecibo
  };

  // ---------- Ligação com o DOM (só no navegador) ----------
  if (typeof document === "undefined") return;

  document.addEventListener("DOMContentLoaded", function () {
    if (typeof arbitragemData === "undefined") return;
    var data = arbitragemData;

    var $ = function (id) { return document.getElementById(id); };
    var form = $("arb-form");
    if (!form) return;

    // Preenche o nome do árbitro padrão
    if (data.arbitro && data.arbitro.nome && !$("arb-arbitro").value) {
      $("arb-arbitro").value = data.arbitro.nome;
    }
    if (data.arbitro && data.arbitro.pix && !$("arb-pix").value) {
      $("arb-pix").value = data.arbitro.pix;
    }

    function num(id) {
      var v = parseFloat(($(id).value || "").replace(",", "."));
      return isNaN(v) || v < 0 ? 0 : v;
    }
    function intNum(id) {
      var v = parseInt($(id).value, 10);
      return isNaN(v) || v < 0 ? 0 : v;
    }

    function lerEntrada() {
      return {
        arena: $("arb-arena").value.trim(),
        inscritos: intNum("arb-inscritos"),
        diasAG: intNum("arb-dias-ag"),
        diasAux: intNum("arb-dias-aux"),
        km: num("arb-km"),
        pedagios: num("arb-pedagios"),
        refeicoes: intNum("arb-refeicoes"),
        arbitro: $("arb-arbitro").value.trim(),
        pix: $("arb-pix").value.trim()
      };
    }

    function linhaResumo(rotulo, valor, destaque) {
      var div = document.createElement("div");
      div.className = "arb__linha" + (destaque ? " arb__linha--total" : "");
      var r = document.createElement("span");
      r.textContent = rotulo;
      var v = document.createElement("strong");
      v.textContent = valor;
      div.appendChild(r);
      div.appendChild(v);
      return div;
    }

    function atualizar() {
      var inp = lerEntrada();
      var c = ArbitragemCalc.calcular(inp, data);

      // Painel de resumo
      var resumo = $("arb-resumo");
      resumo.innerHTML = "";
      resumo.appendChild(linhaResumo("Diária do Árbitro Geral", c.faixa.label, false));
      resumo.appendChild(linhaResumo("Valor da diária (AG)", ArbitragemCalc.money(c.diariaAG), false));
      resumo.appendChild(linhaResumo("Total Árbitro Geral (" + inp.diasAG + " dia(s))", ArbitragemCalc.money(c.totalAG), false));
      resumo.appendChild(linhaResumo("Total Árbitro Auxiliar (" + inp.diasAux + " dia(s))", ArbitragemCalc.money(c.totalAux), false));
      resumo.appendChild(linhaResumo("Deslocamento (" + inp.km + " km + pedágios)", ArbitragemCalc.money(c.custoDeslocamento), false));
      if (c.custoRefeicoes > 0) {
        resumo.appendChild(linhaResumo("Refeições (" + inp.refeicoes + ")", ArbitragemCalc.money(c.custoRefeicoes), false));
      }
      resumo.appendChild(linhaResumo("Total Final", ArbitragemCalc.money(c.totalFinal), true));

      // Recibo
      $("arb-recibo").value = ArbitragemCalc.gerarRecibo(inp, c, data);
    }

    form.addEventListener("input", atualizar);
    form.addEventListener("submit", function (e) { e.preventDefault(); atualizar(); });

    // Copiar recibo
    $("arb-copiar").addEventListener("click", function () {
      var txt = $("arb-recibo").value;
      var btn = $("arb-copiar");
      function ok() {
        var antigo = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
        setTimeout(function () { btn.innerHTML = antigo; }, 1500);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(ok, fallback);
      } else {
        fallback();
      }
      function fallback() {
        var ta = $("arb-recibo");
        ta.removeAttribute("readonly");
        ta.select();
        try { document.execCommand("copy"); ok(); } catch (e) {}
        ta.setAttribute("readonly", "readonly");
        window.getSelection().removeAllRanges();
      }
    });

    // Enviar no WhatsApp (escolhe o contato no app)
    $("arb-whatsapp").addEventListener("click", function () {
      var txt = encodeURIComponent($("arb-recibo").value);
      window.open("https://wa.me/?text=" + txt, "_blank", "noopener");
    });

    atualizar();
  });
})(typeof window !== "undefined" ? window : globalThis);

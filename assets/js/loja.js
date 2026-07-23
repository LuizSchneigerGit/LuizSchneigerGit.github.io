/**
 * Loja — Luiz Schneiger Beach Tennis
 * Vitrine (fetch de produtos.json) + carrinho (localStorage) + checkout por WhatsApp.
 * HTML/CSS/JS puro, sem dependências. Servido estaticamente (GitHub Pages).
 */
(function () {
  "use strict";

  // ---------- Config ----------
  var WHATSAPP = "5546991155082";
  var STORAGE_KEY = "lsbt_carrinho";
  var BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  var CAT_LABEL = { aulas: "Aulas", acessorios: "Acessórios", vestuario: "Vestuário", equipamento: "Equipamento" };
  var CAT_ORDER = ["aulas", "vestuario", "acessorios", "equipamento"];
  var CAT_ICON = { aulas: "fa-table-tennis-paddle-ball", vestuario: "fa-shirt", acessorios: "fa-hand-sparkles", equipamento: "fa-baseball" };

  var $ = function (id) { return document.getElementById(id); };
  var produtos = [];
  var filtroAtivo = "todos";

  // ---------- Carrinho: estado + persistência segura ----------
  function carregarCarrinho() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch (e) { return []; }
  }
  function salvarCarrinho() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(carrinho)); } catch (e) {}
  }
  var carrinho = carregarCarrinho();

  function addProduto(p) {
    var existe = carrinho.find(function (i) { return i.id === p.id; });
    if (existe) { existe.qtd += 1; }
    else {
      carrinho.push({
        id: p.id, nome: p.nome,
        preco: (p.preco == null ? 0 : p.preco), qtd: 1,
        sobConsulta: p.preco == null,
        img: p.img || "", categoria: p.categoria || ""
      });
    }
    salvarCarrinho(); renderCarrinho(); bumpBadge(); abrirCarrinho();
    toast("Adicionado ao carrinho");
  }
  function removerProduto(id) {
    carrinho = carrinho.filter(function (i) { return i.id !== id; });
    salvarCarrinho(); renderCarrinho(); bumpBadge();
  }
  function mudarQtd(id, delta) {
    var i = carrinho.find(function (x) { return x.id === id; });
    if (!i) return;
    i.qtd += delta;
    if (i.qtd <= 0) return removerProduto(id);
    salvarCarrinho(); renderCarrinho(); bumpBadge();
  }
  function subtotal() {
    return carrinho.reduce(function (s, i) { return s + (i.sobConsulta ? 0 : i.preco * i.qtd); }, 0);
  }
  function totalItens() {
    return carrinho.reduce(function (s, i) { return s + i.qtd; }, 0);
  }

  // ---------- Vitrine ----------
  function precoHTML(p) {
    if (p.preco == null) return '<span class="loja__card-preco loja__card-preco--consulta">Sob consulta</span>';
    var html = '<span class="loja__card-preco">' + BRL.format(p.preco) + "</span>";
    if (p.parcelas && p.parcelas > 1) {
      html += '<span class="loja__parcelas">ou ' + p.parcelas + "x de " + BRL.format(p.preco / p.parcelas) + "</span>";
    }
    return html;
  }

  function cardHTML(p) {
    var selo = "";
    if (!p.estoque) selo = '<span class="loja__card-selo loja__card-selo--esgotado">Esgotado</span>';
    else if (p.destaque) selo = '<span class="loja__card-selo loja__card-selo--destaque">Destaque</span>';

    var btn;
    if (!p.estoque) {
      btn = '<button class="loja__card-btn" type="button" disabled aria-disabled="true">Esgotado</button>';
    } else if (p.preco == null) {
      btn = '<button class="loja__card-btn loja__card-btn--orcamento" type="button" data-orcamento="' + p.id + '"><i class="fab fa-whatsapp"></i> Pedir orçamento</button>';
    } else {
      btn = '<button class="loja__card-btn" type="button" data-add="' + p.id + '"><i class="fas fa-cart-plus"></i> Adicionar</button>';
    }

    return '' +
      '<article class="loja__card" data-categoria="' + p.categoria + '">' +
        '<div class="loja__card-img' + (p.img ? "" : " loja__card-img--ph") + '">' +
          (p.img
            ? '<img src="' + p.img + '" alt="' + escapeAttr(p.nome) + '" loading="lazy" onerror="lojaPh(this,\'' + p.categoria + '\')">'
            : '<span class="loja__ph-ic"><i class="fas ' + (CAT_ICON[p.categoria] || "fa-store") + '"></i></span>') +
          '<span class="loja__card-cat">' + (CAT_LABEL[p.categoria] || p.categoria) + "</span>" +
          selo +
        "</div>" +
        '<div class="loja__card-corpo">' +
          '<h3 class="loja__card-nome">' + escapeHTML(p.nome) + "</h3>" +
          '<p class="loja__card-desc">' + escapeHTML(p.descricao || "") + "</p>" +
          '<div class="loja__card-precos">' + precoHTML(p) + "</div>" +
          btn +
        "</div>" +
      "</article>";
  }

  function renderFiltros() {
    var cont = $("loja-filtros");
    if (!cont) return;
    var presentes = CAT_ORDER.filter(function (c) {
      return produtos.some(function (p) { return p.categoria === c; });
    });
    var chips = ['<button class="loja__filtro is-active" type="button" data-cat="todos">Todos</button>'];
    presentes.forEach(function (c) {
      chips.push('<button class="loja__filtro" type="button" data-cat="' + c + '">' + (CAT_LABEL[c] || c) + "</button>");
    });
    cont.innerHTML = chips.join("");
  }

  function renderGrid() {
    var grid = $("loja-grid");
    if (!grid) return;
    if (!produtos.length) {
      grid.innerHTML = '<p class="loja__vazio">Nenhum produto disponível no momento.</p>';
      return;
    }
    grid.innerHTML = produtos.map(cardHTML).join("");
    aplicarFiltro();
  }

  function aplicarFiltro() {
    var grid = $("loja-grid");
    if (!grid) return;
    var cards = grid.querySelectorAll(".loja__card");
    var visiveis = 0;
    cards.forEach(function (card) {
      var ok = filtroAtivo === "todos" || card.dataset.categoria === filtroAtivo;
      card.style.display = ok ? "" : "none";
      if (ok) visiveis++;
    });
    var vazio = grid.querySelector(".loja__vazio--filtro");
    if (visiveis === 0) {
      if (!vazio) {
        var p = document.createElement("p");
        p.className = "loja__vazio loja__vazio--filtro";
        p.textContent = "Nenhum produto nesta categoria por enquanto.";
        grid.appendChild(p);
      }
    } else if (vazio) {
      vazio.remove();
    }
  }

  function skeleton() {
    var grid = $("loja-grid");
    if (!grid) return;
    var s = "";
    for (var i = 0; i < 6; i++) {
      s += '<div class="loja__skeleton">' +
        '<div class="loja__skeleton-img"></div>' +
        '<div class="loja__skeleton-linha"></div>' +
        '<div class="loja__skeleton-linha curta"></div>' +
        '<div class="loja__skeleton-btn"></div>' +
        "</div>";
    }
    grid.innerHTML = s;
  }

  // ---------- Carrinho: render do painel ----------
  function renderCarrinho() {
    var lista = $("cart-items");
    var totalEl = $("cart-total");
    var checkout = $("cart-checkout");
    atualizarBadge();
    if (!lista) return;

    if (!carrinho.length) {
      lista.innerHTML = '<div class="cart__vazio"><i class="fas fa-cart-shopping"></i><p>Seu carrinho está vazio</p>' +
        '<a href="#loja" class="cart__vazio-btn" id="cart-ver-produtos">Ver produtos</a></div>';
      if (totalEl) totalEl.textContent = BRL.format(0);
      if (checkout) checkout.disabled = true;
      return;
    }

    lista.innerHTML = carrinho.map(function (i) {
      var valor = i.sobConsulta
        ? '<span class="cart__item-tag">valor a combinar</span>'
        : '<span class="cart__item-preco">' + BRL.format(i.preco * i.qtd) + "</span>";
      var img = i.img
        ? '<img class="cart__item-img" src="' + i.img + '" alt="" onerror="lojaPh(this,\'' + (i.categoria || "") + '\',true)">'
        : '<div class="cart__item-img cart__item-img--ph"><i class="fas ' + (CAT_ICON[i.categoria] || "fa-store") + '"></i></div>';
      return '<div class="cart__item">' +
        img +
        '<div class="cart__item-info">' +
          '<span class="cart__item-nome">' + escapeHTML(i.nome) + "</span>" + valor +
        "</div>" +
        '<div class="cart__item-ctrl">' +
          '<button class="cart__qtd-btn" type="button" data-qtd="' + i.id + '" data-delta="-1" aria-label="Diminuir">−</button>' +
          '<span class="cart__qtd">' + i.qtd + "</span>" +
          '<button class="cart__qtd-btn" type="button" data-qtd="' + i.id + '" data-delta="1" aria-label="Aumentar">+</button>' +
          '<button class="cart__remover" type="button" data-remover="' + i.id + '" aria-label="Remover"><i class="fas fa-trash"></i></button>' +
        "</div>" +
      "</div>";
    }).join("");

    if (totalEl) totalEl.textContent = BRL.format(subtotal());
    if (checkout) checkout.disabled = false;
  }

  function atualizarBadge() {
    var badge = $("cart-count");
    var n = totalItens();
    if (badge) {
      badge.textContent = n;
      badge.style.display = n > 0 ? "" : "none";
    }
    var btn = $("cart-open");
    if (btn) btn.setAttribute("aria-label", "Abrir carrinho (" + n + " " + (n === 1 ? "item" : "itens") + ")");
  }
  function bumpBadge() {
    atualizarBadge();
    var badge = $("cart-count");
    if (!badge) return;
    badge.classList.remove("is-bump");
    void badge.offsetWidth; // reflow para reiniciar a animação
    badge.classList.add("is-bump");
  }

  // ---------- Abrir/fechar painel ----------
  function abrirCarrinho() {
    var ov = $("cart-overlay"), dr = $("cart-drawer");
    if (ov) ov.classList.add("is-open");
    if (dr) { dr.classList.add("is-open"); dr.setAttribute("aria-hidden", "false"); }
    var close = $("cart-close");
    if (close) close.focus();
  }
  function fecharCarrinho() {
    var ov = $("cart-overlay"), dr = $("cart-drawer");
    if (ov) ov.classList.remove("is-open");
    if (dr) { dr.classList.remove("is-open"); dr.setAttribute("aria-hidden", "true"); }
  }

  // ---------- Checkout ----------
  function abrirWhatsApp(linhas) {
    var url = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(linhas.join("\n"));
    window.open(url, "_blank", "noopener");
  }
  function finalizarWhatsApp() {
    if (!carrinho.length) return;
    var linhas = ["*Pedido — Luiz Schneiger BT*", ""];
    carrinho.forEach(function (i) {
      var valor = i.sobConsulta ? "(valor a combinar)" : BRL.format(i.preco * i.qtd);
      linhas.push("• " + i.qtd + "x " + i.nome + " — " + valor);
    });
    linhas.push("", "*Subtotal:* " + BRL.format(subtotal()));
    linhas.push("", "Olá Luiz! Tenho interesse nesse pedido. Pode confirmar disponibilidade e forma de pagamento?");
    abrirWhatsApp(linhas);
  }
  function pedirOrcamento(id) {
    var p = produtos.find(function (x) { return x.id === id; });
    if (!p) return;
    abrirWhatsApp([
      "*Orçamento — Luiz Schneiger BT*", "",
      "• " + p.nome + " (valor a combinar)", "",
      "Olá Luiz! Gostaria de um orçamento para esse item."
    ]);
  }

  // ---------- Toast ----------
  var toastTimer;
  function toast(msg) {
    var t = $("loja-toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "loja-toast";
      t.className = "loja-toast";
      t.setAttribute("role", "status");
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("is-show"); }, 1800);
  }

  // ---------- Helpers ----------
  function escapeHTML(s) {
    return String(s).replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; });
  }
  function escapeAttr(s) { return escapeHTML(s).replace(/"/g, "&quot;"); }

  // Placeholder de imagem (exposto para uso em onerror inline)
  window.lojaPh = function (img, cat, mini) {
    var box = img.parentNode;
    if (!box) return;
    box.classList.add(mini ? "cart__item-img--ph" : "loja__card-img--ph");
    if (mini) {
      box.innerHTML = '<i class="fas ' + (CAT_ICON[cat] || "fa-store") + '"></i>';
    } else {
      // substitui só a imagem quebrada pelo ícone (mantém etiqueta de categoria e selo)
      var ph = document.createElement("span");
      ph.className = "loja__ph-ic";
      ph.innerHTML = '<i class="fas ' + (CAT_ICON[cat] || "fa-store") + '"></i>';
      img.replaceWith(ph);
    }
  };

  // ---------- Eventos ----------
  function bind() {
    // Filtros (delegação)
    var filtros = $("loja-filtros");
    if (filtros) {
      filtros.addEventListener("click", function (e) {
        var btn = e.target.closest(".loja__filtro");
        if (!btn) return;
        filtroAtivo = btn.dataset.cat;
        filtros.querySelectorAll(".loja__filtro").forEach(function (b) { b.classList.toggle("is-active", b === btn); });
        aplicarFiltro();
      });
    }

    // Grade: adicionar / pedir orçamento (delegação)
    var grid = $("loja-grid");
    if (grid) {
      grid.addEventListener("click", function (e) {
        var add = e.target.closest("[data-add]");
        if (add) {
          var p = produtos.find(function (x) { return x.id === add.dataset.add; });
          if (p) {
            addProduto(p);
            add.classList.add("is-added");
            setTimeout(function () { add.classList.remove("is-added"); }, 700);
          }
          return;
        }
        var orc = e.target.closest("[data-orcamento]");
        if (orc) pedirOrcamento(orc.dataset.orcamento);
      });
    }

    // Painel do carrinho (delegação)
    var lista = $("cart-items");
    if (lista) {
      lista.addEventListener("click", function (e) {
        var q = e.target.closest("[data-qtd]");
        if (q) { mudarQtd(q.dataset.qtd, parseInt(q.dataset.delta, 10)); return; }
        var rm = e.target.closest("[data-remover]");
        if (rm) { removerProduto(rm.dataset.remover); return; }
        var ver = e.target.closest("#cart-ver-produtos");
        if (ver) fecharCarrinho();
      });
    }

    var open = $("cart-open"); if (open) open.addEventListener("click", abrirCarrinho);
    var close = $("cart-close"); if (close) close.addEventListener("click", fecharCarrinho);
    var ov = $("cart-overlay"); if (ov) ov.addEventListener("click", fecharCarrinho);
    var checkout = $("cart-checkout"); if (checkout) checkout.addEventListener("click", finalizarWhatsApp);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") fecharCarrinho();
    });
  }

  // ---------- Init ----------
  function init() {
    bind();
    renderCarrinho(); // mostra o que já estava salvo (persiste entre páginas)
    if (!$("loja-grid")) return; // página sem vitrine
    skeleton();
    fetch("assets/data/produtos.json", { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (data) {
        produtos = Array.isArray(data) ? data : [];
        renderFiltros();
        renderGrid();
      })
      .catch(function () {
        var grid = $("loja-grid");
        if (grid) grid.innerHTML = '<p class="loja__vazio">Não foi possível carregar os produtos agora. Tente recarregar a página.</p>';
      });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

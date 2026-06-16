/**
 * Loja — renderização dos produtos, filtro por categoria e carrinho (localStorage).
 * O pedido final é enviado por WhatsApp com a lista de itens e o total.
 */

(function () {
  function go() {
  if (typeof lojaData === 'undefined') return;

  const CART_KEY = 'loja-carrinho';
  const produtos = lojaData.produtos;
  const categorias = lojaData.categorias;

  const elGrid = document.getElementById('loja-grid');
  const elFiltros = document.getElementById('loja-filtros');
  const elCartItems = document.getElementById('cart-items');
  const elCartTotal = document.getElementById('cart-total');
  const elCartCount = document.getElementById('cart-count');
  const elCart = document.getElementById('cart-drawer');
  const elOverlay = document.getElementById('cart-overlay');
  const btnOpen = document.getElementById('cart-open');
  const btnClose = document.getElementById('cart-close');
  const btnCheckout = document.getElementById('cart-checkout');

  let filtroAtivo = 'todos';

  // ---------- Helpers ----------
  function brl(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
  function precoLabel(p) {
    return p.preco > 0 ? brl(p.preco) : 'Sob consulta';
  }
  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch (e) { return []; }
  }
  function setCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCart();
  }
  function findProduto(id) {
    return produtos.find(p => p.id === id);
  }

  // ---------- Filtros ----------
  function renderFiltros() {
    elFiltros.innerHTML = '';
    const todos = criarFiltro('todos', 'Todos', 'fas fa-border-all');
    elFiltros.appendChild(todos);
    categorias.forEach(c => elFiltros.appendChild(criarFiltro(c.chave, c.nome, c.icone)));
  }
  function criarFiltro(chave, nome, icone) {
    const btn = document.createElement('button');
    btn.className = 'loja__filtro' + (chave === filtroAtivo ? ' is-active' : '');
    btn.innerHTML = '<i class="' + icone + '"></i> ' + nome;
    btn.addEventListener('click', function () {
      filtroAtivo = chave;
      renderFiltros();
      renderGrid();
    });
    return btn;
  }

  // ---------- Grade de produtos ----------
  function renderGrid() {
    elGrid.innerHTML = '';
    const lista = filtroAtivo === 'todos'
      ? produtos
      : produtos.filter(p => p.categoria === filtroAtivo);

    if (lista.length === 0) {
      elGrid.innerHTML = '<p class="loja__vazio">Nenhum produto nesta categoria.</p>';
      return;
    }

    lista.forEach(p => {
      const card = document.createElement('article');
      card.className = 'loja__card';

      const figura = document.createElement('div');
      figura.className = 'loja__card-img';
      const img = document.createElement('img');
      img.src = p.imagem;
      img.alt = p.nome;
      img.loading = 'lazy';
      figura.appendChild(img);
      if (p.destaque) {
        const tag = document.createElement('span');
        tag.className = 'loja__card-tag';
        tag.textContent = 'Mais procurado';
        figura.appendChild(tag);
      }
      card.appendChild(figura);

      const corpo = document.createElement('div');
      corpo.className = 'loja__card-corpo';
      corpo.innerHTML =
        '<h3 class="loja__card-nome">' + p.nome + '</h3>' +
        '<p class="loja__card-desc">' + p.descricao + '</p>' +
        '<span class="loja__card-preco">' + precoLabel(p) + '</span>';

      const btn = document.createElement('button');
      btn.className = 'loja__card-btn';
      btn.innerHTML = '<i class="fas fa-cart-plus"></i> Adicionar';
      btn.addEventListener('click', function () {
        addToCart(p.id);
        btn.classList.add('is-added');
        btn.innerHTML = '<i class="fas fa-check"></i> Adicionado';
        setTimeout(function () {
          btn.classList.remove('is-added');
          btn.innerHTML = '<i class="fas fa-cart-plus"></i> Adicionar';
        }, 1200);
      });
      corpo.appendChild(btn);
      card.appendChild(corpo);

      elGrid.appendChild(card);
    });
  }

  // ---------- Carrinho ----------
  function addToCart(id) {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (item) item.qtd += 1;
    else cart.push({ id: id, qtd: 1 });
    setCart(cart);
    abrirCarrinho();
  }
  function mudarQtd(id, delta) {
    let cart = getCart();
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qtd += delta;
    if (item.qtd <= 0) cart = cart.filter(i => i.id !== id);
    setCart(cart);
  }
  function removerItem(id) {
    setCart(getCart().filter(i => i.id !== id));
  }

  function renderCart() {
    const cart = getCart();
    elCartItems.innerHTML = '';
    let total = 0;
    let qtdTotal = 0;

    if (cart.length === 0) {
      elCartItems.innerHTML = '<p class="cart__vazio">Seu carrinho está vazio.</p>';
    }

    cart.forEach(item => {
      const p = findProduto(item.id);
      if (!p) return;
      qtdTotal += item.qtd;
      total += p.preco * item.qtd;

      const row = document.createElement('div');
      row.className = 'cart__item';
      row.innerHTML =
        '<img class="cart__item-img" src="' + p.imagem + '" alt="' + p.nome + '">' +
        '<div class="cart__item-info">' +
          '<span class="cart__item-nome">' + p.nome + '</span>' +
          '<span class="cart__item-preco">' + precoLabel(p) + '</span>' +
        '</div>';

      const ctrl = document.createElement('div');
      ctrl.className = 'cart__item-ctrl';
      const menos = document.createElement('button');
      menos.className = 'cart__qtd-btn';
      menos.setAttribute('aria-label', 'Diminuir');
      menos.textContent = '−';
      menos.addEventListener('click', function () { mudarQtd(item.id, -1); });
      const qtd = document.createElement('span');
      qtd.className = 'cart__qtd';
      qtd.textContent = item.qtd;
      const mais = document.createElement('button');
      mais.className = 'cart__qtd-btn';
      mais.setAttribute('aria-label', 'Aumentar');
      mais.textContent = '+';
      mais.addEventListener('click', function () { mudarQtd(item.id, 1); });
      const rm = document.createElement('button');
      rm.className = 'cart__remover';
      rm.setAttribute('aria-label', 'Remover');
      rm.innerHTML = '<i class="fas fa-trash"></i>';
      rm.addEventListener('click', function () { removerItem(item.id); });

      ctrl.appendChild(menos);
      ctrl.appendChild(qtd);
      ctrl.appendChild(mais);
      ctrl.appendChild(rm);
      row.appendChild(ctrl);
      elCartItems.appendChild(row);
    });

    elCartTotal.textContent = brl(total);
    elCartCount.textContent = qtdTotal;
    elCartCount.style.display = qtdTotal > 0 ? 'flex' : 'none';
    btnCheckout.disabled = cart.length === 0;
  }

  // ---------- Abrir / fechar ----------
  function abrirCarrinho() {
    elCart.classList.add('is-open');
    elOverlay.classList.add('is-open');
  }
  function fecharCarrinho() {
    elCart.classList.remove('is-open');
    elOverlay.classList.remove('is-open');
  }

  // ---------- Checkout WhatsApp ----------
  function checkout() {
    const cart = getCart();
    if (cart.length === 0) return;

    let msg = lojaData.contato.saudacao + '\n\n';
    let total = 0;
    let temSobConsulta = false;

    cart.forEach(item => {
      const p = findProduto(item.id);
      if (!p) return;
      const sub = p.preco * item.qtd;
      total += sub;
      if (p.preco === 0) temSobConsulta = true;
      msg += '• ' + item.qtd + 'x ' + p.nome +
        (p.preco > 0 ? ' — ' + brl(sub) : ' — (sob consulta)') + '\n';
    });

    msg += '\n*Total estimado: ' + brl(total) + '*';
    if (temSobConsulta) msg += '\n(alguns itens são sob consulta)';

    const url = 'https://wa.me/' + lojaData.contato.whatsapp + '?text=' + encodeURIComponent(msg);
    window.open(url, '_blank', 'noopener');
  }

  // ---------- Eventos ----------
  if (btnOpen) btnOpen.addEventListener('click', abrirCarrinho);
  if (btnClose) btnClose.addEventListener('click', fecharCarrinho);
  if (elOverlay) elOverlay.addEventListener('click', fecharCarrinho);
  if (btnCheckout) btnCheckout.addEventListener('click', checkout);

  // ---------- Inicialização ----------
  renderFiltros();
  renderGrid();
  renderCart();
  }

  // Roda imediatamente se o DOM já estiver pronto (carregamento dinâmico),
  // ou aguarda o DOMContentLoaded caso contrário.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go);
  else go();
})();

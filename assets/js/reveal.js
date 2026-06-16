/**
 * Reveal on scroll — adiciona um fade-in suave a imagens e cards
 * conforme entram na tela. Sem dependências.
 *
 * - Respeita prefers-reduced-motion (não anima nada nesse caso).
 * - Pega conteúdo gerado dinamicamente (loja, horários) via MutationObserver.
 * - Imagens dentro de carrosséis Swiper são ignoradas (o Swiper controla a
 *   própria visibilidade). Em vez disso, o BLOCO do carrossel é revelado com
 *   um fade só de opacidade (variante "soft"), sem deslocamento.
 */
(function () {
  // Sem suporte ou usuário prefere menos movimento → não faz nada (conteúdo normal)
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Cards/containers que recebem o efeito como bloco (com deslocamento)
  const CARD_SEL = '.loja__card, .horarios__card, .services__content, .project__img';
  // Blocos de carrossel: fade só de opacidade, sem transform (não quebra o Swiper)
  const SOFT_SEL = '.portfolio__container, .testimonial__container';
  // Tudo que deve ser observado
  const ALL_SEL = 'img, ' + CARD_SEL + ', ' + SOFT_SEL;

  // Revela o elemento e limpa o will-change ao fim da transição, para não
  // deixar uma camada de composição permanente (importante nos containers do Swiper).
  function revelar(el) {
    el.classList.add('reveal--visible');
    el.addEventListener('transitionend', function handler(e) {
      if (e.target !== el) return;
      if (e.propertyName === 'opacity' || e.propertyName === 'transform') {
        el.style.willChange = 'auto';
        el.removeEventListener('transitionend', handler);
      }
    });
  }

  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        revelar(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Retorna o "tipo" de reveal do elemento, ou null se não deve animar.
  function tipo(el) {
    if (el.tagName === 'IMG') {
      const ok = !el.closest('.swiper') && !el.closest('.home__blob') &&
                 !el.closest(CARD_SEL) && !el.closest(SOFT_SEL);
      return ok ? 'img' : null;
    }
    if (!el.matches) return null;
    if (el.matches(SOFT_SEL)) return 'soft';
    if (el.matches(CARD_SEL)) return 'card';
    return null;
  }

  function registrar(el) {
    if (!el || el.nodeType !== 1 || el.dataset.reveal) return;
    const t = tipo(el);
    if (!t) return;
    el.dataset.reveal = '1';
    el.classList.add('reveal');
    if (t === 'soft') el.classList.add('reveal--soft');

    // Se já está visível ao carregar (acima da dobra), revela no próximo frame
    // (entrada suave). Caso contrário, observa o scroll.
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const visivel = rect.top < vh && rect.bottom > 0;
    if (visivel) {
      requestAnimationFrame(function () { revelar(el); });
    } else {
      io.observe(el);
    }
  }

  function varrer(raiz) {
    if (!raiz || raiz.nodeType !== 1) return;
    registrar(raiz); // o próprio nó pode ser um alvo
    raiz.querySelectorAll(ALL_SEL).forEach(registrar);
  }

  function iniciar() {
    varrer(document.body);

    // Observa novos elementos inseridos depois (loja, horários, portfólio)
    const mo = new MutationObserver(function (mutacoes) {
      mutacoes.forEach(function (m) {
        m.addedNodes.forEach(function (node) { varrer(node); });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();

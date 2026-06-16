/**
 * Reveal on scroll — adiciona um fade-in suave a imagens e cards
 * conforme entram na tela. Sem dependências.
 *
 * - Respeita prefers-reduced-motion (não anima nada nesse caso).
 * - Pega conteúdo gerado dinamicamente (loja, horários) via MutationObserver.
 * - Ignora imagens dentro de carrosséis Swiper (eles controlam a própria visibilidade).
 */
(function () {
  // Sem suporte ou usuário prefere menos movimento → não faz nada (conteúdo normal)
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Cards/containers que recebem o efeito como bloco
  const CARD_SEL = '.loja__card, .horarios__card, .services__content, .project__img';

  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  function elegivel(el) {
    if (el.tagName === 'IMG') {
      // Ignora imagens dentro de swiper, do blob SVG e de cards já animados
      return !el.closest('.swiper') && !el.closest('.home__blob') && !el.closest(CARD_SEL);
    }
    return el.matches && el.matches(CARD_SEL);
  }

  function registrar(el) {
    if (!el || el.dataset.reveal) return;
    if (!elegivel(el)) return;
    el.dataset.reveal = '1';
    el.classList.add('reveal');

    // Se já está visível ao carregar (acima da dobra), revela no próximo frame
    // (entrada suave, sem ficar escondido). Caso contrário, observa o scroll.
    const rect = el.getBoundingClientRect();
    const visivel = rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.bottom > 0;
    if (visivel) {
      requestAnimationFrame(function () { el.classList.add('reveal--visible'); });
    } else {
      io.observe(el);
    }
  }

  function varrer(raiz) {
    if (!raiz || raiz.nodeType !== 1) return;
    if (raiz.tagName === 'IMG' || (raiz.matches && raiz.matches(CARD_SEL))) registrar(raiz);
    raiz.querySelectorAll('img, ' + CARD_SEL).forEach(registrar);
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

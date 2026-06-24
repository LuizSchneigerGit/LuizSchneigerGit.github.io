/**
 * Fallback de transição de página para navegadores SEM View Transitions API.
 * Em navegadores modernos, o efeito já vem do CSS (@view-transition) e este
 * script não faz nada. Respeita prefers-reduced-motion.
 */
(function () {
  if (document.startViewTransition) return; // navegador moderno: CSS cuida da transição
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;

    var href = a.getAttribute('href');
    if (!href) return;

    var url;
    try { url = new URL(a.href, location.href); } catch (err) { return; }

    var mesmoSite = url.origin === location.origin;
    var novaAba = a.target && a.target !== '_self';
    var download = a.hasAttribute('download');
    var ehAncora = url.pathname === location.pathname && url.hash; // link interno (#id)
    var esquemaEspecial = /^(mailto:|tel:|https?:\/\/wa\.me|javascript:)/i.test(href);

    if (!mesmoSite || novaAba || download || ehAncora || esquemaEspecial || e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // respeita abrir em nova aba

    e.preventDefault();
    document.body.style.transition = 'opacity 0.2s ease';
    document.body.style.opacity = '0';
    setTimeout(function () { location.href = a.href; }, 200);
  });
})();

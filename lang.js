// Idioma automático do FOSHI.
// Navegador em português fica em "/", qualquer outro idioma vai para "/en/".
// Se a pessoa escolher PT ou EN no topo da página, a escolha fica salva e sempre vence.
(function () {
  var KEY = 'foshi-lang';
  var onEn = /^\/en(\/|$)/.test(location.pathname);

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}

  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[data-lang]');
    if (!link) return;
    try { localStorage.setItem(KEY, link.getAttribute('data-lang')); } catch (e) {}
  });

  // Robôs de busca e de pré-visualização não são redirecionados:
  // cada versão precisa ser indexada no próprio endereço.
  if (/bot|crawl|spider|slurp|facebookexternalhit|embedly|preview/i.test(navigator.userAgent)) return;

  var want = saved;
  if (want !== 'pt' && want !== 'en') {
    var first = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    want = /^pt\b/i.test(first) ? 'pt' : 'en';
  }

  var keep = location.search + location.hash;
  if (want === 'en' && !onEn) location.replace('/en/' + keep);
  else if (want === 'pt' && onEn) location.replace('/' + keep);
})();

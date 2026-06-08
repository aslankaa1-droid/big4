/* BIG4 — мобильная навигация (гамбургер + выезжающее меню).
   Самодостаточный модуль: внедряет свой CSS, строит бургер и drawer из
   существующей шапки (nav.main + .head-cta), не требует правок разметки.
   Подключать ПЕРЕД i18n.js — тогда движок i18n сам привяжет языковые кнопки
   меню (data-lang) и переведёт клонированные ссылки (data-i18n). */
(function () {
  // ---------- стили ----------
  var css = ''
    + '.burger{display:none;flex-direction:column;justify-content:center;gap:5px;width:44px;height:44px;'
    + 'border:1px solid var(--line);background:transparent;border-radius:12px;cursor:pointer;padding:0 11px;flex:none}'
    + '.burger span{display:block;height:2px;width:100%;background:var(--ink);border-radius:2px;transition:transform .3s var(--ease),opacity .2s}'
    + '.burger.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}'
    + '.burger.open span:nth-child(2){opacity:0}'
    + '.burger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}'
    + '#mnav-ov{position:fixed;inset:0;z-index:140;background:rgba(0,0,0,.5);backdrop-filter:blur(4px);'
    + 'opacity:0;pointer-events:none;transition:opacity .3s var(--ease)}'
    + '#mnav-ov.open{opacity:1;pointer-events:auto}'
    + '#mnav{position:fixed;top:0;inset-inline-end:0;z-index:150;height:100%;width:min(86vw,360px);'
    + 'background:var(--bg-elev);border-inline-start:1px solid var(--line);box-shadow:var(--shadow);'
    + 'display:none;flex-direction:column;padding:24px 24px calc(24px + env(safe-area-inset-bottom));'
    + 'transform:translateX(100%);transition:transform .35s var(--ease);overflow-y:auto;overscroll-behavior:contain}'
    + 'html[dir="rtl"] #mnav{transform:translateX(-100%)}'
    + '#mnav.open{transform:translateX(0)}'
    + 'html[dir="rtl"] #mnav.open{transform:translateX(0)}'
    + '#mnav .mnav-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px}'
    + '#mnav .mnav-close{width:40px;height:40px;border:1px solid var(--line);background:transparent;border-radius:10px;'
    + 'color:var(--ink);font-size:1.3rem;line-height:1;cursor:pointer}'
    + '#mnav .mnav-links{display:flex;flex-direction:column;gap:2px;margin-bottom:20px}'
    + '#mnav .mnav-links a{text-decoration:none;color:var(--ink);font-family:var(--serif);font-size:1.18rem;'
    + 'font-weight:700;padding:13px 0;border-bottom:1px solid var(--line)}'
    + '#mnav .mnav-links a:active{color:var(--accent)}'
    + '#mnav .mnav-cta{display:flex;flex-direction:column;gap:10px;margin-bottom:22px}'
    + '#mnav .mnav-cta .btn{justify-content:center;width:100%}'
    + '#mnav .mnav-row{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:auto;padding-top:18px;border-top:1px solid var(--line)}'
    + '#mnav .mnav-lang{display:flex;gap:4px;border:1px solid var(--line);border-radius:100px;padding:4px}'
    + '#mnav .mnav-lang button{border:0;background:transparent;color:var(--ink-soft);cursor:pointer;border-radius:100px;'
    + 'padding:9px 12px;font-family:var(--mono);font-size:.7rem;letter-spacing:.06em;transition:.25s}'
    + '#mnav .mnav-lang button.on{background:var(--accent);color:var(--accent-ink)}'
    + '#mnav .mnav-country{border:1px solid var(--line);background:transparent;border-radius:100px;cursor:pointer;'
    + 'color:var(--ink);font-family:var(--mono);font-size:.72rem;letter-spacing:.04em;padding:9px 16px;display:flex;align-items:center;gap:8px}'
    + '#mnav .mnav-country:hover{border-color:var(--accent)}'
    + '@media(max-width:1080px){.burger{display:flex}header nav.main{display:none}header .head-cta{display:none}}'
    + '@media(min-width:1081px){#mnav,#mnav-ov{display:none}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function build() {
    var bar = document.querySelector('header .bar');
    if (!bar || document.querySelector('.burger')) return;

    // бургер
    var burger = document.createElement('button');
    burger.className = 'burger'; burger.setAttribute('aria-label', 'Menu'); burger.setAttribute('aria-expanded', 'false');
    burger.innerHTML = '<span></span><span></span><span></span>';
    bar.appendChild(burger);

    // overlay + drawer
    var ov = document.createElement('div'); ov.id = 'mnav-ov';
    var drawer = document.createElement('aside'); drawer.id = 'mnav';
    drawer.setAttribute('aria-hidden', 'true');

    var top = document.createElement('div'); top.className = 'mnav-top';
    var brand = bar.querySelector('.brand');
    top.innerHTML = (brand ? brand.outerHTML : '<span></span>') + '<button class="mnav-close" aria-label="Close">&times;</button>';
    drawer.appendChild(top);

    // ссылки навигации (клон сохраняет data-i18n → i18n переведёт)
    var links = document.createElement('nav'); links.className = 'mnav-links';
    document.querySelectorAll('header nav.main a').forEach(function (a) {
      links.appendChild(a.cloneNode(true));
    });
    if (links.children.length) drawer.appendChild(links);

    // CTA-кнопки (Войти / Личный кабинет / Заказать)
    var cta = document.createElement('div'); cta.className = 'mnav-cta';
    document.querySelectorAll('header .head-cta a.btn').forEach(function (a) {
      var c = a.cloneNode(true); c.classList.remove('sm'); cta.appendChild(c);
    });
    if (cta.children.length) drawer.appendChild(cta);

    // язык + страна
    var row = document.createElement('div'); row.className = 'mnav-row';
    var lang = document.createElement('div'); lang.className = 'mnav-lang';
    ['ru', 'en', 'fr', 'ar'].forEach(function (l) {
      var b = document.createElement('button'); b.setAttribute('data-lang', l); b.textContent = l.toUpperCase();
      lang.appendChild(b);
    });
    row.appendChild(lang);
    var ctry = document.createElement('button'); ctry.className = 'mnav-country';
    var chip = document.getElementById('country-chip');
    ctry.innerHTML = '<span>' + (chip ? chip.textContent : '🌍') + '</span><span>Country</span>';
    ctry.addEventListener('click', function () {
      if (window.BIG4I18N && window.BIG4I18N.openCountry) { close(); window.BIG4I18N.openCountry(); }
    });
    row.appendChild(ctry);
    drawer.appendChild(row);

    document.body.appendChild(ov);
    document.body.appendChild(drawer);

    function open() {
      drawer.style.display = 'flex';   // нулевой бокс в закрытом виде → нет горизонт. скролла; show через reflow для слайда
      void drawer.offsetWidth;
      ov.classList.add('open'); drawer.classList.add('open'); burger.classList.add('open');
      burger.setAttribute('aria-expanded', 'true'); drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      ov.classList.remove('open'); drawer.classList.remove('open'); burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false'); drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      var onEnd = function (e) {
        if (e.target === drawer && e.propertyName === 'transform') {
          drawer.style.display = 'none'; drawer.removeEventListener('transitionend', onEnd);
        }
      };
      drawer.addEventListener('transitionend', onEnd);
    }
    function toggle() { drawer.classList.contains('open') ? close() : open(); }

    burger.addEventListener('click', toggle);
    ov.addEventListener('click', close);
    drawer.querySelector('.mnav-close').addEventListener('click', close);
    // закрытие при клике по ссылке/CTA и по языку
    drawer.querySelectorAll('.mnav-links a, .mnav-cta a').forEach(function (a) { a.addEventListener('click', close); });
    lang.querySelectorAll('button').forEach(function (b) { b.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 1080) close(); });
    // клон бренда в шапке меню ведёт на главную — закрыть при клике
    var tb = top.querySelector('.brand'); if (tb) tb.addEventListener('click', close);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();

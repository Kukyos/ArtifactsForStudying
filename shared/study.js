/* Shared chrome for every study page: light/dark theme + subject selector.
   Include in <head> with:  <script src="../shared/study.js"></script>
   Pages read the theme from <html data-theme="light|dark">. */
(function () {
  var SUBJECTS = [
    { id: 'toc',    name: 'Theory of Computation', tag: '23CS2046', path: 'toc/' },
    { id: 'dbms',   name: 'Database Management Systems', tag: '23CS2013', path: 'dbms/' },
    { id: 'webtech', name: 'Web Technology',       tag: '23CS2048', path: 'webtech/' },
    { id: 'pandas', name: 'Pandas Drill',         tag: 'DSE lab',  path: 'pandas/' },
    { id: 'sql',    name: 'SQL*Plus Drill',        tag: 'DBMS lab', path: 'sql/' }
  ];
  var KEY = 'study-theme';
  var script = document.currentScript;
  var base = script ? new URL('../', script.src).href : '/';

  function load() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function sys() { return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }
  function apply(t) {
    document.documentElement.setAttribute('data-theme', t);
    document.documentElement.style.colorScheme = t;
    var b = document.getElementById('sx-theme');
    if (b) { b.textContent = t === 'dark' ? '☀' : '☾'; b.setAttribute('aria-label', 'Switch to ' + (t === 'dark' ? 'light' : 'dark') + ' mode'); }
  }
  apply(load() || sys());
  if (window.matchMedia) matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { if (!load()) apply(sys()); });

  window.STUDY_SUBJECTS = SUBJECTS;
  window.STUDY_BASE = base;

  var css =
    '#sx-bar{position:fixed;top:10px;right:max(12px,env(safe-area-inset-right,0px));z-index:1000;display:flex;gap:6px;align-items:center;' +
    'font:13px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif}' +
    '#sx-bar select,#sx-bar button{font:inherit;height:32px;border-radius:8px;border:1px solid var(--sx-line);background:var(--sx-bg);color:var(--sx-ink);cursor:pointer;' +
    'box-shadow:0 1px 3px rgba(0,0,0,.12)}' +
    '#sx-bar select{padding:0 28px 0 10px;appearance:none;-webkit-appearance:none;' +
    'background-image:linear-gradient(45deg,transparent 50%,currentColor 50%),linear-gradient(135deg,currentColor 50%,transparent 50%);' +
    'background-position:calc(100% - 15px) calc(50% + 1px),calc(100% - 10px) calc(50% + 1px);background-size:5px 5px;background-repeat:no-repeat}' +
    '#sx-bar button{width:32px;padding:0;font-size:15px}' +
    '#sx-bar select:focus-visible,#sx-bar button:focus-visible{outline:2px solid #3b82f6;outline-offset:2px}' +
    ':root{--sx-bg:#ffffff;--sx-ink:#16202a;--sx-line:#d5dce2}' +
    ':root[data-theme="dark"]{--sx-bg:#1b2630;--sx-ink:#e6edf3;--sx-line:#33424f}' +
    '@media print{#sx-bar{display:none}}';

  function mount() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var here = document.documentElement.getAttribute('data-subject') || '';
    var bar = document.createElement('div'); bar.id = 'sx-bar';
    var sel = '<label for="sx-sub" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Subject</label>' +
      '<select id="sx-sub"><option value="">All subjects</option>' +
      SUBJECTS.map(function (s) { return '<option value="' + s.id + '"' + (s.id === here ? ' selected' : '') + '>' + s.name + '</option>'; }).join('') +
      '</select>';
    bar.innerHTML = sel + '<button id="sx-theme" type="button"></button>';
    document.body.appendChild(bar);
    document.getElementById('sx-sub').onchange = function () {
      var s = SUBJECTS.filter(function (x) { return x.id === this.value; }, this)[0];
      location.href = s ? base + s.path : base;
    };
    document.getElementById('sx-theme').onclick = function () {
      var t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      save(t); apply(t);
    };
    apply(document.documentElement.getAttribute('data-theme'));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();

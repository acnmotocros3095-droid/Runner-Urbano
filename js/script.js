// Valores del juego: cámbialos aquí y se actualizan en toda la página.
const CONFIG = { vidas: 3, meta: 1000 };

const $ = (s, c = document) => c.querySelector(s);
document.querySelectorAll('[data-stat]').forEach(el => { el.textContent = CONFIG[el.dataset.stat]; });

// Menú móvil
const burger = $('.burger'), menu = $('#menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => { if (e.target.tagName === 'A') { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); } });

// Distancia recorrida al hacer scroll (barra de carril + marcador)
const bar = $('#bar'), hud = $('#hud');
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const p = max > 0 ? scrollY / max : 0;
  bar.parentElement.style.setProperty('--p', p);
  bar.style.setProperty('--p', p);
  hud.textContent = String(Math.round(scrollY * 3)).padStart(6, '0');
}
addEventListener('scroll', onScroll, { passive: true }); onScroll();

// Enlace activo según la sección visible
const links = [...menu.querySelectorAll('a')];
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.hash === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => io.observe(s));

// Juego incrustado
const game = $('#game'), start = $('#start'), stage = $('#stage');
function play() {
  if (!game.src) game.src = game.dataset.src;
  start.classList.add('off');
  game.addEventListener('load', () => game.focus(), { once: true });
  game.focus();
}
start.addEventListener('click', play);
$('[data-autoplay]').addEventListener('click', () => setTimeout(play, 700));
$('#full').addEventListener('click', () => {
  play();
  (stage.requestFullscreen || stage.webkitRequestFullscreen || (() => {})).call(stage);
});

// Carga independiente del segundo juego.
function playCity() {
  const frame = $('#city-game');
  if (!frame.getAttribute('src')) frame.src = frame.dataset.src;
  $('#city-start').classList.add('off');
  frame.focus();
}
$('#city-start').addEventListener('click', playCity);
$('[data-city-play]').addEventListener('click', playCity);
$('#city-full').addEventListener('click', async () => {
  playCity();
  const stage = $('#city-stage');
  try {
    if (stage.requestFullscreen) await stage.requestFullscreen();
    else if (stage.webkitRequestFullscreen) stage.webkitRequestFullscreen();
  } catch { /* El enlace externo permanece disponible. */ }
});

// Conservar el campo de juego completo al cambiar el tamaño o entrar en fullscreen.
function fitGameStage(stage) {
  const viewport = stage.querySelector('.game-viewport');
  const scale = Math.min(stage.clientWidth / 960, stage.clientHeight / 600);
  viewport.style.setProperty('--game-scale', scale);
}
const gameStages = [...document.querySelectorAll('.stage')];
const stageObserver = new ResizeObserver(entries => entries.forEach(entry => fitGameStage(entry.target)));
gameStages.forEach(stage => { stageObserver.observe(stage); fitGameStage(stage); });
document.addEventListener('fullscreenchange', () => gameStages.forEach(fitGameStage));

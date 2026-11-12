'use strict';
const $ = s => document.querySelector(s);
const all = s => [...document.querySelectorAll(s)];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = $('.motion-toggle');
let manualPause = false;
function updateMotion() {
  const paused = manualPause || reducedMotion.matches;
  document.documentElement.classList.toggle('motion-paused', paused);
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.textContent = paused ? 'Activar animación' : 'Pausar animación';
}
motionButton.addEventListener('click', () => {
  // La preferencia del sistema se respeta incluso al activar el control.
  manualPause = !manualPause;
  updateMotion();
});
reducedMotion.addEventListener('change', updateMotion);
updateMotion();
if ('IntersectionObserver' in window) {
  const reveals = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      reveals.unobserve(entry.target);
    }
  }), {threshold:0.06});
  all('.reveal').forEach(el => reveals.observe(el));
  document.documentElement.classList.add('motion-enabled');
}
const menu = $('#navigation');
const toggle = $('.menu-toggle');
function closeMenu() { menu.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); }
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded',String(open));
});
menu.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', e => { if(e.key==='Escape') closeMenu(); });
function progress() {
  const max = document.documentElement.scrollHeight-innerHeight;
  document.documentElement.style.setProperty('--progress',`${max>0?scrollY/max*100:0}%`);
}
addEventListener('scroll',progress,{passive:true});
addEventListener('resize',progress); progress();
if ('IntersectionObserver' in window) {
  const active = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) all('#navigation a').forEach(a => a.classList.toggle('active',a.hash===`#${entry.target.id}`));
  }), {rootMargin:'-15% 0px -65% 0px'});
  all('section[id], footer[id]').forEach(el => active.observe(el));
}

// Ningún iframe tiene src al abrir el portal. Solo los botones START llaman a startGame.
const ids = ['runner','laberinto'];
const sessions = Object.fromEntries(ids.map(id=>[id,{active:false,generation:0,timer:null}]));
const frame = id => $(`#frame-${id}`);
const stage = id => $(`#stage-${id}`);
const status = (id,text) => { $(`#status-${id}`).textContent=text; };
function stopGame(id, message='Detenido · Pulsa START para comenzar una nueva partida.') {
  const session=sessions[id];
  session.active=false; session.generation++;
  clearTimeout(session.timer);
  frame(id).onload=null;
  frame(id).removeAttribute('src');
  frame(id).tabIndex=-1;
  stage(id).classList.remove('playing');
  $(`[data-start="${id}"]`).textContent='▶ START';
  $(`[data-retry="${id}"]`).hidden=true;
  status(id,message);
}
function startGame(id) {
  ids.filter(other=>other!==id && sessions[other].active).forEach(other=>stopGame(other,'Detenido al iniciar el otro juego · Pulsa START para volver.'));
  const session=sessions[id];
  session.active=true;
  const generation=++session.generation;
  clearTimeout(session.timer);
  frame(id).tabIndex=0;
  frame(id).onload=()=>{
    if(!session.active || generation!==session.generation) return;
    // load confirma la página del reproductor, no la descarga completa del build Unity.
    status(id,'Reproductor abierto · Espera la carga de Unity y haz clic dentro para usar el teclado.');
  };
  frame(id).src=frame(id).dataset.src;
  stage(id).classList.add('playing');
  $(`[data-start="${id}"]`).textContent='■ DETENER';
  $(`[data-retry="${id}"]`).hidden=false;
  status(id,'Cargando reproductor · La descarga de Unity puede tardar unos segundos.');
  fit(stage(id));
  session.timer=setTimeout(()=>{
    if(session.active && generation===session.generation) status(id,'Si el juego no aparece, comprueba Internet y pulsa «Volver a cargar». Si ya está listo, haz clic dentro para jugar.');
  },60000);
}
all('[data-start]').forEach(button=>button.addEventListener('click',()=>{
  const id=button.dataset.start;
  if(sessions[id].active) stopGame(id); else startGame(id);
}));
all('[data-retry]').forEach(button=>button.addEventListener('click',()=>{
  const id=button.dataset.retry;
  if(!sessions[id].active) return;
  stopGame(id); startGame(id);
}));
all('[data-full]').forEach(button=>button.addEventListener('click',async()=>{
  const id=button.dataset.full;
  if(!sessions[id].active){status(id,'Pulsa START antes de entrar en pantalla completa.');return;}
  try {
    if(stage(id).requestFullscreen) await stage(id).requestFullscreen();
    else if(stage(id).webkitRequestFullscreen) stage(id).webkitRequestFullscreen();
    else status(id,'Tu navegador no permite pantalla completa; puedes seguir jugando aquí.');
  } catch {status(id,'No se pudo activar pantalla completa. Puedes seguir jugando en esta sección.');}
}));
// Los builds externos usan un canvas de 960 x 600. Se encuadra sin recortar el juego.
function fit(el) {
  const scale=Math.min(el.clientWidth/960,el.clientHeight/600);
  el.querySelector('.game-viewport').style.setProperty('--game-scale',scale);
}
const stages=all('.stage');
if('ResizeObserver' in window){
  const observer=new ResizeObserver(entries=>entries.forEach(entry=>fit(entry.target)));
  stages.forEach(el=>observer.observe(el));
}
addEventListener('resize',()=>stages.forEach(fit));
document.addEventListener('fullscreenchange',()=>stages.forEach(fit));
stages.forEach(fit);

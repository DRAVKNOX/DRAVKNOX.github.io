(function(){
  const pick = a => a[Math.floor(Math.random()*a.length)];

  const tauntEl = document.getElementById('taunt');
  const hintEl  = document.getElementById('hint');
  const bird    = document.getElementById('bird');

  if(tauntEl) tauntEl.textContent = pick(FLOPPY_DATA.taunts);
  if(hintEl)  hintEl.textContent  = pick(FLOPPY_DATA.hints);

  // respect reduced motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(bird && prefersReduced) {
    bird.style.animation = 'none';
  }

  // update aria-label on bird to reflect state
  function updateBirdAria() {
    if(bird) {
      bird.setAttribute('aria-label', 'Flappy the bird - click or press Space/Enter to re-roll the message');
    }
  }
  updateBirdAria();

  // tapping/clicking the bird re-rolls the message
  if(bird){
    bird.style.cursor = 'pointer';
    bird.addEventListener('click', () => {
      tauntEl.textContent = pick(FLOPPY_DATA.taunts);
      hintEl.textContent  = pick(FLOPPY_DATA.hints);
      bird.style.animation = 'none';
      void bird.offsetWidth;
      bird.style.animation = '';
      updateBirdAria();
    });
  }

  // keyboard accessibility: Space and Enter to re-roll
  if(bird){
    bird.addEventListener('keydown', event => {
      if(event.key === 'Enter' || event.key === ' '){
        event.preventDefault();
        tauntEl.textContent = pick(FLOPPY_DATA.taunts);
        hintEl.textContent  = pick(FLOPPY_DATA.hints);
        bird.style.animation = 'none';
        void bird.offsetWidth;
        bird.style.animation = '';
        updateBirdAria();
      }
    });
  }
})();
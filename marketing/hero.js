(() => {
  const hero = document.querySelector('.campaign');
  const word = hero.querySelector('.campaign-word');
  const toggle = hero.querySelector('.campaign-toggle');
  if (!word.animate) return;

  const words = ['schedule,', 'spa,', 'complex,'];
  const photos = hero.querySelectorAll('.campaign-photo');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let timer;
  let playingAnimation;
  let paused = false;
  let visible = true;

  function canRotate() {
    return visible && !paused && !preference.matches && !document.hidden;
  }

  async function rotate() {
    try {
      playingAnimation = word.animate(
        [{transform: 'translateY(0)', opacity: 1}, {transform: 'translateY(-85%)', opacity: 0}],
        {duration: 210, easing: 'cubic-bezier(.4,0,1,1)'}
      );
      await playingAnimation.finished;
      if (!canRotate()) return;

      index = (index + 1) % words.length;
      word.textContent = words[index];
      photos.forEach((photo, i) => photo.classList.toggle('current', i === index));
      playingAnimation = word.animate(
        [{transform: 'translateY(88%)', opacity: 0}, {transform: 'translateY(0)', opacity: 1}],
        {duration: 370, easing: 'cubic-bezier(.15,.75,.2,1)'}
      );
      await playingAnimation.finished;
      schedule();
    } catch (error) {
      if (error.name !== 'AbortError') throw error;
    }
  }

  function schedule() {
    clearTimeout(timer);
    playingAnimation?.cancel();
    if (canRotate()) timer = setTimeout(rotate, 4700);
  }

  function updatePreference() {
    toggle.hidden = preference.matches;
    schedule();
  }

  toggle.addEventListener('click', () => {
    paused = !paused;
    toggle.toggleAttribute('data-paused', paused);
    const label = paused ? 'Play slideshow' : 'Pause slideshow';
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
    schedule();
  });
  preference.addEventListener('change', updatePreference);
  document.addEventListener('visibilitychange', schedule);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    });
    observer.observe(hero);
  }
  updatePreference();
})();

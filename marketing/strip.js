const track = document.querySelector('.strip-track');
const toggleStrip = document.querySelector('.strip-toggle');
const duplicate = track.firstElementChild.cloneNode(true);
duplicate.setAttribute('aria-hidden', 'true');
track.append(duplicate);
track.classList.add('playable');
toggleStrip.hidden = false;
toggleStrip.addEventListener('click', () => {
  const paused = track.classList.toggle('paused');
  toggleStrip.setAttribute('aria-label', paused ? 'Play business list' : 'Pause business list');
  toggleStrip.firstElementChild.textContent = paused ? '▷' : 'Ⅱ';
});

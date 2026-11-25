(() => {
  const preview = document.querySelector('.px-showcase');
  const examples = {
    studio: ['Forma Studio', 'Morning flow', 'Class booking', '9:00 AM', 'Studio A · 45 minutes', '1 spot', '$24'],
    salon: ['Juniper Salon', 'Cut and finish', 'Hair appointment', '11:30 AM', 'Chair 2 · 60 minutes', '1 guest', '$65'],
    venue: ['West Hall', 'Planning workshop', 'Meeting room rental', '1:00 PM', 'Garden room · 3 hours', '12 guests', '$180'],
    sport: ['Northside Fields', 'Team practice', 'Field rental', '5:00 PM', 'Indoor turf · 60 minutes', '1 field', '$90'],
  };
  const result = preview.querySelector('.px-result');
  const approve = preview.querySelector('.sample-approve');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let animation;
  const approved = new Set();
  function render(animate) {
    const key = preview.querySelector('input:checked').value;
    const [brand, title, type, time, detail, size, amount] = examples[key];
    const confirmed = approved.has(key);
    const fields = {
      '.sample-brand': brand, '.px-view-title': title,
      '.px-event-head strong': type, '.px-event-head span': time,
      '.px-event p': detail, '.px-spots strong': confirmed ? 'Booking approved' : 'Awaiting approval',
      '.px-spots span': size,
    };
    for (const [selector, value] of Object.entries(fields)) preview.querySelector(selector).textContent = value;
    const [fee, payment] = result.querySelectorAll('.px-line strong');
    fee.textContent = amount;
    payment.textContent = confirmed ? 'Paid (simulated)' : 'Card on file';
    approve.textContent = confirmed ? 'Reset sample booking' : 'Approve sample booking';
    if (animate && !reduced.matches) {
      animation?.cancel();
      animation = result.animate([{opacity: .4, transform: 'translateY(5px)'}, {opacity: 1, transform: 'none'}], {duration: 240});
    }
  }
  preview.querySelector('.px-controls').addEventListener('change', () => render(true));
  approve.addEventListener('click', () => {
    const key = preview.querySelector('input:checked').value;
    if (approved.has(key)) approved.delete(key);
    else approved.add(key);
    render(true);
  });
  render(false);
})();

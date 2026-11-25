const form = document.querySelector('#demo-form');
const button = form.querySelector('button');
const status = document.querySelector('#form-status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (button.disabled) return;

  button.disabled = true;
  status.hidden = false;
  status.textContent = 'Sending your request…';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error('The form service rejected the request.');

    form.reset();
    status.textContent = 'Thanks. We’ll reach out to find a time for your demo.';
  } catch {
    status.textContent = 'We couldn’t confirm your request. Please try again.';
  } finally {
    button.disabled = false;
  }
});

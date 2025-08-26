 const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    statusEl.className = "form-status sending";  // add class
    statusEl.textContent = 'Sending...';
    const data = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        statusEl.className = "form-status success";
        statusEl.textContent = '✅ Thanks! Your message has been sent.';
        form.reset();
      } else {
        const err = await res.json().catch(() => null);
        statusEl.className = "form-status error";
        statusEl.textContent = err && err.errors
          ? err.errors.map(e => e.message).join(', ')
          : '❌ Oops! Something went wrong. Please try again.';
      }
    } catch (error) {
      statusEl.className = "form-status error";
      statusEl.textContent = '❌ Network error. Please try again.';
    }
  });
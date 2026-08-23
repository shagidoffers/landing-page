/* =========================================================
   1) COUNTDOWN TIMER â€” 48 à¦˜à¦¨à§à¦Ÿà¦¾à¦° à¦…à¦«à¦¾à¦°
========================================================= */
(function countdown(){
  const HOURS_TOTAL = 48;
  const deadline = new Date(Date.now() + HOURS_TOTAL * 60 * 60 * 1000);

  const elH = document.getElementById('cdHours');
  const elM = document.getElementById('cdMinutes');
  const elS = document.getElementById('cdSeconds');

  function pad(n){ return String(n).padStart(2, '0'); }

  function tick(){
    const diff = deadline - Date.now();

    if (diff <= 0){
      elH.textContent = '00';
      elM.textContent = '00';
      elS.textContent = '00';
      clearInterval(timer);
      return;
    }

    const hours   = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    elH.textContent = pad(hours);
    elM.textContent = pad(minutes);
    elS.textContent = pad(seconds);
  }

  tick();
  const timer = setInterval(tick, 1000);
})();

/* =========================================================
   2) à¦²à¦¾à¦‡à¦­ à¦­à¦¿à¦‰à¦¯à¦¼à¦¾à¦° à¦•à¦¾à¦‰à¦¨à§à¦Ÿà¦¾à¦° â€” à¦¸à¦¾à¦®à¦¾à¦¨à§à¦¯ à¦“à¦ à¦¾à¦¨à¦¾à¦®à¦¾ à¦•à¦°à§‡
========================================================= */
(function viewerCounter(){
  const el = document.getElementById('viewerCount');
  if (!el) return;
  let count = parseInt(el.textContent, 10) || 200;

  setInterval(() => {
    const change = Math.floor(Math.random() * 7) - 3; // -3 à¦¥à§‡à¦•à§‡ +3
    count = Math.max(140, Math.min(320, count + change));
    el.textContent = count;
  }, 2600);
})();

/* =========================================================
   3) à¦¸à§à¦Ÿà¦• à¦•à¦¾à¦‰à¦¨à§à¦Ÿà¦¾à¦° â€” à¦®à¦¾à¦à§‡ à¦®à¦¾à¦à§‡ à¦•à¦®à§‡
========================================================= */
(function stockCounter(){
  const el = document.getElementById('stockLeft');
  if (!el) return;
  let stock = parseInt(el.textContent, 10) || 37;

  setInterval(() => {
    if (stock <= 12) return; // à¦–à§à¦¬ à¦•à¦® à¦¹à¦²à§‡ à¦†à¦° à¦•à¦®à¦¬à§‡ à¦¨à¦¾, urgency à¦§à¦°à§‡ à¦°à¦¾à¦–à¦¾à¦° à¦œà¦¨à§à¦¯ à¦¯à¦¥à§‡à¦·à§à¦Ÿ
    if (Math.random() < 0.4){
      stock -= 1;
      el.textContent = stock;
      el.parentElement.animate(
        [{ opacity: .3 }, { opacity: 1 }],
        { duration: 400, easing: 'ease-out' }
      );
    }
  }, 7000);
})();

/* =========================================================
   4) à¦¸à§à¦•à§à¦°à¦² à¦°à¦¿à¦­à¦¿à¦² à¦…à§à¦¯à¦¾à¦¨à¦¿à¦®à§‡à¦¶à¦¨
========================================================= */
(function scrollReveal(){
  const items = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)){
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(el => observer.observe(el));

  // à¦¸à§‡à¦«à¦Ÿà¦¿ à¦«à¦²à¦¬à§à¦¯à¦¾à¦•: à¦•à§‹à¦¨à§‹ à¦•à¦¾à¦°à¦£à§‡ observer à¦•à¦¾à¦œ à¦¨à¦¾ à¦•à¦°à¦²à§‡ à§¨ à¦¸à§‡à¦•à§‡à¦¨à§à¦¡ à¦ªà¦° à¦¸à¦¬ à¦¦à§‡à¦–à¦¿à¦¯à¦¼à§‡ à¦¦à¦¾à¦“
  setTimeout(() => {
    items.forEach(el => el.classList.add('is-visible'));
  }, 2000);
})();

/* =========================================================
   5) AJAX à¦«à¦°à§à¦® à¦¸à¦¾à¦¬à¦®à¦¿à¦¶à¦¨ (fetch à¦¦à¦¿à¦¯à¦¼à§‡)
   ------------------------------------------------------
   à¦à¦–à¦¾à¦¨à§‡ à¦¡à§‡à¦®à§‹ à¦¹à¦¿à¦¸à§‡à¦¬à§‡ jsonplaceholder.typicode.com à¦¬à§à¦¯à¦¬à¦¹à¦¾à¦°
   à¦•à¦°à¦¾ à¦¹à¦¯à¦¼à§‡à¦›à§‡ à¦¯à¦¾à¦¤à§‡ à¦°à¦¿à¦¯à¦¼à§‡à¦² à¦¬à§à¦¯à¦¾à¦•à¦à¦¨à§à¦¡ à¦›à¦¾à¦¡à¦¼à¦¾à¦‡ AJAX à¦«à§à¦²à§‹ à¦Ÿà§‡à¦¸à§à¦Ÿ à¦•à¦°à¦¾ à¦¯à¦¾à¦¯à¦¼à¥¤
   à¦†à¦¸à¦² à¦¸à¦¾à¦‡à¦Ÿà§‡ à¦à¦‡ URL-à¦Ÿà¦¾ à¦¬à¦¦à¦²à§‡ à¦¨à¦¿à¦œà§‡à¦° Formspree endpoint,
   Google Form, à¦¬à¦¾ à¦¨à¦¿à¦œà§‡à¦° API à¦¦à¦¿à¦¯à¦¼à§‡ à¦°à¦¿à¦ªà§à¦²à§‡à¦¸ à¦•à¦°à§‡ à¦¨à¦¿à¦¨à¥¤
========================================================= */
(function ajaxForm(){
  const form = document.getElementById('claimForm');
  const emailInput = document.getElementById('emailInput');
  const submitBtn = document.getElementById('submitBtn');
  const errorEl = document.getElementById('formError');
  const successEl = document.getElementById('claimSuccess');

  // ==> à¦¨à¦¿à¦œà§‡à¦° à¦«à¦°à§à¦® à¦à¦¨à§à¦¡à¦ªà¦¯à¦¼à§‡à¦¨à§à¦Ÿ à¦à¦–à¦¾à¦¨à§‡ à¦¬à¦¸à¦¾à¦¨ (à¦¯à§‡à¦®à¦¨ Formspree)
  const ENDPOINT = 'https://jsonplaceholder.typicode.com/posts';

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.textContent = '';

    const email = emailInput.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValid){
      errorEl.textContent = 'à¦¸à¦ à¦¿à¦• à¦à¦•à¦Ÿà¦¿ à¦‡à¦®à§‡à¦‡à¦² à¦ à¦¿à¦•à¦¾à¦¨à¦¾ à¦¦à¦¿à¦¨à¥¤';
      emailInput.focus();
      return;
    }

    form.classList.add('is-loading');
    submitBtn.disabled = true;

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, offer: 'AuroraBuds Pro VIP' })
      });

      if (!response.ok) throw new Error('Request failed: ' + response.status);

      await response.json();

      form.hidden = true;
      successEl.hidden = false;

    } catch (err) {
      errorEl.textContent = 'à¦•à¦¿à¦›à§ à¦à¦•à¦Ÿà¦¾ à¦¸à¦®à¦¸à§à¦¯à¦¾ à¦¹à¦¯à¦¼à§‡à¦›à§‡, à¦†à¦¬à¦¾à¦° à¦šà§‡à¦·à§à¦Ÿà¦¾ à¦•à¦°à§à¦¨à¥¤';
      console.error('AJAX submit error:', err);
    } finally {
      form.classList.remove('is-loading');
      submitBtn.disabled = false;
    }
  });
})();

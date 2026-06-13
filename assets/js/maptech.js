// ── NAV STYLE ─────────────────────────────────────────
const currentPage = document.body.dataset.page || '';

function checkNavStyle(){
  const nav = document.getElementById('mainNav');
  if(!nav) return;
  if(currentPage === 'home' && window.scrollY < 80){
    nav.classList.remove('light');
  } else {
    nav.classList.add('light');
  }
}

window.addEventListener('scroll', function(){
  checkNavStyle();
  const btt = document.getElementById('btt');
  if(btt) btt.classList.toggle('show', window.scrollY > 400);
});

checkNavStyle();

// ── MOBILE NAV ────────────────────────────────────────
function openMob(){
  document.getElementById('mobNav').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMob(){
  document.getElementById('mobNav').classList.remove('open');
  document.body.style.overflow = '';
}

// ── FORM HANDLER ─────────────────────────────────────
function handleForm(e, form){
  e.preventDefault();
  const btn = form.querySelector('[type=submit]');
  btn.textContent = '✓ Sent! We\'ll be in touch shortly.';
  btn.style.background = '#059652';
  btn.disabled = true;
}

// ── SCROLL ANIMATIONS ────────────────────────────────
const io = new IntersectionObserver(function(entries){
  entries.forEach(function(en){
    if(en.isIntersecting){
      en.target.classList.add('visible');
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.fade-up, .fade-in').forEach(function(el){
  // Immediately show elements already in viewport on page load
  var rect = el.getBoundingClientRect();
  if(rect.top < window.innerHeight && rect.bottom > 0){
    el.classList.add('visible');
  } else {
    io.observe(el);
  }
});

// ── COOKIE BANNER ────────────────────────────────────
(function(){
  if(!localStorage.getItem('mt_cookie')){
    setTimeout(function(){
      const banner = document.getElementById('cookie-banner');
      if(banner) banner.classList.add('show');
    }, 1800);
  }
})();

function acceptCookies(){
  localStorage.setItem('mt_cookie', '1');
  const banner = document.getElementById('cookie-banner');
  if(banner) banner.classList.remove('show');
}

function rejectCookies(){
  localStorage.setItem('mt_cookie', '0');
  const banner = document.getElementById('cookie-banner');
  if(banner) banner.classList.remove('show');
}

// ── STAT COUNTER ANIMATION ────────────────────────────
(function(){
  var nums = document.querySelectorAll('.stat-num');
  if(!nums.length) return;
  var fired = false;

  function easeOut(t){ return 1 - Math.pow(1 - t, 3); }

  function runCounters(){
    if(fired) return;
    fired = true;
    nums.forEach(function(el){
      var raw    = el.textContent.trim();
      var target = parseInt(raw.replace(/\D/g,''), 10);
      var suffix = raw.replace(/[\d]/g,'');   // e.g. "+"
      if(!target) return;
      var dur = 2200, ts = null;
      function step(now){
        if(!ts) ts = now;
        var p = Math.min((now - ts) / dur, 1);
        el.textContent = Math.round(easeOut(p) * target) + suffix;
        if(p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  var bar = document.querySelector('.stats-bar');
  if(!bar){ runCounters(); return; }

  new IntersectionObserver(function(entries){
    if(entries[0].isIntersecting) runCounters();
  }, { threshold: 0.4 }).observe(bar);
})();

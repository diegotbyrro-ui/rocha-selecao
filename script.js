(() => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  let previousScroll = 0;

  const setHeader = () => {
    const y = window.scrollY;
    header?.classList.toggle('scrolled', y > 28);
    if (y > 550 && y > previousScroll + 6 && !document.body.classList.contains('menu-open')) {
      header?.classList.add('hidden');
    } else if (y < previousScroll - 6 || y < 550) {
      header?.classList.remove('hidden');
    }
    previousScroll = y;
  };

  window.addEventListener('scroll', setHeader, { passive: true });
  setHeader();

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    nav?.classList.toggle('open', !open);
    document.body.classList.toggle('menu-open', !open);
  });

  document.querySelectorAll('.nav-links a, a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const href = link.getAttribute('href');
      if (href?.startsWith('#') && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      menuButton?.setAttribute('aria-expanded', 'false');
      nav?.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

  document.querySelectorAll('.reveal').forEach(item => {
    if (reducedMotion) item.classList.add('visible');
    else revealObserver.observe(item);
  });

  const heroSlides = [...document.querySelectorAll('.hero-slide')];
  const progress = document.querySelector('.hero-progress span');
  let currentSlide = 0;
  let heroTimer;

  const playProgress = () => {
    if (!progress) return;
    progress.classList.remove('play');
    void progress.offsetWidth;
    progress.classList.add('play');
  };

  const showSlide = index => {
    heroSlides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    currentSlide = index;
    playProgress();
  };

  if (heroSlides.length > 1 && !reducedMotion) {
    showSlide(0);
    heroTimer = setInterval(() => showSlide((currentSlide + 1) % heroSlides.length), 6000);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) clearInterval(heroTimer);
      else heroTimer = setInterval(() => showSlide((currentSlide + 1) % heroSlides.length), 6000);
    });
  } else if (heroSlides.length) {
    showSlide(0);
  }

  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = lightbox?.querySelector('img');
  const closeLightbox = () => {
    lightbox?.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-lightbox]').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.dataset.lightbox || item.querySelector('img')?.src;
      const alt = item.querySelector('img')?.alt || 'Imagem do empreendimento';
      if (!src || !lightbox || !lightboxImage) return;
      lightboxImage.src = src;
      lightboxImage.alt = alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  lightbox?.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
  });
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeLightbox();
  });

  document.querySelectorAll('[data-whatsapp-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('nome') || '').trim();
      const phone = String(data.get('telefone') || '').trim();
      const interest = String(data.get('interesse') || '').trim();
      const message = String(data.get('mensagem') || '').trim();
      const project = form.dataset.project || 'Rocha Empreendimentos';
      const number = form.dataset.whatsapp || '558233133396';
      const text = [
        `Ol\u00e1, sou ${name || 'um visitante do site'}.`,
        `Tenho interesse em: ${interest || project}.`,
        phone ? `Meu telefone \u00e9 ${phone}.` : '',
        message ? `Mensagem: ${message}` : ''
      ].filter(Boolean).join('\n');
      window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
      const button = form.querySelector('button[type="submit"]');
      if (button) {
        const original = button.innerHTML;
        button.innerHTML = 'Abrindo atendimento <span class="arrow">\u2197</span>';
        setTimeout(() => button.innerHTML = original, 2600);
      }
    });
  });

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = String(new Date().getFullYear()));
})();

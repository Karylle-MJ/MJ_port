document.addEventListener('DOMContentLoaded', () => {
  /* ---------- 1. PROFILE IMAGE FALLBACK ---------- */
  const profilePhoto = document.getElementById('profile-photo');
  const imgPlaceholder = document.getElementById('img-placeholder');

  if (profilePhoto && imgPlaceholder) {
    const showPlaceholder = () => {
      profilePhoto.style.display = 'none';
      imgPlaceholder.classList.remove('hidden');
      imgPlaceholder.style.display = 'flex';
    };
    profilePhoto.addEventListener('error', showPlaceholder);
    if (profilePhoto.complete && profilePhoto.naturalWidth === 0) {
      showPlaceholder();
    }
  }

  /* ---------- 2. MOBILE MENU TOGGLE ---------- */
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileBtn && mobileMenu && menuIcon) {
    mobileBtn.addEventListener('click', () => {
      const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
      mobileBtn.setAttribute('aria-expanded', String(!isExpanded));
      mobileMenu.classList.toggle('hidden');
      menuIcon.textContent = isExpanded ? 'menu' : 'close';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileBtn.setAttribute('aria-expanded', 'false');
        menuIcon.textContent = 'menu';
      });
    });
  }

  /* ---------- 3. PROJECT CATEGORY FILTER ---------- */
  const filterButtons = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Reset all buttons to inactive state
      filterButtons.forEach(b => {
        b.classList.remove('bg-primary-container', 'text-on-primary', 'shadow-[0_0_10px_rgba(126,34,206,0.5)]', 'font-semibold');
        b.classList.add('text-on-surface-variant');
      });
      
      // Set clicked button to active state
      btn.classList.add('bg-primary-container', 'text-on-primary', 'shadow-[0_0_10px_rgba(126,34,206,0.5)]', 'font-semibold');
      btn.classList.remove('text-on-surface-variant');

      // Show / hide cards based on category
      projectCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        card.style.display = (filter === 'all' || filter === cardCat) ? 'flex' : 'none';
      });
    });
  });

  /* ---------- 4. ACTIVE NAV LINK ON SCROLL (SCROLL SPY) ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActive = (id) => {
    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === '#' + id;
      link.classList.toggle('text-primary', isActive);
      link.classList.toggle('border-b-2', isActive);
      link.classList.toggle('border-primary', isActive);
      link.classList.toggle('pb-1', isActive);
      link.classList.toggle('text-on-surface-variant', !isActive);
      link.classList.toggle('neon-text', isActive);
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(sec => observer.observe(sec));
  }
});
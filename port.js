document.addEventListener('DOMContentLoaded', () => {
  // Navigation active state highlight on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');
  const navbar = document.querySelector('.glass-nav');

  window.addEventListener('scroll', () => {
    let current = '';
    
    // Add shadow/background to navbar on scroll
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // Intersection Observer for scroll animations (reveal elements)
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Handle skill bars animation specifically when in view
        if (entry.target.querySelector('.progress')) {
          const progressBars = entry.target.querySelectorAll('.progress');
          progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
              bar.style.width = width;
            }, 300);
          });
        }
        
        // Unobserve after revealing to prevent re-animating
        // -> Uncomment below if you only want it to animate once
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
  });
});

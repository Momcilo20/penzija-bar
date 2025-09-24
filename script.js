// Fade-in pop-up on scroll for section text and Instagram tab
window.addEventListener('DOMContentLoaded', () => {
  const fadeEls = document.querySelectorAll('.fade-in-pop');
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });
  fadeEls.forEach(el => observer.observe(el));
});
// Slideshow for Photos section
let slideIndex = 0;
let slides, leftArrow, rightArrow, autoSlideInterval;



function mod(n, m) {
  return ((n % m) + m) % m;
}

function showSlide(idx) {
  const total = slides.length;
  slides.forEach((slide, i) => {
    // Calculate relative position in circular carousel
    let rel = mod(i - idx, total);
    if (rel > total / 2) rel -= total;
    slide.style.transformOrigin = '50% 50%';
    // Center slide
    if (rel === 0) {
      slide.style.transform = 'translate(-50%, -50%) scale(1.08)';
      slide.style.opacity = '1';
      slide.style.zIndex = 3;
      slide.style.filter = 'drop-shadow(0 8px 32px rgba(0,0,0,0.5))';
      slide.style.left = '50%';
      slide.style.top = '50%';
    } else if (Math.abs(rel) === 1) {
      // Left/right slides
      slide.style.transform = `translate(calc(-50% + ${rel * 32}vw), -50%) scale(0.7)`;
      slide.style.opacity = '0.7';
      slide.style.zIndex = 2;
      slide.style.filter = 'drop-shadow(0 4px 16px rgba(0,0,0,0.3))';
      slide.style.left = '50%';
      slide.style.top = '50%';
    } else {
      // Farther slides
      slide.style.transform = `translate(calc(-50% + ${rel * 50}vw), -50%) scale(0.5)`;
      slide.style.opacity = '0.3';
      slide.style.zIndex = 1;
      slide.style.filter = 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))';
      slide.style.left = '50%';
      slide.style.top = '50%';
    }
    slide.style.transition = 'transform 0.7s cubic-bezier(0.77,0,0.175,1), opacity 0.7s, filter 0.7s';
  });
}


function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex, 1);
}


function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex, -1);
}


function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}



window.addEventListener('DOMContentLoaded', () => {
  slides = document.querySelectorAll('.photos-section .slide');
  leftArrow = document.querySelector('.photos-section .arrow.left');
  rightArrow = document.querySelector('.photos-section .arrow.right');
  if (slides.length > 0) {
    // Set up initial positions for all slides
    slides.forEach((slide, i) => {
      slide.style.position = 'absolute';
      slide.style.top = '50%';
      slide.style.left = '50%';
      slide.style.transform = 'translate(-50%, -50%)';
      slide.style.width = '70vw';
      slide.style.height = '70vh';
      slide.style.maxWidth = '900px';
      slide.style.maxHeight = '600px';
      slide.style.minWidth = '200px';
      slide.style.minHeight = '120px';
      slide.style.margin = '0';
      slide.style.borderRadius = '2.5vw';
      slide.style.background = '#111';
      slide.style.objectFit = 'cover';
      slide.style.boxShadow = 'none';
      slide.style.transition = 'transform 0.7s cubic-bezier(0.77,0,0.175,1), opacity 0.7s, filter 0.7s';
    });
    showSlide(slideIndex);
    startAutoSlide();
    leftArrow.addEventListener('click', () => {
      stopAutoSlide();
      prevSlide();
      startAutoSlide();
    });
    rightArrow.addEventListener('click', () => {
      stopAutoSlide();
      nextSlide();
      startAutoSlide();
    });

    // Touch events for swipe
    let startX = 0;
    let endX = 0;
    const threshold = 50; // px
    const slideshow = document.querySelector('.photos-section .slideshow');
    if (slideshow) {
      slideshow.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          startX = e.touches[0].clientX;
        }
      });
      slideshow.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) {
          endX = e.touches[0].clientX;
        }
      });
      slideshow.addEventListener('touchend', (e) => {
        if (startX && endX) {
          const diff = endX - startX;
          if (Math.abs(diff) > threshold) {
            stopAutoSlide();
            if (diff > 0) {
              prevSlide();
            } else {
              nextSlide();
            }
            startAutoSlide();
          }
        }
        startX = 0;
        endX = 0;
      });
    }
  }

  // Pop-up animation for Home section
  document.querySelectorAll('.pop-up').forEach((el) => {
    el.classList.add('pop-up');
  });
});

// Pop-up animation for Home section
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.pop-up').forEach((el) => {
    el.classList.add('pop-up');
  });
});

document.addEventListener('DOMContentLoaded', () => {
    // Navbar Blur on Scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Number Counters
    const counters = document.querySelectorAll('.counter');
    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000; 
                const stepTime = Math.abs(Math.floor(duration / target));
                let current = 0;
                
                const timer = setInterval(() => {
                    current += Math.ceil(target / 100);
                    if (current >= target) {
                        counter.innerText = target;
                        clearInterval(timer);
                    } else {
                        counter.innerText = current;
                    }
                }, stepTime);
                observer.unobserve(counter);
            }
        });
    };

    const counterObserver = new IntersectionObserver(animateCounters, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));

    // Footer Year
    const yearEl = document.getElementById('current-year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();

    // Lightbox for Gallery
    const galleryItems = Array.from(document.querySelectorAll('.masonry-item img'));
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lb-img');
    const lbClose = document.getElementById('lb-close');
    const lbPrev = document.getElementById('lb-prev');
    const lbNext = document.getElementById('lb-next');
    let currentIndex = 0;

    if (lightbox && galleryItems.length > 0) {
        galleryItems.forEach((img, index) => {
            img.addEventListener('click', () => {
                currentIndex = index;
                lbImg.src = img.src;
                lightbox.classList.add('active');
            });
        });

        const showImage = (index) => {
            if (index < 0) currentIndex = galleryItems.length - 1;
            else if (index >= galleryItems.length) currentIndex = 0;
            else currentIndex = index;
            lbImg.src = galleryItems[currentIndex].src;
        };

        if(lbPrev) lbPrev.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex - 1); });
        if(lbNext) lbNext.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex + 1); });

        lbClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox) lightbox.classList.remove('active');
        });
    }
});

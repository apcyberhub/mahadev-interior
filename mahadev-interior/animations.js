/*
* Mahadev Interior Exterior - Animations JavaScript
* Author: Gemini Code Assist
* Version: 1.0.0
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- SCROLL REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.reveal-fade, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-zoom');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- STATS COUNTER ---
    const statNumbers = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the slower

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const inc = target / speed;

                const updateCount = () => {
                    const count = +entry.target.innerText;
                    if (count < target) {
                        entry.target.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 1);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(counter => {
        counterObserver.observe(counter);
    });

    // --- TILT CARD EFFECT ---
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const { width, height } = rect;
            const rotateX = (y / height - 0.5) * -20; // Max rotation 10deg
            const rotateY = (x / width - 0.5) * 20;   // Max rotation 10deg

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

            // Glow effect
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // --- MOUSE MOVE PARALLAX FOR HERO SHAPES ---
    const heroSection = document.querySelector('.hero-section');
    const floatingShapes = document.querySelectorAll('.floating-shapes .shape');

    heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * -40;
        const y = (clientY / window.innerHeight - 0.5) * -40;

        floatingShapes.forEach((shape, i) => {
            const factor = (i + 1) * 0.5;
            shape.style.transform = `translateX(${x * factor}px) translateY(${y * factor}px)`;
        });
    });

    // --- PARALLAX SCROLLING FOR HERO ---
    const bgImg = document.getElementById('parallax-bg-img');
    const midImg = document.getElementById('parallax-mid-img');
    const foreImg = document.getElementById('parallax-fore-img');

    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        
        // Move layers at different speeds. Slower for farther images.
        if (bgImg) bgImg.style.transform = `translateY(${scrollValue * 0.3}px)`;
        if (midImg) midImg.style.transform = `translateY(${scrollValue * 0.5}px)`;
        // The foreground is often kept static or moved very little.
        // if (foreImg) foreImg.style.transform = `translateY(${scrollValue * 0.7}px)`;
    });
});
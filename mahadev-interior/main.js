/*
* Mahadev Interior Exterior - Main JavaScript
* Author: Gemini Code Assist
* Version: 1.0.0
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- LOADER ---
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');
    window.addEventListener('load', () => {
        loader.classList.add('hidden');
        mainContent.style.display = 'block';
    });

    // --- THEME TOGGLE ---
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.className = currentTheme + '-theme';

    themeToggle.addEventListener('click', () => {
        let newTheme = document.documentElement.classList.contains('dark-theme') ? 'light' : 'dark';
        document.documentElement.className = newTheme + '-theme';
        localStorage.setItem('theme', newTheme);
    });

    // --- STICKY NAVIGATION ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- MOBILE NAVIGATION ---
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    // --- ACTIVE LINK ON SCROLL ---
    const sections = document.querySelectorAll('section[id]');
    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 58;
            const sectionId = current.getAttribute('id');
            const link = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        });
    }
    window.addEventListener('scroll', scrollActive);

    // --- FAQ ACCORDION ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const openItem = document.querySelector('.faq-item.active');
            if (openItem && openItem !== item) {
                openItem.classList.remove('active');
                openItem.querySelector('.faq-answer').style.maxHeight = 0;
            }

            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = 0;
            }
        });
    });

    // --- BACK TO TOP BUTTON ---
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // --- FORM VALIDATION ---
    const contactForm = document.getElementById('contact-form');
    const whatsappSubmitBtn = document.getElementById('whatsapp-submit-btn');

    whatsappSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            const whatsappNumber = '918368294067';
            let whatsappMessage = `Hello, I'd like to inquire about your services.\n\n`;
            whatsappMessage += `Name: ${name}\n`;
            whatsappMessage += `Email: ${email}\n`;
            whatsappMessage += `Message: ${message}`;
            
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
            contactForm.reset();
        } else {
            alert('Please fill out all fields.');
        }
    });

    // --- RIPPLE BUTTON EFFECT ---
    const rippleButtons = document.querySelectorAll('.ripple-btn');
    rippleButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            const x = e.clientX - e.target.offsetLeft;
            const y = e.clientY - e.target.offsetTop;

            const ripples = document.createElement('span');
            ripples.classList.add('ripple');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            this.appendChild(ripples);

            setTimeout(() => {
                ripples.remove();
            }, 600);
        });
    });

    // --- COPYRIGHT YEAR ---
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
});
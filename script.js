(function() {
    'use strict';

    const STORAGE_KEY = 'preferred-language';
    let currentLang = localStorage.getItem(STORAGE_KEY) || 'en';

    document.addEventListener('DOMContentLoaded', function() {
        initLanguage();
        initMobileMenu();
        initSmoothScroll();
    });

    function initLanguage() {
        setLanguage(currentLang);

        document.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', function() {
                setLanguage(this.getAttribute('data-lang'));
            });
        });
    }

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem(STORAGE_KEY, lang);
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-en][data-de]').forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) el.textContent = text;
        });

        document.querySelectorAll('.lang-option').forEach(option => {
            option.classList.toggle('active', option.getAttribute('data-lang') === lang);
        });
    }

    function initMobileMenu() {
        const btn = document.getElementById('mobileMenuBtn');
        const nav = document.querySelector('.nav-links');

        if (btn && nav) {
            btn.addEventListener('click', function() {
                nav.classList.toggle('active');
                btn.classList.toggle('active');
            });

            nav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    nav.classList.remove('active');
                    btn.classList.remove('active');
                });
            });
        }
    }

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = 100;
                    const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: position, behavior: 'smooth' });
                }
            });
        });
    }

    window.setLanguage = setLanguage;
})();

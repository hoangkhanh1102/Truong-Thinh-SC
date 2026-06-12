// ======================================================
// TRUONG THINH SC - SECURITY SERVICES WEBSITE SCRIPT
// ======================================================

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. MOBILE NAVIGATION TOGGLE
    // ==========================================
    const mobileToggle = document.getElementById('mobile-toggle-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-btn');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileDrawer.classList.toggle('open');
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileDrawer.classList.remove('open');
        });
    });

    // ==========================================
    // 2. ACTIVE NAV HIGHLIGHT ON SCROLL
    // ==========================================
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPos = window.pageYOffset + 150;

        sections.forEach(section => {
            if (scrollPos >= section.offsetTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // 3. (CALCULATOR REMOVED)
    // ==========================================

    // ==========================================
    // 4. GALLERY LIGHTBOX
    // ==========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxBackdrop = document.getElementById('lightbox-backdrop');
    const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.gallery-img');
            const caption = item.getAttribute('data-caption') || '';

            if (lightboxImg && img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
            }
            if (lightboxCaption) lightboxCaption.textContent = caption;
            if (lightbox) lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        if (lightbox) lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // ==========================================
    // 5. FORM SUBMISSION HANDLERS
    // ==========================================
    const successModal = document.getElementById('success-modal');
    const successMsg = document.getElementById('success-modal-msg');
    const btnSuccessClose = document.getElementById('btn-success-close');
    const successBackdrop = document.getElementById('success-backdrop');

    function showSuccess(name, phone, service) {
        const serviceText = service ? ` về <strong>${service}</strong>` : '';
        if (successMsg) {
            successMsg.innerHTML = `Cảm ơn <strong>${name}</strong>! Chúng tôi đã nhận được yêu cầu tư vấn${serviceText} qua số điện thoại <strong>${phone}</strong>. Đội ngũ bảo vệ Trường Thịnh SC sẽ gọi lại xác nhận trong vòng 30 phút.`;
        }
        if (successModal) successModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeSuccess() {
        if (successModal) successModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (btnSuccessClose) btnSuccessClose.addEventListener('click', closeSuccess);
    if (successBackdrop) successBackdrop.addEventListener('click', closeSuccess);

    // Hero Lead Form
    const heroLeadForm = document.getElementById('hero-lead-form');
    if (heroLeadForm) {
        heroLeadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('hero-name').value.trim();
            const phone = document.getElementById('hero-phone').value.trim();
            const service = document.getElementById('hero-service').value;

            if (!name) {
                shakeInput(document.getElementById('hero-name'));
                return;
            }
            if (!phone) {
                shakeInput(document.getElementById('hero-phone'));
                return;
            }

            showSuccess(name, phone, service);
            heroLeadForm.reset();
        });
    }

    // Main Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value.trim();
            const phone = document.getElementById('contact-phone').value.trim();
            const msg = document.getElementById('contact-msg').value.trim();

            if (!name) { shakeInput(document.getElementById('contact-name')); return; }
            if (!phone) { shakeInput(document.getElementById('contact-phone')); return; }
            if (!msg) { shakeInput(document.getElementById('contact-msg')); return; }

            showSuccess(name, phone, 'Yêu cầu liên hệ');
            contactForm.reset();
        });
    }

    // Input shake animation for validation
    function shakeInput(input) {
        if (!input) return;
        input.classList.add('shake-error');
        input.style.borderColor = '#EF4444';
        setTimeout(() => {
            input.classList.remove('shake-error');
            input.style.borderColor = '';
        }, 600);
        input.focus();
    }

    // ==========================================
    // 6. SMOOTH SCROLL & HEADER EFFECTS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==========================================
    // 7. SCROLL REVEAL ANIMATION
    // ==========================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.service-card, .gallery-item, .value-card, .contact-item, .stat-box').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

});

const menuButton = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');
const contactForm = document.getElementById('contactForm');

function closeMenu() {
    menuButton.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    navMenu.classList.remove('active');
}

menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
    menuButton.classList.toggle('active', !isOpen);
    navMenu.classList.toggle('active', !isOpen);
});

navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuButton.focus();
    }
});

const updateHeader = () => {
    header.classList.toggle('scrolled', window.scrollY > 16);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });

    document.querySelectorAll('.service-card, .feature-card, .tech-category, .contact-item').forEach((element) => {
        element.classList.add('reveal');
        revealObserver.observe(element);
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const subject = contactForm.querySelector('#subject');
        const fields = {
            name: String(formData.get('name') || '').trim(),
            email: String(formData.get('email') || '').trim(),
            phone: String(formData.get('phone') || '').trim(),
            subject: subject.selectedOptions[0].textContent.trim(),
            message: String(formData.get('message') || '').trim()
        };
        const message = [
            'Olá, JGtche! Gostaria de conversar sobre um projeto.',
            '',
            `Nome: ${fields.name}`,
            `Email: ${fields.email}`,
            fields.phone ? `Telefone: ${fields.phone}` : '',
            `Assunto: ${fields.subject}`,
            '',
            fields.message
        ].filter(Boolean).join('\n');
        const whatsappUrl = `https://wa.me/5548988690975?text=${encodeURIComponent(message)}`;
        const status = document.getElementById('form-status');
        const link = document.createElement('a');

        link.href = whatsappUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Abrir conversa no WhatsApp';
        status.replaceChildren(
            document.createTextNode('Sua mensagem está pronta. Revise e envie pelo WhatsApp: '),
            link
        );
    });
}

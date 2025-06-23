// ===== VARIÁVEIS GLOBAIS =====
let isMenuOpen = false;
let scrollPosition = 0;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== INICIALIZAÇÃO DA APLICAÇÃO =====
function initializeApp() {
    setupNavigation();
    setupScrollEffects();
    setupFormHandling();
    setupAnimations();
    setupProductInteractions();
    setupSmoothScrolling();
    setupHeaderScroll();
    setupScrollReveal();
}

// ===== NAVEGAÇÃO =====
function setupNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle do menu mobile
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            toggleMobileMenu();
        });
    }

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Destacar link ativo baseado na seção visível
    setupActiveNavigation();
}

function toggleMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    isMenuOpen = !isMenuOpen;
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevenir scroll do body quando menu estiver aberto
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}

function closeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    isMenuOpen = false;
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

function setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== EFEITOS DE SCROLL =====
function setupScrollEffects() {
    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function handleScroll() {
    scrollPosition = window.pageYOffset;
    
    // Parallax effect no hero
    const hero = document.querySelector('.hero');
    if (hero) {
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrollPosition * parallaxSpeed}px)`;
    }

    // Fade effect nos elementos
    const fadeElements = document.querySelectorAll('.fade-on-scroll');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
}

function setupHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (scrollPosition > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== SCROLL REVEAL =====
function setupScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Adicionar classe scroll-reveal aos elementos automaticamente
    const autoRevealElements = document.querySelectorAll('.about-item, .product-card, .contact-item');
    autoRevealElements.forEach((element, index) => {
        element.classList.add('scroll-reveal');
        element.style.transitionDelay = `${index * 0.1}s`;
    });
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== INTERAÇÕES DOS PRODUTOS =====
function setupProductInteractions() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const viewBtn = card.querySelector('.btn-view');
        const contactBtn = card.querySelector('.btn-contact');
        
        // Efeito hover 3D
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
        
        // Modal de detalhes do produto (simulado)
        if (viewBtn) {
            viewBtn.addEventListener('click', function() {
                const productTitle = card.querySelector('.product-title').textContent;
                showProductModal(productTitle);
            });
        }
        
        // Contato via WhatsApp
        if (contactBtn) {
            contactBtn.addEventListener('click', function() {
                const productTitle = card.querySelector('.product-title').textContent;
                openWhatsApp(productTitle);
            });
        }
    });
}

function showProductModal(productName) {
    // Simulação de modal - em um projeto real, seria implementado um modal completo
    const message = `Você está interessado em: ${productName}\n\nEm breve implementaremos uma galeria completa com mais detalhes!`;
    
    // Criar modal simples
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${productName}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Detalhes completos do produto em breve!</p>
                <p>Entre em contato conosco para mais informações.</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="openWhatsApp('${productName}')">
                    <i class="fab fa-whatsapp"></i> Contato via WhatsApp
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Fechar modal
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // Fechar ao clicar fora
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Adicionar estilos do modal
    addModalStyles();
}

function addModalStyles() {
    if (!document.querySelector('#modal-styles')) {
        const styles = document.createElement('style');
        styles.id = 'modal-styles';
        styles.textContent = `
            .product-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                background: white;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                animation: slideIn 0.3s ease;
            }
            
            .modal-header {
                padding: 1.5rem;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-header h3 {
                margin: 0;
                color: var(--primary-color);
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #999;
            }
            
            .modal-body {
                padding: 1.5rem;
            }
            
            .modal-footer {
                padding: 1.5rem;
                border-top: 1px solid #eee;
                text-align: center;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
}

function openWhatsApp(productName = '') {
    const phoneNumber = '5551999998888';
    let message = 'Olá! Gostaria de saber mais sobre os instrumentos da JGTche.';
    
    if (productName) {
        message = `Olá! Tenho interesse no ${productName}. Gostaria de mais informações.`;
    }
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// ===== FORMULÁRIO DE CONTATO =====
function setupFormHandling() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this);
        });
        
        // Validação em tempo real
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

function handleFormSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validar todos os campos
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    if (isValid) {
        // Simular envio do formulário
        showFormSuccess();
        
        // Em um projeto real, aqui seria feita a requisição para o servidor
        // ou integração com serviço de email
        
        // Opcional: Abrir WhatsApp com os dados do formulário
        const message = `Olá! Segue minha mensagem do site:
        
Nome: ${data.name}
Email: ${data.email}
Telefone: ${data.phone || 'Não informado'}
Assunto: ${data.subject}

Mensagem: ${data.message}`;
        
        setTimeout(() => {
            const confirm = window.confirm('Deseja enviar esta mensagem via WhatsApp também?');
            if (confirm) {
                const whatsappUrl = `https://wa.me/5551999998888?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            }
        }, 2000);
        
    } else {
        showFormError('Por favor, corrija os campos destacados.');
    }
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Limpar erros anteriores
    clearFieldError(field);
    
    // Validação de campo obrigatório
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'Este campo é obrigatório.';
        isValid = false;
    }
    
    // Validação de email
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Por favor, insira um email válido.';
            isValid = false;
        }
    }
    
    // Validação de telefone
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\(\)\-\+]+$/;
        if (!phoneRegex.test(value) || value.length < 10) {
            errorMessage = 'Por favor, insira um telefone válido.';
            isValid = false;
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remover mensagem de erro anterior
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Adicionar nova mensagem de erro
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function showFormSuccess() {
    const form = document.getElementById('contact-form');
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Mensagem enviada com sucesso!</h3>
            <p>Entraremos em contato em breve.</p>
        </div>
    `;
    
    form.style.display = 'none';
    form.parentNode.appendChild(successMessage);
    
    // Adicionar estilos da mensagem de sucesso
    addFormStyles();
    
    // Resetar formulário após 5 segundos
    setTimeout(() => {
        form.reset();
        form.style.display = 'block';
        successMessage.remove();
    }, 5000);
}

function showFormError(message) {
    // Implementar notificação de erro
    console.error('Erro no formulário:', message);
}

function addFormStyles() {
    if (!document.querySelector('#form-styles')) {
        const styles = document.createElement('style');
        styles.id = 'form-styles';
        styles.textContent = `
            .form-group input.error,
            .form-group select.error,
            .form-group textarea.error {
                border-color: #dc3545;
                box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
            }
            
            .error-message {
                color: #dc3545;
                font-size: 0.875rem;
                margin-top: 0.25rem;
                display: flex;
                align-items: center;
                gap: 0.25rem;
            }
            
            .error-message::before {
                content: '⚠';
            }
            
            .form-success {
                background: linear-gradient(135deg, #28a745, #20c997);
                color: white;
                padding: 2rem;
                border-radius: 15px;
                text-align: center;
                animation: slideInUp 0.5s ease;
            }
            
            .success-content i {
                font-size: 3rem;
                margin-bottom: 1rem;
                display: block;
            }
            
            .success-content h3 {
                margin-bottom: 0.5rem;
                color: white;
            }
            
            @keyframes slideInUp {
                from {
                    transform: translateY(30px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
}

// ===== ANIMAÇÕES =====
function setupAnimations() {
    // Animação de entrada dos elementos
    const animatedElements = document.querySelectorAll('.hero-content, .section-header');
    
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
        element.classList.add('fade-in-up');
    });
    
    // Animação de contadores (se houver)
    setupCounters();
    
    // Animação de typing effect no hero
    setupTypingEffect();
}

function setupCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counter.textContent = Math.floor(current);
    }, 16);
}

function setupTypingEffect() {
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// ===== UTILITÁRIOS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== EVENTOS DE REDIMENSIONAMENTO =====
window.addEventListener('resize', debounce(function() {
    // Fechar menu mobile se a tela for redimensionada para desktop
    if (window.innerWidth > 768 && isMenuOpen) {
        closeMobileMenu();
    }
}, 250));

// ===== EVENTOS DE CARREGAMENTO =====
window.addEventListener('load', function() {
    // Remover loader se houver
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
    
    // Iniciar animações de entrada
    document.body.classList.add('loaded');
});

// ===== TRATAMENTO DE ERROS =====
window.addEventListener('error', function(e) {
    console.error('Erro JavaScript:', e.error);
});

// ===== PERFORMANCE =====
// Lazy loading para imagens (se necessário)
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== ACESSIBILIDADE =====
function setupAccessibility() {
    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Focus trap no menu mobile
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' && isMenuOpen) {
            const navMenu = document.getElementById('nav-menu');
            const focusableContent = navMenu.querySelectorAll(focusableElements);
            const firstFocusableElement = focusableContent[0];
            const lastFocusableElement = focusableContent[focusableContent.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Inicializar acessibilidade
setupAccessibility();


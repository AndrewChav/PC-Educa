/**
 * ============================================
 * PC EDUCA - JAVASCRIPT TECNOLÓGICO
 * Animaciones e interactividad mejorada
 * ============================================
 */

// Variables globales
let currentSlideIndex = 0;
let slideInterval;
let userName = '';
let particles = [];
let mouse = { x: 0, y: 0 };

// Datos de imágenes para la galería (simulados)
const galleryImages = [
    { src: 'cpu-1.jpg', category: 'cpu', title: 'Intel Core i7' },
    { src: 'cpu-2.jpg', category: 'cpu', title: 'AMD Ryzen 7' },
    { src: 'cpu-3.jpg', category: 'cpu', title: 'Socket LGA1700' },
    { src: 'ram-1.jpg', category: 'ram', title: 'RAM DDR4 RGB' },
    { src: 'ram-2.jpg', category: 'ram', title: 'Kit Dual Channel' },
    { src: 'ram-3.jpg', category: 'ram', title: 'Ranuras DIMM' },
    { src: 'mobo-1.jpg', category: 'motherboard', title: 'Placa Madre ATX' },
    { src: 'mobo-2.png', category: 'motherboard', title: 'Chipset y VRM' },
    { src: 'mobo-3.png', category: 'motherboard', title: 'Panel de E/S' },
    { src: 'gpu-1.jpg', category: 'gpu', title: 'RTX 3070 Gaming' },
    { src: 'gpu-2.png', category: 'gpu', title: 'Cooler de GPU' },
    { src: 'gpu-3.png', category: 'gpu', title: 'Conectores de Video' },
    { src: 'ssd-1.jpg', category: 'storage', title: 'SSD SATA' },
    { src: 'ssd-2.png', category: 'storage', title: 'SSD NVMe M.2' },
    { src: 'hdd-1.png', category: 'storage', title: 'HDD 3.5"' },
    { src: 'psu-1.jpg', category: 'psu', title: 'PSU Modular 750W' },
    { src: 'psu-2.png', category: 'psu', title: 'Cables de Alimentación' },
    { src: 'cooler-1.jpg', category: 'cooling', title: 'Cooler de Aire' },
    { src: 'cooler-2.png', category: 'cooling', title: 'AIO Líquida' },
    { src: 'fans-1.png', category: 'cooling', title: 'Ventiladores RGB' },
    { src: 'case-1.jpg', category: 'case', title: 'Gabinete ATX Gaming' },
    { src: 'case-2.png', category: 'case', title: 'Interior del Gabinete' },
    { src: 'pc-complete-1.jpg', category: 'all', title: 'PC Gamer Completa' }
];

// ============================================
// PANTALLA DE BIENVENIDA MEJORADA
// ============================================

function initializeWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');

    if (!welcomeScreen || !mainContent) return;

    // Crear partículas animadas
    createWelcomeParticles();
    
    // Mostrar prompt inmediatamente
    showNamePrompt();
}

function createWelcomeParticles() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    
    // Crear múltiples partículas
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (6 + Math.random() * 4) + 's';
        particlesContainer.appendChild(particle);
    }
    
    welcomeScreen.appendChild(particlesContainer);
}

function showNamePrompt() {
    // Pedir nombre al usuario
    const userName = prompt('¡Bienvenido a PC Educa! ¿Cuál es tu nombre?');
    
    if (userName && userName.trim() !== '') {
        // Mostrar saludo personalizado
        showPersonalizedGreeting(userName.trim());
    } else {
        // Si no ingresa nombre, usar "Estudiante"
        showPersonalizedGreeting('Usuario');
    }
}
function showPersonalizedGreeting(name) {
    const welcomeTitle = document.getElementById('welcome-title');
    const welcomeMessage = document.getElementById('welcome-message');

    if (welcomeTitle) {
        welcomeTitle.setAttribute('data-text', `¡Bienvenido/a, ${name}!`);
        welcomeTitle.textContent = `¡Bienvenido/a, ${name}!`;
    }

    if (welcomeMessage) {
        const message = 'Tu aventura de aprendizaje sobre hardware PC comienza ahora...';
        welcomeMessage.textContent = '';
        
        // Crear un span para el texto y otro para el cursor
        const textSpan = document.createElement('span');
        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'typing-cursor';
        cursorSpan.textContent = '|';
        
        welcomeMessage.appendChild(textSpan);
        welcomeMessage.appendChild(cursorSpan);
        
        // Remover el borde del mensaje principal
        welcomeMessage.style.borderRight = 'none';
        
        // Efecto de máquina de escribir
        let i = 0;
        const typeWriter = () => {
            if (i < message.length) {
                textSpan.textContent += message.charAt(i);
                i++;
                setTimeout(typeWriter, 50); // Velocidad de escritura (50ms por letra)
            } else {
                // Mantener el cursor parpadeando después de escribir
                cursorSpan.style.animation = 'blink-caret 0.75s step-end infinite';
            }
        };
        
        typeWriter();
    }

    // Guardar nombre en localStorage
    localStorage.setItem('userName', name);

    // Ocultar pantalla de bienvenida después de 5 segundos
    setTimeout(() => {
        hideWelcomeScreen();
    }, 5000);
}

function hideWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');

    if (welcomeScreen && mainContent) {
        // Añadir fade-out a la pantalla de bienvenida
        welcomeScreen.style.opacity = '0';
        welcomeScreen.style.transition = 'opacity 1s ease';
        
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.style.opacity = '0';
            mainContent.style.transition = 'opacity 1s ease';
            
            // Mostrar contenido principal con fade-in
            setTimeout(() => {
                mainContent.style.opacity = '1';
                // Iniciar animaciones de scroll
                initializeScrollAnimations();
            }, 50);
        }, 1000);
    }
}
// ============================================
// NAVEGACIÓN MEJORADA
// ============================================

function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
        
        // Cerrar menú al hacer clic en un enlace (móvil)
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    closeMobileMenu();
                }
            });
        });
    }
    
    // Destacar sección activa en el scroll
    initializeScrollSpy();
    
    // Efecto de hover en navegación
    initializeNavHoverEffects();
}

function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animación de entrada del menú
        if (navMenu.classList.contains('active')) {
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach((link, index) => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    link.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    }
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

function initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    window.addEventListener('scroll', () => {
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
            if (link.getAttribute('href') === `${current}.html` || 
                link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function initializeNavHoverEffects() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            // Efecto de brillo
            link.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.textShadow = 'none';
        });
    });
}

// ============================================
// BANNER ANIMADO MEJORADO
// ============================================

function initializeBanner() {
    const bannerSlider = document.querySelector('.banner-slider');
    if (!bannerSlider) return;
    
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // Iniciar carrusel automático
    startAutoSlide();
    
    // Agregar eventos a los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide(index + 1);
        });
    });
    
    // Pausar carrusel al hacer hover
    bannerSlider.addEventListener('mouseenter', stopAutoSlide);
    bannerSlider.addEventListener('mouseleave', startAutoSlide);
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 6000); // Aumentado a 6 segundos
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // Ocultar slide actual
    slides[currentSlideIndex].classList.remove('active');
    indicators[currentSlideIndex].classList.remove('active');
    
    // Calcular nuevo índice
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    // Mostrar nuevo slide
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
    
    // Reiniciar temporizador
    stopAutoSlide();
    startAutoSlide();
    
    // Animar contenido del slide
    animateSlideContent();
}

function currentSlide(index) {
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // Ocultar slide actual
    slides[currentSlideIndex].classList.remove('active');
    indicators[currentSlideIndex].classList.remove('active');
    
    // Mostrar slide seleccionado
    currentSlideIndex = index - 1;
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
    
    // Reiniciar temporizador
    stopAutoSlide();
    startAutoSlide();
    
    // Animar contenido del slide
    animateSlideContent();
}

function animateSlideContent() {
    const activeSlide = document.querySelector('.banner-slide.active');
    if (!activeSlide) return;
    
    const title = activeSlide.querySelector('h2');
    const description = activeSlide.querySelector('p');
    
    if (title) {
        title.style.animation = 'none';
        setTimeout(() => {
            title.style.animation = 'slideInFromLeft 1s ease';
        }, 50);
    }
    
    if (description) {
        description.style.animation = 'none';
        setTimeout(() => {
            description.style.animation = 'slideInFromRight 1s ease 0.3s both';
        }, 50);
    }
}

// ============================================
// GALERÍA INTERACTIVA MEJORADA
// ============================================

// Variables para navegación de imágenes en lightbox
let currentImageIndex = 0;
let currentFilteredImages = [];

function initializeGallery() {
    initializeGalleryFilters();
    initializeLightbox();
    initializeGalleryAnimations();
}

function initializeGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length === 0 || galleryItems.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Actualizar botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filtrar elementos con animación
            filterGalleryItems(filter);
        });
    });
}

function filterGalleryItems(filter) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-30px)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

function initializeLightbox() {
    // Event listener para cerrar con ESC
    document.addEventListener('keydown', handleLightboxKeydown);
}

function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    
    if (lightbox && lightboxImage) {
        // Obtener todas las imágenes visibles actualmente
        const visibleItems = document.querySelectorAll('.gallery-item[style*="display: block"], .gallery-item:not([style*="display: none"])');
        currentFilteredImages = Array.from(visibleItems).map(item => {
            const img = item.querySelector('img');
            return img ? img.getAttribute('src') : null;
        }).filter(src => src !== null);
        
        // Encontrar el índice de la imagen actual
        currentImageIndex = currentFilteredImages.findIndex(src => src === imageSrc);
        if (currentImageIndex === -1) currentImageIndex = 0;
        
        lightboxImage.src = imageSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animar entrada
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.style.transition = 'opacity 0.3s ease';
            lightbox.style.opacity = '1';
        }, 10);
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    if (lightbox) {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

function handleLightboxKeydown(event) {
    if (event.key === 'Escape') {
        closeLightbox();
    } else if (event.key === 'ArrowLeft') {
        previousImage();
    } else if (event.key === 'ArrowRight') {
        nextImage();
    }
}

function previousImage() {
    if (currentFilteredImages.length === 0) return;
    
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = currentFilteredImages.length - 1;
    }
    
    updateLightboxImage();
}

function nextImage() {
    if (currentFilteredImages.length === 0) return;
    
    currentImageIndex++;
    if (currentImageIndex >= currentFilteredImages.length) {
        currentImageIndex = 0;
    }
    
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightbox-image');
    if (lightboxImage && currentFilteredImages[currentImageIndex]) {
        // Animar transición
        lightboxImage.style.opacity = '0';
        lightboxImage.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            lightboxImage.src = currentFilteredImages[currentImageIndex];
            lightboxImage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            lightboxImage.style.opacity = '1';
            lightboxImage.style.transform = 'scale(1)';
        }, 150);
    }
}

function initializeGalleryAnimations() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ============================================
// ANIMACIONES AL HACER SCROLL MEJORADAS
// ============================================

function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.component-card, .compatibility-card, .feature-card, .resource-card, .level-item, .tool-item'
    );
    
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// ELEMENTOS INTERACTIVOS MEJORADOS
// ============================================

function initializeInteractiveElements() {
    initializeTooltips();
    initializeProgressBars();
    initializeInteractiveCards();
    initializeHoverEffects();
    initializeParticleCursor();
}

function initializeTooltips() {
    // Agregar tooltips a elementos con data-tooltip
    const elementsWithTooltip = document.querySelectorAll('[data-tooltip]');
    
    elementsWithTooltip.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(event) {
    const element = event.target;
    const tooltipText = element.getAttribute('data-tooltip');
    
    if (!tooltipText) return;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(22, 33, 62, 0.95);
        color: #00d4ff;
        padding: 0.8rem 1rem;
        border-radius: 8px;
        font-size: 0.9rem;
        z-index: 10000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        border: 1px solid rgba(0, 212, 255, 0.3);
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
        font-family: 'JetBrains Mono', monospace;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
    
    element.tooltip = tooltip;
}

function hideTooltip(event) {
    const element = event.target;
    const tooltip = element.tooltip;
    
    if (tooltip) {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 300);
        element.tooltip = null;
    }
}

function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.style.width || '0%';
                
                // Animar barra de progreso
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 200);
            }
        });
    });
    
    progressBars.forEach(bar => observer.observe(bar));
}

function initializeInteractiveCards() {
    // Agregar efectos hover a las tarjetas
    const cards = document.querySelectorAll('.component-card, .compatibility-card, .feature-card, .resource-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initializeHoverEffects() {
    // Efectos hover para botones
    const buttons = document.querySelectorAll('.banner-btn, .view-btn, .filter-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });
}

function initializeParticleCursor() {
    // Crear efecto de partículas siguiendo el mouse
    let particleCount = 0;
    
    document.addEventListener('mousemove', (e) => {
        if (particleCount % 5 === 0) { // Crear partícula cada 5 movimientos
            createMouseParticle(e.clientX, e.clientY);
        }
        particleCount++;
    });
    
    function createMouseParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #00d4ff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x}px;
            top: ${y}px;
            opacity: 0.8;
            box-shadow: 0 0 10px #00d4ff;
        `;
        
        document.body.appendChild(particle);
        
        // Animar partícula
        particle.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.8 },
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        };
    }
}

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const colors = {
        success: '#00ff88',
        error: '#ff6b35',
        info: '#00d4ff',
        warning: '#ffd700'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(22, 33, 62, 0.95);
        color: ${colors[type]};
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px ${colors[type]}40;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        border: 1px solid ${colors[type]}40;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-cerrar después de 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('¡Copiado al portapapeles!', 'success');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showNotification('¡Copiado al portapapeles!', 'success');
}

function formatNumber(num) {
    return new Intl.NumberFormat('es-ES').format(num);
}

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

// ============================================
// FUNCIONES PARA RECURSOS EDUCATIVOS
// ============================================

function startQuiz(quizType) {
    showNotification(`El quiz "${quizType}" estará disponible próximamente.`, 'info');
}

function startGame(gameType) {
    showNotification(`El juego "${gameType}" estará disponible próximamente.`, 'info');
}

function downloadMaterial(materialType) {
    showNotification(`El material "${materialType}" estará disponible para descarga próximamente.`, 'info');
}

// ============================================
// COMPATIBILIDAD DEL NAVEGADOR
// ============================================

function checkBrowserCompatibility() {
    const features = {
        cssGrid: CSS.supports('display', 'grid'),
        cssFlexbox: CSS.supports('display', 'flex'),
        cssCustomProperties: CSS.supports('color', 'var(--test)'),
        intersectionObserver: 'IntersectionObserver' in window,
        serviceWorker: 'serviceWorker' in navigator,
        localStorage: checkLocalStorageSupport(),
        webGL: checkWebGLSupport()
    };
    
    const unsupportedFeatures = Object.keys(features).filter(key => !features[key]);
    
    if (unsupportedFeatures.length > 0) {
        console.warn('Características no soportadas:', unsupportedFeatures);
        showNotification('Tu navegador no soporta algunas características. Actualiza para una mejor experiencia.', 'warning');
    }
    
    // Verificar si el navegador es compatible con efectos avanzados
    if (!features.cssCustomProperties || !features.intersectionObserver) {
        document.body.classList.add('no-advanced-effects');
    }
}

function checkLocalStorageSupport() {
    try {
        const test = '__localStorage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

function checkWebGLSupport() {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
    } catch (e) {
        return false;
    }
}

// ============================================
// MÉTRICAS Y ANÁLISIS
// ============================================

function trackEvent(eventName, eventData = {}) {
    // Placeholder para futura implementación de analytics
    console.log('Evento:', eventName, eventData);
    
    // Enviar a algún servicio de analytics en el futuro
    // analytics.track(eventName, eventData);
}

// Rastrear interacciones importantes
document.addEventListener('click', function(event) {
    const target = event.target;
    
    if (target.matches('.nav-link')) {
        trackEvent('navigation_click', { href: target.getAttribute('href') });
    } else if (target.matches('.feature-link')) {
        trackEvent('feature_link_click', { href: target.getAttribute('href') });
    } else if (target.matches('.view-btn')) {
        trackEvent('gallery_image_view', { src: target.getAttribute('onclick') });
    } else if (target.closest('.filter-btn')) {
        const filter = target.closest('.filter-btn').getAttribute('data-filter');
        trackEvent('gallery_filter_click', { filter });
    }
});

// ============================================
// INICIALIZACIÓN DEL SITIO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Verificar compatibilidad del navegador
    checkBrowserCompatibility();
    
    // Inicializar componentes
    initializeNavigation();
    initializeBanner();
    initializeGallery();
    initializeInteractiveElements();
    
    // Añadir efectos de carga
    document.body.classList.add('loaded');
    
    // Mensaje de consola para desarrolladores
    console.log('%c PC EDUCA - Sitio Web Educativo ', 'background: linear-gradient(135deg, #00d4ff, #0088cc); color: white; padding: 15px; border-radius: 10px; font-size: 18px; font-family: "Orbitron", monospace; text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);');
    console.log('%c Tema: Tecnológico / Cibernético ', 'color: #00d4ff; font-size: 14px; font-family: "JetBrains Mono", monospace;');
    console.log('%c Animaciones e interactividad mejorada activadas ', 'color: #00ff88; font-size: 12px; font-family: "JetBrains Mono", monospace;');
    console.log('%c Desarrollado para estudiantes de Bachillerato Técnico en Informática ', 'color: #b8c5d6; font-size: 12px; font-family: "JetBrains Mono", monospace;');
});

// ============================================
// MANEJO DE ERRORES
// ============================================

window.addEventListener('error', function(event) {
    console.error('Error capturado:', event.error);
    showNotification('Ha ocurrido un error. Por favor, recarga la página.', 'error');
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Promesa rechazada no manejada:', event.reason);
    showNotification('Ha ocurrido un error inesperado.', 'error');
});

// ============================================
// FIN DEL ARCHIVO JAVASCRIPT
// ============================================

// Улучшенный плавный скролл
function smoothScrollTo(targetElement, duration = 800) {
    const target = document.querySelector(targetElement);
    if (!target) return;
    
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Более резкий (как в iOS)
        const ease = progress < 0.5 
            ? 8 * progress * progress * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 4) / 2;
            
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// Обработчик кликов по ссылкам
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollTo(this.getAttribute('href'), 1000);
        });
    });
});

// Плавное появление элементов при скролле (опционально)
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.series, .two_series_block, .two_series_block, .features, .engines');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '5';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 1s ease, transform 1s ease';
        observer.observe(el);
    });
}

// Инициализация после загрузки страницы
window.addEventListener('load', initScrollAnimations);

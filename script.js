// Y2K Cursor Trail Effect
class CursorTrail {
    constructor() {
        this.trail = [];
        this.maxTrailLength = 20;
        this.trailContainer = document.getElementById('cursor-trail');
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.addTrailPoint(e.clientX, e.clientY);
        });
    }

    addTrailPoint(x, y) {
        const point = {
            x: x,
            y: y,
            id: Date.now() + Math.random(),
            element: this.createTrailElement(x, y)
        };

        this.trail.unshift(point);
        this.trailContainer.appendChild(point.element);

        // Remove old trail points
        if (this.trail.length > this.maxTrailLength) {
            const oldPoint = this.trail.pop();
            if (oldPoint.element && oldPoint.element.parentNode) {
                oldPoint.element.parentNode.removeChild(oldPoint.element);
            }
        }

        // Update trail point styles
        this.trail.forEach((trailPoint, index) => {
            const opacity = 1 - (index * 0.05);
            const scale = 1 - (index * 0.05);
            trailPoint.element.style.opacity = opacity;
            trailPoint.element.style.transform = `scale(${scale})`;
            trailPoint.element.style.animationDelay = `${index * 0.05}s`;
        });
    }

    createTrailElement(x, y) {
        const element = document.createElement('div');
        element.className = 'cursor-trail-point';
        element.style.left = (x - 4) + 'px';
        element.style.top = (y - 4) + 'px';
        return element;
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Search Functionality
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    // You can customize this search functionality
                    alert(`Searching for: ${query}`);
                    // Example: window.location.href = `#search?q=${encodeURIComponent(query)}`;
                }
            }
        });
        
        // Focus styling
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    }
}

// Dropdown Menu Enhancement
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector('.dropdown-btn');
        const content = dropdown.querySelector('.dropdown-content');
        
        if (btn && content) {
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });
}

// Image Loading Animation
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    let ticking = false;
    
    function updateOnScroll() {
        // Add scroll-based effects here if needed
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Icon Hover Effects
function initIconEffects() {
    const icons = document.querySelectorAll('.icon-image');
    
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.2) saturate(1.2)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1) saturate(1)';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cursor trail
    new CursorTrail();
    
    // Initialize other features
    initSmoothScrolling();
    initSearch();
    initDropdowns();
    initImageLoading();
    initScrollEffects();
    initIconEffects();
    
    // Add a subtle loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Pinterest widget initialization (if needed)
if (window.PinUtils) {
    window.PinUtils.build();
}

// Initialize Lucide icons
lucide.createIcons();

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme or system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    body.setAttribute('data-theme', 'light');
    updateThemeIcons('light');
}

function updateThemeIcons(theme) {
    const sunIcon = themeToggle.querySelector('.dark-icon');
    const moonIcon = themeToggle.querySelector('.light-icon');
    if (theme === 'light') {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
    lucide.createIcons();
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcons(newTheme);
    });
}

// Program Dropdown
const dropdownToggle = document.getElementById('dropdown-toggle');
const dropdownMenu = document.getElementById('dropdown-menu');
const dropdownIcon = document.getElementById('dropdown-icon');
let dropdownOpen = false;

if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownOpen = !dropdownOpen;
        if (dropdownOpen) {
            dropdownMenu.classList.remove('opacity-0', 'invisible', 'translate-y-2');
            dropdownIcon.style.transform = 'rotate(180deg)';
        } else {
            dropdownMenu.classList.add('opacity-0', 'invisible', 'translate-y-2');
            dropdownIcon.style.transform = 'rotate(0deg)';
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (dropdownOpen && !dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownOpen = false;
            dropdownMenu.classList.add('opacity-0', 'invisible', 'translate-y-2');
            dropdownIcon.style.transform = 'rotate(0deg)';
        }
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add staggered delay for multiple elements
            if (entry.target.classList.contains('team-section')) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, entry.target.classList.contains('translate-x-[50px]') ? 200 : 0);
            } else {
                entry.target.classList.add('visible');
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.hero-left, .hero-right').forEach(el => {
    observer.observe(el);
});

document.querySelectorAll('.team-section').forEach(el => {
    observer.observe(el);
});

document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-center').forEach(el => {
    observer.observe(el);
});

// Hero expansion hover logic
const hero = document.getElementById('hero');
const leftContent = document.getElementById('hero-left-content');
const rightContent = document.getElementById('hero-right-content');
const centerDivider = document.getElementById('center-divider');
const centerBadge = document.getElementById('center-badge');

// Track if we're currently hovering either side
let isHoveringLeft = false;
let isHoveringRight = false;

// Left side hover expansion
leftContent.addEventListener('mouseenter', () => {
    isHoveringLeft = true;
    hero.classList.remove('hero-hover-right');
    hero.classList.add('hero-hover-left');
    if (centerDivider) {
        centerDivider.style.background = 'linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.8), transparent)';
    }
});

leftContent.addEventListener('mouseleave', () => {
    isHoveringLeft = false;
    if (!isHoveringRight) {
        hero.classList.remove('hero-hover-left');
        if (centerDivider) {
            centerDivider.style.background = 'linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.5), rgba(239, 68, 68, 0.5), transparent)';
        }
    }
});

// Right side hover expansion
rightContent.addEventListener('mouseenter', () => {
    isHoveringRight = true;
    hero.classList.remove('hero-hover-left');
    hero.classList.add('hero-hover-right');
    if (centerDivider) {
        centerDivider.style.background = 'linear-gradient(to bottom, transparent, rgba(239, 68, 68, 0.8), transparent)';
    }
});

rightContent.addEventListener('mouseleave', () => {
    isHoveringRight = false;
    if (!isHoveringLeft) {
        hero.classList.remove('hero-hover-right');
        if (centerDivider) {
            centerDivider.style.background = 'linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.5), rgba(239, 68, 68, 0.5), transparent)';
        }
    }
});

// Parallax effect for center line on scroll
let ticking = false;
function updateCenterLine() {
    const scrolled = window.pageYOffset;
    const line = document.querySelector('.center-line');
    if (line) {
        line.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateCenterLine);
        ticking = true;
    }
});

// Slash button interaction enhancement
document.querySelectorAll('.slash-hover').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.letterSpacing = '0.25em';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.letterSpacing = '';
    });
});

// Mobile detection for reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.hero-left, .hero-right, .team-section').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
}
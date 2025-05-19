// Initialize particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#3498db'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#3498db',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    },
    retina_detect: true
});

// Typing effect for hero title
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');
const textArray = ["Deon Marfo", "Cybersecurity Expert", "Cloud Security Specialist", "SOC Analyst"];
let typingDelay = 100;
let erasingDelay = 60;
let newTextDelay = 1200;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}
function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 300);
    }
}
document.addEventListener("DOMContentLoaded", function() {
    if (textArray.length) setTimeout(type, 800);
});

// Animated counters
function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const speed = 200;
    const increment = Math.ceil(target / speed);
    let value = 0;
    function update() {
        value += increment;
        if (value > target) value = target;
        counter.textContent = value;
        if (value < target) {
            requestAnimationFrame(update);
        } else {
            counter.textContent = target + '+';
        }
    }
    update();
}

const counters = document.querySelectorAll('.counter');
let counterAnimated = false;
window.addEventListener('scroll', () => {
    const aboutSection = document.querySelector('#about');
    const rect = aboutSection.getBoundingClientRect();
    if (!counterAnimated && rect.top < window.innerHeight && rect.bottom >= 0) {
        counters.forEach(animateCounter);
        counterAnimated = true;
    }
});

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
    } else {
        navbar.style.backgroundColor = 'var(--primary-color)';
    }
});

// Dark mode toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    themeToggle.querySelector('i').classList.toggle('fa-moon');
    themeToggle.querySelector('i').classList.toggle('fa-sun');
});

// Animate elements when they come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-item')) {
                const progressBar = entry.target.querySelector('.progress');
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and skill items
document.querySelectorAll('.section, .skill-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});

// Add hover effect to experience cards
document.querySelectorAll('.timeline-content').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Download resume button
document.querySelector('.download-btn').addEventListener('click', function(e) {
    e.preventDefault();
    // Add your resume download logic here
    alert('Resume download will be implemented soon!');
});

// Confetti easter egg (press C O O L)
let coolSequence = [];
document.addEventListener('keydown', function(e) {
    coolSequence.push(e.key.toLowerCase());
    if (coolSequence.slice(-4).join('') === 'cool') {
        launchConfetti();
        coolSequence = [];
    }
});
function launchConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = `hsl(${Math.random()*360}, 70%, 60%)`;
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
    }
}
// Confetti styles
const confettiStyle = document.createElement('style');
confettiStyle.innerHTML = `.confetti {position: fixed;top: -20px;width: 10px;height: 20px;opacity: 0.8;z-index: 2000;border-radius: 3px;animation: confetti-fall linear forwards;}@keyframes confetti-fall {to {transform: translateY(110vh) rotate(360deg);}}`;
document.head.appendChild(confettiStyle);

// Press-on skill descriptions
const skillItems = document.querySelectorAll('.press-skill');
skillItems.forEach(item => {
    item.addEventListener('click', function(e) {
        // Close all other skill descriptions
        skillItems.forEach(i => {
            if (i !== item) i.classList.remove('active');
        });
        // Toggle this one
        item.classList.toggle('active');
    });
    item.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            item.click();
        }
    });
});

// Scroll-triggered fade/slide-in animations
function revealOnScroll() {
  const fadeEls = document.querySelectorAll('.fade-in, .slide-in');
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll); 
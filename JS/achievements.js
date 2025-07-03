
// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    showSectionsOnScroll();
    toggleScrollButton();
});

// Show sections on scroll
function showSectionsOnScroll() {
    const sections = document.querySelectorAll('.section');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollTop + windowHeight > sectionTop + 100) {
            section.classList.add('visible');

            // Animate table rows
            const tableRows = section.querySelectorAll('.toppers-table tr');
            tableRows.forEach((row, index) => {
                setTimeout(() => {
                    row.classList.add('visible');
                }, index * 100);
            });

            // Animate counters
            const counters = section.querySelectorAll('.percentage-counter');
            counters.forEach(counter => {
                if (!counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    animateCounter(counter);
                }
            });
        }
    });
}

// Counter animation
function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current);
        }
    }, 16);
}

// Scroll to top button
function toggleScrollButton() {
    const scrollButton = document.getElementById('scrollTop');
    scrollButton.classList.toggle('visible', window.scrollY > 300);
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function openModal() {
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('caption');

    modal.style.display = 'block';
    modalImg.src = 'Assets/group.jpg';
    caption.innerText = 'Award Winners Group Photo – Annual Achievement Ceremony 2024-25';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('photoModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('photoModal');
    if (event.target === modal) {
        closeModal();
    }
};

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});


// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function (event) {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');

    if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        mobileMenu.classList.remove('active');
    }
});

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('photoModal');
    if (event.target === modal) {
        closeModal();
    }
};

// Escape key to close modal
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize on load
window.addEventListener('load', function () {
    showSectionsOnScroll();
    toggleScrollButton();
});


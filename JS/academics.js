// Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Scroll animations using Intersection Observer
        function createObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px'
            });

            // Observe all sections
            document.querySelectorAll('.section').forEach(section => {
                observer.observe(section);
            });
        }

        // Scroll to top button functionality
        function toggleScrollTopButton() {
            const scrollTop = document.getElementById('scrollTop');
            if (window.scrollY > 300) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        }

        // Event listeners
        window.addEventListener('scroll', toggleScrollTopButton);

        // Scroll to top functionality
        document.getElementById('scrollTop').addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Smooth scrolling for navigation links
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

        // Initialize animations on page load
        document.addEventListener('DOMContentLoaded', function() {
            createObserver();
            toggleScrollTopButton();
            
            // Add staggered animation to notice items
            const noticeItems = document.querySelectorAll('.notice-item');
            noticeItems.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.2}s`;
            });
        });

        // Add interactive hover effects to cards
        document.querySelectorAll('.academic-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add click effect to notice buttons
        document.querySelectorAll('.notice-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 255, 255, 0.6)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.left = '50%';
                ripple.style.top = '50%';
                ripple.style.width = '20px';
                ripple.style.height = '20px';
                ripple.style.marginLeft = '-10px';
                ripple.style.marginTop = '-10px';
                
                this.style.position = 'relative';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add typing effect to hero text
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Initialize typing effect after page loads
        window.addEventListener('load', function() {
            const heroTitle = document.querySelector('.hero h1');
            const heroSubtitle = document.querySelector('.hero p');
            
            setTimeout(() => {
                typeWriter(heroTitle, 'Academics at Shanti Global Academy', 80);
            }, 1000);
            
            setTimeout(() => {
                typeWriter(heroSubtitle, 'RBSE (Rajasthan Board of Secondary Education', 60);
            }, 3000);
        });

        // Add particle effect to hero section
        function createParticles() {
            const hero = document.querySelector('.hero');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 4 + 2}px;
                    height: ${Math.random() * 4 + 2}px;
                    background: rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2});
                    border-radius: 50%;
                    pointer-events: none;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: float ${Math.random() * 10 + 5}s infinite ease-in-out;
                `;
                hero.appendChild(particle);
            }
        }

        // Add floating animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                33% { transform: translateY(-20px) rotate(120deg); }
                66% { transform: translateY(10px) rotate(240deg); }
            }
            
            @keyframes ripple {
                to { transform: scale(4); opacity: 0; }
            }
            
            .particle {
                z-index: 1;
            }
        `;
        document.head.appendChild(style);

        // Initialize particles
        createParticles();

        // Add progress bar for academic features
        document.querySelectorAll('.academic-features li').forEach((item, index) => {
            item.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(59, 130, 246, 0.1)';
                this.style.transform = 'translateX(10px)';
                this.style.transition = 'all 0.3s ease';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.background = 'transparent';
                this.style.transform = 'translateX(0)';
            });
        });

        // Add counter animation for academic cards
        function animateCounters() {
            const cards = document.querySelectorAll('.academic-card');
            cards.forEach((card, index) => {
                const features = card.querySelectorAll('.academic-features li');
                let delay = 0;
                
                features.forEach((feature, featureIndex) => {
                    setTimeout(() => {
                        feature.style.opacity = '0';
                        feature.style.transform = 'translateX(-20px)';
                        
                        setTimeout(() => {
                            feature.style.opacity = '1';
                            feature.style.transform = 'translateX(0)';
                            feature.style.transition = 'all 0.5s ease';
                        }, 100);
                    }, delay);
                    delay += 100;
                });
            });
        }

        // Trigger counter animation when cards are visible
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.academic-card').forEach(card => {
            cardObserver.observe(card);
        });

        // Add search functionality for notices
        function addSearchFunctionality() {
            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.placeholder = 'Search notices...';
            searchInput.style.cssText = `
                width: 100%;
                padding: 1rem;
                margin-bottom: 2rem;
                border: 2px solid var(--light-blue);
                border-radius: 25px;
                font-size: 1rem;
                outline: none;
                transition: border-color 0.3s ease;
            `;
            
            const noticesContainer = document.querySelector('.notices-container');
            noticesContainer.insertBefore(searchInput, noticesContainer.firstChild);
            
            searchInput.addEventListener('focus', function() {
                this.style.borderColor = 'var(--secondary-blue)';
            });
            
            searchInput.addEventListener('blur', function() {
                this.style.borderColor = 'var(--light-blue)';
            });
            
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const noticeItems = document.querySelectorAll('.notice-item');
                
                noticeItems.forEach(item => {
                    const title = item.querySelector('h4').textContent.toLowerCase();
                    const content = item.querySelector('p').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || content.includes(searchTerm)) {
                        item.style.display = 'flex';
                        item.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        }

        // Add fade in animation
        style.textContent += `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;

        // Initialize search functionality
        addSearchFunctionality();

        // Add dynamic background color change on scroll
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            document.querySelector('.hero').style.transform = `translateY(${parallax}px)`;
            
            // Change navbar background opacity based on scroll
            const navbar = document.getElementById('navbar');
            const opacity = Math.min(scrolled / 100, 1);
            navbar.style.background = `rgba(255, 255, 255, ${0.95 + opacity * 0.05})`;
        });

        // Add mobile menu toggle functionality
        function addMobileMenu() {
            const navLinks = document.querySelector('.nav-links');
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.style.cssText = `
                display: none;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--primary-blue);
                cursor: pointer;
                padding: 0.5rem;
            `;
            
            document.querySelector('.nav-container').appendChild(mobileMenuBtn);
            
            mobileMenuBtn.addEventListener('click', function() {
                navLinks.classList.toggle('mobile-active');
                this.querySelector('i').classList.toggle('fa-bars');
                this.querySelector('i').classList.toggle('fa-times');
            });
        }

        // Add mobile menu styles
        style.textContent += `
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block !important;
                }
                
                .nav-links {
                    position: fixed;
                    top: 80px;
                    left: -100%;
                    width: 100%;
                    height: calc(100vh - 80px);
                    background: var(--white);
                    flex-direction: column;
                    align-items: center;
                    justify-content: start;
                    padding-top: 2rem;
                    transition: left 0.3s ease;
                    box-shadow: var(--shadow-lg);
                }
                
                .nav-links.mobile-active {
                    left: 0;
                }
                
                .nav-links li {
                    margin: 1rem 0;
                }
            }
        `;

        // Initialize mobile menu
        addMobileMenu();

        // Add loading animation
        function showLoadingAnimation() {
            const loader = document.createElement('div');
            loader.id = 'pageLoader';
            loader.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--white);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            `;
            
            loader.innerHTML = `
                <div style="text-align: center;">
                    <div style="width: 50px; height: 50px; border: 3px solid var(--light-blue); border-top: 3px solid var(--secondary-blue); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
                    <p style="color: var(--primary-blue); font-weight: 600;">Loading Shanti Global Academy...</p>
                </div>
            `;
            
            document.body.appendChild(loader);
        }

        // Add spin animation
        style.textContent += `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;

        // Hide loader when page is fully loaded
        window.addEventListener('load', function() {
            const loader = document.getElementById('pageLoader');
            if (loader) {
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        loader.remove();
                    }, 500);
                }, 1000);
            }
        });

        // Show loader initially
        showLoadingAnimation();

        // Add tooltip functionality
        function addTooltips() {
            const tooltipElements = document.querySelectorAll('[data-tooltip]');
            
            tooltipElements.forEach(element => {
                element.addEventListener('mouseenter', function() {
                    const tooltip = document.createElement('div');
                    tooltip.className = 'tooltip';
                    tooltip.textContent = this.getAttribute('data-tooltip');
                    tooltip.style.cssText = `
                        position: absolute;
                        background: var(--primary-blue);
                        color: var(--white);
                        padding: 0.5rem 1rem;
                        border-radius: 5px;
                        font-size: 0.8rem;
                        white-space: nowrap;
                        z-index: 1000;
                        opacity: 0;
                        transform: translateY(-10px);
                        transition: all 0.3s ease;
                        pointer-events: none;
                    `;
                    
                    document.body.appendChild(tooltip);
                    
                    const rect = this.getBoundingClientRect();
                    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
                    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
                    
                    setTimeout(() => {
                        tooltip.style.opacity = '1';
                        tooltip.style.transform = 'translateY(0)';
                    }, 10);
                });
                
                element.addEventListener('mouseleave', function() {
                    const tooltip = document.querySelector('.tooltip');
                    if (tooltip) {
                        tooltip.style.opacity = '0';
                        tooltip.style.transform = 'translateY(-10px)';
                        setTimeout(() => tooltip.remove(), 300);
                    }
                });
            });
        }

        // Add tooltips to interactive elements
        document.querySelectorAll('.notice-btn').forEach(btn => {
            btn.setAttribute('data-tooltip', 'Click to ' + btn.textContent.toLowerCase());
        });

        addTooltips();

        console.log('Shanti Global Academy - Academics page loaded successfully!');
   
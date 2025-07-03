// Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            const scrollTop = document.getElementById('scroll-top');
            
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                scrollTop.classList.add('visible');
            } else {
                navbar.classList.remove('scrolled');
                scrollTop.classList.remove('visible');
            }
        });

        // Scroll to top functionality
        document.getElementById('scroll-top').addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Section visibility animation
        const sections = document.querySelectorAll('.section');
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        sections.forEach(section => {
            observer.observe(section);
        });

        // Lightbox functionality
        let currentImageIndex = 0;
        let galleryItems = [];

        function initLightbox() {
            const lightbox = document.getElementById('lightbox');
            const lightboxImage = document.getElementById('lightbox-image');
            const lightboxCaption = document.getElementById('lightbox-caption');
            const lightboxClose = document.getElementById('lightbox-close');
            const lightboxPrev = document.getElementById('lightbox-prev');
            const lightboxNext = document.getElementById('lightbox-next');
            
            galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
            
            // Add click event to gallery items
            galleryItems.forEach((item, index) => {
                item.addEventListener('click', function() {
                    currentImageIndex = index;
                    openLightbox();
                });
            });

            // Close lightbox
            lightboxClose.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });

            // Navigation
            lightboxPrev.addEventListener('click', function() {
                currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
                updateLightboxContent();
            });

            lightboxNext.addEventListener('click', function() {
                currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
                updateLightboxContent();
            });

            // Keyboard navigation
            document.addEventListener('keydown', function(e) {
                if (lightbox.classList.contains('active')) {
                    if (e.key === 'Escape') {
                        closeLightbox();
                    } else if (e.key === 'ArrowLeft') {
                        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
                        updateLightboxContent();
                    } else if (e.key === 'ArrowRight') {
                        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
                        updateLightboxContent();
                    }
                }
            });

            function openLightbox() {
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
                updateLightboxContent();
            }

            function closeLightbox() {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }

            function updateLightboxContent() {
                const currentItem = galleryItems[currentImageIndex];
                const img = currentItem.querySelector('img');
                const caption = currentItem.querySelector('.gallery-caption');
                
                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt;
                
                const captionTitle = caption.querySelector('h4').textContent;
                const captionText = caption.querySelector('p').textContent;
                
                lightboxCaption.querySelector('h4').textContent = captionTitle;
                lightboxCaption.querySelector('p').textContent = captionText;
            }
        }

        // Initialize lightbox when DOM is loaded
        document.addEventListener('DOMContentLoaded', initLightbox);

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

        // Add loading animation for images
        function addImageLoadingEffect() {
            const images = document.querySelectorAll('.gallery-item img');
            
            images.forEach(img => {
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                });
                
                // Set initial opacity
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
            });
        }

        // Initialize image loading effects
        document.addEventListener('DOMContentLoaded', addImageLoadingEffect);

        // Add hover effects for gallery items
        function addHoverEffects() {
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            galleryItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        }

        // Initialize hover effects
        document.addEventListener('DOMContentLoaded', addHoverEffects);

        // Preload images for better performance
        function preloadImages() {
            const images = document.querySelectorAll('.gallery-item img');
            images.forEach(img => {
                const imageUrl = img.src;
                const preloadImg = new Image();
                preloadImg.src = imageUrl;
            });
        }

        // Initialize preloading
        document.addEventListener('DOMContentLoaded', preloadImages);
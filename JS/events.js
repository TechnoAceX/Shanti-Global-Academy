 // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        // Lightbox functionality
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxTitle = document.getElementById('lightboxTitle');
        const lightboxDescription = document.getElementById('lightboxDescription');
        const lightboxClose = document.getElementById('lightboxClose');
        const lightboxPrev = document.getElementById('lightboxPrev');
        const lightboxNext = document.getElementById('lightboxNext');
        const galleryItems = document.querySelectorAll('.gallery-item');

        let currentImageIndex = 0;
        let currentImages = [];

        // Open lightbox
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const caption = item.querySelector('.gallery-caption');
                
                currentImageIndex = index;
                currentImages = Array.from(galleryItems);
                
                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt;
                lightboxTitle.textContent = caption.querySelector('h4').textContent;
                lightboxDescription.textContent = caption.querySelector('p').textContent;
                
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close lightbox
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Navigation in lightbox
        const showImage = (index) => {
            if (index >= 0 && index < currentImages.length) {
                const item = currentImages[index];
                const img = item.querySelector('img');
                const caption = item.querySelector('.gallery-caption');
                
                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt;
                lightboxTitle.textContent = caption.querySelector('h4').textContent;
                lightboxDescription.textContent = caption.querySelector('p').textContent;
                
                currentImageIndex = index;
            }
        };

        lightboxNext.addEventListener('click', () => {
            const nextIndex = (currentImageIndex + 1) % currentImages.length;
            showImage(nextIndex);
        });

        lightboxPrev.addEventListener('click', () => {
            const prevIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
            showImage(prevIndex);
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active')) {
                switch(e.key) {
                    case 'Escape':
                        closeLightbox();
                        break;
                    case 'ArrowRight':
                        const nextIndex = (currentImageIndex + 1) % currentImages.length;
                        showImage(nextIndex);
                        break;
                    case 'ArrowLeft':
                        const prevIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
                        showImage(prevIndex);
                        break;
                }
            }
        });

        // Scroll to top functionality
        const scrollTopBtn = document.getElementById('scrollTop');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
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

        // Touch/swipe support for mobile lightbox navigation
        let touchStartX = 0;
        let touchEndX = 0;

        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next image
                    const nextIndex = (currentImageIndex + 1) % currentImages.length;
                    showImage(nextIndex);
                } else {
                    // Swipe right - previous image
                    const prevIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
                    showImage(prevIndex);
                }
            }
        };

        // Image loading optimization
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        });

        // Lazy loading for better performance
        const lazyImages = document.querySelectorAll('img[data-src]');
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

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });

        
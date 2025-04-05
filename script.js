document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Plan tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Testimonial slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    document.querySelector('.slider-next').addEventListener('click', function() {
        let nextSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(nextSlide);
    });
    
    document.querySelector('.slider-prev').addEventListener('click', function() {
        let prevSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(prevSlide);
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto slide change every 5 seconds
    setInterval(() => {
        let nextSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(nextSlide);
    }, 5000);
    
    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target.toLocaleString();
            }
        });
    }
    
    // Start counter animation when scrolled to stats section
    const statsSection = document.querySelector('.stats');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    observer.observe(statsSection);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            
            // Close all other items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.querySelector('.faq-question').classList.remove('active');
                    item.querySelector('.faq-answer').classList.remove('active');
                }
            });
            
            // Toggle current item
            question.classList.toggle('active');
            answer.classList.toggle('active');
        });
    });

    // Form validation
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'red';
                    isValid = false;
                    
                    // Remove error on focus
                    field.addEventListener('focus', function() {
                        this.style.borderColor = '#ddd';
                    });
                }
            });
            
            if (isValid) {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    });

    // Active link highlighting
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });

    // Progress Bar
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('progressBar').style.width = scrolled + '%';
    });

    // Smart Navbar Hide/Show - Consolidated Scroll Handler
    let lastScroll = 0;
    const header = document.querySelector('header');
    const navbarHeight = header.offsetHeight;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
      
        if (navLinks.classList.contains('active')) return;
        
      
        header.classList.toggle('scrolled', currentScroll > 50);
        
        
        if (currentScroll > lastScroll && currentScroll > navbarHeight) {
            
            header.classList.add('hide');
        } else {
            
            header.classList.remove('hide');
        }
        lastScroll = currentScroll;
    });

    // Hero image optimization
    // function optimizeHeroImages() {
    //     const heroImages = document.querySelectorAll('.hero-image img, .page-hero');
        
    //     heroImages.forEach(img => {
    //         // Reduce size by adding size parameters to Unsplash URLs
    //         if (img.src && img.src.includes('unsplash.com')) {
    //             if (img.classList.contains('hero-img')) {
    //                 img.src = img.src.split('?')[0] + '?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
    //             }
    //         } else if (img.style) {
    //             img.style.backgroundImage = `url(${img.src.split('?')[0]}?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80)`;
    //             img.style.backgroundSize = 'cover';
    //             img.style.backgroundPosition = 'center';
    //         }
    //     });
    // }

    // optimizeHeroImages();
});
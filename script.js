document.addEventListener("DOMContentLoaded", () => {
    // Mobile Navigation Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle menu icon between bars and times
            const icon = mobileMenu.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Hero Typing Effect Loop
    const typingText = document.getElementById("typing-text");
    if (typingText) {
        const roles = ["Data Analyst", "Problem Solver", "Machine Learning Enthusiast"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeLoop() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 100;

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 1500; // Pause when word is complete
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before typing next word
            }

            setTimeout(typeLoop, typeSpeed);
        }
        
        setTimeout(typeLoop, 1000);
    }

    // Sticky Navbar Setup
    const navbar = document.getElementById('navbar');
    
    function scrollHeader() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Initial check
    scrollHeader();

    window.addEventListener('scroll', () => {
        scrollHeader();
        updateActiveLink();
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Scroll spy structure for active navigation link
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links a');

    function updateActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current) && current !== 'home') {
                item.classList.add('active');
            }
        });
    }

    // Scroll Reveal Animation Initialization
    const revealElements = document.querySelectorAll('.skill-group-modern, .project-card, .training-card, .about-content, .contact-card');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0) translateX(0)";
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        el.style.opacity = 0;
        
        // Custom entrance animations based on element type
        if (el.classList.contains('training-card')) {
             el.style.transform = "translateX(-30px)";
             el.style.transition = "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        } else if (el.classList.contains('contact-card')) {
             el.style.transform = "translateY(40px) scale(0.95)";
             el.style.transition = "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        } else {
             el.style.transform = "translateY(40px)";
             el.style.transition = "all 0.6s ease-out";
        }
        
        revealOnScroll.observe(el);
    });



    // Professional 3D Tilt Effect on Cards
    const tiltElements = document.querySelectorAll('.project-card, .skill-group-modern, .contact-card, .training-card');
    
    tiltElements.forEach(el => {
        // Prevent CSS transform from conflicting by overriding the transition when hovered
        el.addEventListener('mouseenter', () => {
            el.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease, border-color 0.3s ease';
        });

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // 3D Tilt calculations
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
            const rotateY = ((x - centerX) / centerX) * 6;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Update Inner Flashlight Glow
            el.style.setProperty('--mouse-x', `${x}px`);
            el.style.setProperty('--mouse-y', `${y}px`);
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transition = 'transform 0.5s ease-out, box-shadow 0.3s ease, border-color 0.3s ease';
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // Initialize Particles.js if element exists
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 70, density: { enable: true, value_area: 800 } },
                color: { value: ["#06b6d4", "#a855f7", "#ec4899"] },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#888888",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    grab: { distance: 180, line_linked: { opacity: 0.6 } },
                    push: { particles_nb: 3 }
                }
            },
            retina_detect: true
        });
    }
});

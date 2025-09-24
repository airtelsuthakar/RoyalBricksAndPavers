// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Offset for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            // For now, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been received. We'll contact you at ${email} or ${phone} soon.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    // Mobile menu toggle (for responsive design)
    const createMobileMenu = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.display = 'none';
        
        // Add mobile menu button to header
        header.insertBefore(mobileMenuBtn, nav);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
        
        // Handle window resize
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'block';
                nav.classList.add('mobile');
            } else {
                mobileMenuBtn.style.display = 'none';
                nav.classList.remove('mobile');
                nav.classList.remove('active');
            }
        };
        
        // Initial check
        handleResize();
        
        // Listen for window resize
        window.addEventListener('resize', handleResize);
    };
    
    // Initialize mobile menu
    createMobileMenu();
});
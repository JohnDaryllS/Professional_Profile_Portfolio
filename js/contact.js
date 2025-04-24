// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Load AOS library
    const aosScript = document.createElement('script');
    aosScript.src = 'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js';
    document.head.appendChild(aosScript);
    
    aosScript.onload = function() {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    };
    
    // Add hover effect to form inputs
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        
        input.addEventListener('focus', () => {
            group.classList.add('active');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                group.classList.remove('active');
            }
        });
        
        // Check if input has value on page load
        if (input.value) {
            group.classList.add('active');
        }
    });
    
    // Form submission animation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                
                // Reset form after animation
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                    submitBtn.disabled = false;
                    
                    // Reset form groups
                    formGroups.forEach(group => {
                        group.classList.remove('active');
                    });
                }, 2000);
            }, 1500);
        });
    }
});
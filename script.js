document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Dark mode toggle functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved user preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
                    (prefersDarkScheme.matches ? 'dark' : 'light');

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
}

darkModeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme = 'light';
    
    if (currentTheme === 'light' || !currentTheme) {
        newTheme = 'dark';
    }
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Listen for system preference changes
prefersDarkScheme.addListener(e => {
    const newTheme = e.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
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
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just log it and show an alert
            console.log({ name, email, subject, message });
            
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Load more projects
    const loadMoreBtn = document.getElementById('loadMore');
    const moreProjectsContainer = document.getElementById('moreProjects');
    
    if (loadMoreBtn && moreProjectsContainer) {
        loadMoreBtn.addEventListener('click', function() {

            const newProjectsGrid = document.createElement('div');
            newProjectsGrid.className = 'projects-grid';

            // Simulate loading more projects
            const additionalProjects = [
                {
                    title: "Portfolio Website",
                    description: "Personal portfolio website with responsive design.",
                    tech: ["HTML", "CSS", "JavaScript"],
                    image: "https://via.placeholder.com/400x250"
                },
                {
                    title: "Chat Application",
                    description: "Real-time chat application with socket.io.",
                    tech: ["Node.js", "Socket.io", "Express"],
                    image: "https://via.placeholder.com/400x250"
                },
                {
                    title: "Recipe Finder",
                    description: "Application to search recipes by ingredients.",
                    tech: ["React", "API", "CSS"],
                    image: "https://via.placeholder.com/400x250"
                },
                {
                    title: "Expense Tracker",
                    description: "Track personal expenses with charts.",
                    tech: ["JavaScript", "Chart.js", "LocalStorage"],
                    image: "https://via.placeholder.com/400x250"
                },
                {
                    title: "Bookstore API",
                    description: "RESTful API for bookstore management.",
                    tech: ["Node.js", "Express", "MongoDB"],
                    image: "https://via.placeholder.com/400x250"
                },
                {
                    title: "Fitness App",
                    description: "Workout tracking application.",
                    tech: ["React Native", "Firebase"],
                    image: "https://via.placeholder.com/400x250"
                },
                {
                    title: "News Aggregator",
                    description: "Aggregate news from multiple sources.",
                    tech: ["PHP", "MySQL", "API"],
                    image: "https://via.placeholder.com/400x250"
                },
                {
                    title: "Event Management",
                    description: "System for managing events and tickets.",
                    tech: ["Laravel", "MySQL", "Bootstrap"],
                    image: "https://via.placeholder.com/400x250"
                },
                {
                    title: "Image Gallery",
                    description: "Upload and manage images with tags.",
                    tech: ["JavaScript", "Node.js", "Cloudinary"],
                    image: "https://via.placeholder.com/400x250"
                },
                {
                    title: "Quiz Application",
                    description: "Interactive quiz with scoring system.",
                    tech: ["JavaScript", "HTML", "CSS"],
                    image: "https://via.placeholder.com/400x250"
                },
                {
                    title: "Blog API",
                    description: "Backend for blogging platform.",
                    tech: ["Java", "Spring Boot", "PostgreSQL"],
                    image: "https://via.placeholder.com/400x250"
                },
                {
                    title: "Weather Dashboard",
                    description: "Dashboard showing weather statistics.",
                    tech: ["React", "Chart.js", "API"],
                    image: "https://via.placeholder.com/400x250"
                },
                {
                    title: "E-learning Platform",
                    description: "Online courses with progress tracking.",
                    tech: ["Laravel", "MySQL", "JavaScript"],
                    image: "https://via.placeholder.com/400x250"
                },
                {
                    title: "Job Board",
                    description: "Platform for job postings and applications.",
                    tech: ["PHP", "MySQL", "Bootstrap"],
                    image: "https://via.placeholder.com/400x250"
                }
            ];
            
            // Create project cards
            additionalProjects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card hidden';
                
                const techSpans = project.tech.map(tech => `<span>${tech}</span>`).join('');
                
                projectCard.innerHTML = `
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-tech">
                            ${techSpans}
                        </div>
                        <div class="project-links">
                            <a href="#" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                            <a href="#" target="_blank"><i class="fab fa-github"></i> Code</a>
                        </div>
                    </div>
                `;
                
                newProjectsGrid.appendChild(projectCard);
            });
            
            // Hide the load more button
            loadMoreBtn.style.display = 'none';
            
            // Animate the new projects
        setTimeout(() => {
            document.querySelectorAll('#moreProjects .project-card').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('show');
                    
                    // Add GSAP animation to match initial projects
                    gsap.from(card, {
                        scrollTrigger: {
                            trigger: card,
                            start: "top 80%",
                            toggleActions: "play none none none"
                        },
                        opacity: 0,
                        y: 50,
                        duration: 0.8,
                        delay: index % 3 * 0.2
                    });
                }, index * 100);
            });
        }, 100);
    });
}
    
    // Scroll animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate sections on scroll
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });
    
    // Animate skill categories
    gsap.utils.toArray('.skill-category').forEach((category, i) => {
        gsap.from(category, {
            scrollTrigger: {
                trigger: category,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            x: i % 2 === 0 ? -50 : 50,
            duration: 0.8,
            delay: i * 0.2
        });
    });
    
    // Animate project cards
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i % 3 * 0.2
        });
    });
    
    // Animate certificate cards
    gsap.utils.toArray('.certificate-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            rotateY: 90,
            duration: 0.8,
            delay: i * 0.2
        });
    });
    
    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
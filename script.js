// Loading Screen Controller
class LoadingScreen {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.mainContent = document.getElementById('main-content');
        this.progressBar = document.querySelector('.loading-progress');
        this.percentageText = document.getElementById('loading-percentage');
        this.loadingLabel = document.querySelector('.loading-label');
        
        this.progress = 0;
        this.loadingTexts = [
            'Initializing AI Systems...',
            'Loading Machine Learning Models...',
            'Compiling Neural Networks...',
            'Training Algorithms...',
            'Optimizing Performance...',
            'Deploying Portfolio...',
            'Ready to Code!'
        ];
        
        this.init();
    }
    
    init() {
        // Hide main content initially
        this.mainContent.style.opacity = '0';
        this.mainContent.style.visibility = 'hidden';
        
        // Start loading sequence
        this.startLoading();
    }
    
    startLoading() {
        const duration = 2800; // 2.8 seconds (slower)
        const interval = 50; // Update every 50ms
        const increment = 100 / (duration / interval);
        
        let textIndex = 0;
        let lastTextUpdate = 0;
        
        const loadingInterval = setInterval(() => {
            this.progress += increment;
            
            // Update progress bar and percentage
            this.progressBar.style.width = `${Math.min(this.progress, 100)}%`;
            this.percentageText.textContent = `${Math.floor(Math.min(this.progress, 100))}%`;
            
            // Update loading text
            const textUpdateThreshold = (100 / this.loadingTexts.length) * (textIndex + 1);
            if (this.progress >= textUpdateThreshold && textIndex < this.loadingTexts.length - 1) {
                textIndex++;
                this.loadingLabel.textContent = this.loadingTexts[textIndex];
            }
            
            // Complete loading
            if (this.progress >= 100) {
                clearInterval(loadingInterval);
                this.completeLoading();
            }
        }, interval);
    }
    
    completeLoading() {
        // Final loading text
        this.loadingLabel.textContent = 'Welcome to my Portfolio!';
        
        setTimeout(() => {
            // Fade out loading screen
            this.loadingScreen.classList.add('hidden');
            
            // Show main content
            setTimeout(() => {
                this.mainContent.style.opacity = '1';
                this.mainContent.style.visibility = 'visible';
                this.mainContent.classList.add('show');
                
                // Initialize the rest of the website
                this.initMainSite();
            }, 400);
        }, 500);
    }
    
    initMainSite() {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            lerp: 0.05,
            wheelMultiplier: 1.2,
            touchMultiplier: 1.8,
            smoothWheel: true,
            smoothTouch: false,
            normalizeWheel: true,
            infinite: false,
        });

        // RAF (Request Animation Frame) loop for Lenis
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        
        // Store lenis globally for other functions
        window.portfolioLenis = lenis;
        
        // Initialize other portfolio features
        this.initPortfolioFeatures();
    }
    
    initPortfolioFeatures() {
        // All the existing portfolio initialization code will go here
        // This ensures everything loads after the loading screen
        
        // Trigger typing animation for hero title
        const nameElement = document.querySelector('.name');
        if (nameElement) {
            const originalText = nameElement.textContent;
            typeWriter(nameElement, originalText, 80);
        }
        
        // Initialize mobile menu
        this.initMobileMenu();
        
        // Initialize smooth scrolling for anchor links
        this.initSmoothScrolling();
        
        // Initialize other animations and features
        animateCounters();
        if (window.innerWidth > 768) {
            createCursorTrail();
        }
        createScrollProgress();
        
        // Initialize 3D background
        if (typeof THREE !== 'undefined') {
            init3DBackground();
        }
    }
    
    initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }
    
    initSmoothScrolling() {
        // Smooth scroll to sections with Lenis
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target && window.portfolioLenis) {
                    window.portfolioLenis.scrollTo(target, {
                        offset: -80,
                        duration: 1.2
                    });
                }
            });
        });
    }
}

// Initialize loading screen when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LoadingScreen();
});

// Initialize Lenis for smooth scrolling (will be called after loading)
let lenis;

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animateElements = document.querySelectorAll('.project-card, .skill-item, .contact-item, .stat');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Typing animation for hero title
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

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        typeWriter(nameElement, originalText, 80);
    }
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero::before');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Let Web3Forms handle the form submission natively - no JavaScript needed

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#00ff88' : '#ff4444'};
        color: ${type === 'success' ? '#000000' : '#ffffff'};
        border-radius: 10px;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #00ff88, #0066ff);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Preloader
function createPreloader() {
    const preloader = document.createElement('div');
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0a0a;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10002;
        transition: opacity 0.5s ease;
    `;
    
    preloader.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 50px; height: 50px; border: 3px solid #333; border-top: 3px solid #00ff88; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
            <p style="color: #00ff88; font-family: 'Inter', sans-serif; font-weight: 500;">Loading...</p>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    document.body.appendChild(preloader);
    
    // Remove preloader when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize preloader
createPreloader();

// Cursor trail effect
function createCursorTrail() {
    const trail = [];
    const trailLength = 10;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #00ff88;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - (i / trailLength)};
            transform: scale(${1 - (i / trailLength) * 0.5});
            transition: all 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        let x = mouseX;
        let y = mouseY;
        
        trail.forEach((dot, index) => {
            const nextDot = trail[index + 1] || trail[0];
            
            dot.style.left = x - 2 + 'px';
            dot.style.top = y - 2 + 'px';
            
            if (nextDot) {
                x += (nextDot.offsetLeft - x) * 0.3;
                y += (nextDot.offsetTop - y) * 0.3;
            }
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Initialize cursor trail (only on desktop)
if (window.innerWidth > 768) {
    createCursorTrail();
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const countUp = (element, target) => {
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target === Infinity ? '∞' : Math.ceil(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.ceil(current);
            }
        }, 20);
    };
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                
                if (text === '∞') {
                    element.textContent = '∞';
                } else {
                    const target = parseInt(text.replace('+', ''));
                    countUp(element, target);
                }
                
                observer.unobserve(element);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Initialize counter animation
animateCounters();

// Easter egg: Konami code
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konami.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konami.length && konamiCode.every((key, index) => key === konami[index])) {
        showNotification('🎉 Konami Code activated! You found the easter egg!', 'success');
        
        // Add some fun effects
        document.body.style.animation = 'rainbow 2s ease-in-out';
        
        // Add rainbow animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                50% { filter: hue-rotate(180deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
            style.remove();
        }, 2000);
        
        konamiCode = [];
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Your scroll handling code here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Advanced 3D Automatic Animation
function init3DBackground() {
    // Create scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    
    // Add canvas to container
    const container = document.querySelector('.image-container');
    const canvas = renderer.domElement;
    canvas.id = 'three-canvas';
    container.appendChild(canvas);
    
    // Create multiple dynamic geometries
    const geometries = [];
    const meshes = [];
    
    // Central DNA-like helix
    const helixGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const helixMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00ff88,
        wireframe: true,
        transparent: true,
        opacity: 0.9
    });
    const helixMesh = new THREE.Mesh(helixGeometry, helixMaterial);
    scene.add(helixMesh);
    meshes.push(helixMesh);
    
    // Orbiting geometric shapes
    for(let i = 0; i < 6; i++) {
        const shape = Math.floor(Math.random() * 3);
        let geometry;
        
        switch(shape) {
            case 0:
                geometry = new THREE.IcosahedronGeometry(0.3, 0);
                break;
            case 1:
                geometry = new THREE.OctahedronGeometry(0.3);
                break;
            case 2:
                geometry = new THREE.TetrahedronGeometry(0.3);
                break;
        }
        
        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(i / 6, 1, 0.6),
            wireframe: true,
            transparent: true,
            opacity: 0.7
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        const radius = 2 + Math.random() * 1;
        const angle = (i / 6) * Math.PI * 2;
        
        mesh.position.x = Math.cos(angle) * radius;
        mesh.position.z = Math.sin(angle) * radius;
        mesh.position.y = (Math.random() - 0.5) * 2;
        
        scene.add(mesh);
        meshes.push(mesh);
    }
    
    // Advanced particle system with multiple layers
    const particleSystems = [];
    
    // Primary spiral particles
    const spiralGeometry = new THREE.BufferGeometry();
    const spiralCount = 2000;
    const spiralPositions = new Float32Array(spiralCount * 3);
    
    for(let i = 0; i < spiralCount; i++) {
        const t = (i / spiralCount) * Math.PI * 8;
        const radius = 0.5 + (i / spiralCount) * 3;
        
        spiralPositions[i * 3] = Math.cos(t) * radius;
        spiralPositions[i * 3 + 1] = (i / spiralCount - 0.5) * 8;
        spiralPositions[i * 3 + 2] = Math.sin(t) * radius;
    }
    
    spiralGeometry.setAttribute('position', new THREE.BufferAttribute(spiralPositions, 3));
    const spiralMaterial = new THREE.PointsMaterial({
        size: 0.01,
        color: 0x00ffaa,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    const spiralParticles = new THREE.Points(spiralGeometry, spiralMaterial);
    scene.add(spiralParticles);
    particleSystems.push(spiralParticles);
    
    // Floating ambient particles
    const ambientGeometry = new THREE.BufferGeometry();
    const ambientCount = 1000;
    const ambientPositions = new Float32Array(ambientCount * 3);
    const ambientVelocities = [];
    
    for(let i = 0; i < ambientCount; i++) {
        ambientPositions[i * 3] = (Math.random() - 0.5) * 15;
        ambientPositions[i * 3 + 1] = (Math.random() - 0.5) * 15;
        ambientPositions[i * 3 + 2] = (Math.random() - 0.5) * 15;
        
        ambientVelocities.push({
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
        });
    }
    
    ambientGeometry.setAttribute('position', new THREE.BufferAttribute(ambientPositions, 3));
    const ambientMaterial = new THREE.PointsMaterial({
        size: 0.006,
        color: 0x4488ff,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    const ambientParticles = new THREE.Points(ambientGeometry, ambientMaterial);
    scene.add(ambientParticles);
    particleSystems.push(ambientParticles);
    
    // Energy rings
    const rings = [];
    for(let i = 0; i < 3; i++) {
        const ringGeometry = new THREE.RingGeometry(1.5 + i * 0.5, 1.6 + i * 0.5, 32);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(i / 3, 0.8, 0.5),
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.random() * Math.PI;
        ring.rotation.y = Math.random() * Math.PI;
        scene.add(ring);
        rings.push(ring);
    }
    
    // Dynamic Circles
    const circles = [];
    for(let i = 0; i < 5; i++) {
        const circleGeometry = new THREE.CircleGeometry(0.2 + Math.random() * 0.3, 32);
        const circleMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(Math.random(), 1, 0.7),
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
        });
        const circle = new THREE.Mesh(circleGeometry, circleMaterial);
        
        // Random positioning
        circle.position.x = (Math.random() - 0.5) * 6;
        circle.position.y = (Math.random() - 0.5) * 6;
        circle.position.z = (Math.random() - 0.5) * 6;
        
        // Random rotation
        circle.rotation.x = Math.random() * Math.PI * 2;
        circle.rotation.y = Math.random() * Math.PI * 2;
        
        scene.add(circle);
        circles.push(circle);
    }
    
    // Glowing Circle Outlines
    const circleOutlines = [];
    for(let i = 0; i < 4; i++) {
        const outlineGeometry = new THREE.RingGeometry(0.8 + i * 0.4, 0.85 + i * 0.4, 64);
        const outlineMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff88,
            transparent: true,
            opacity: 0.4,
            side: THREE.DoubleSide
        });
        const outline = new THREE.Mesh(outlineGeometry, outlineMaterial);
        outline.position.set(
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4
        );
        scene.add(outline);
        circleOutlines.push(outline);
    }
    
    // Position camera
    camera.position.z = 6;
    camera.position.y = 1;
    
    // Automatic camera movement
    let cameraAngle = 0;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        const time = Date.now() * 0.001;
        
        // Rotate central helix
        helixMesh.rotation.x += 0.01;
        helixMesh.rotation.y += 0.008;
        helixMesh.rotation.z += 0.005;
        
        // Animate orbiting shapes
        meshes.slice(1).forEach((mesh, index) => {
            const speed = 0.02 + index * 0.005;
            const radius = 2 + Math.sin(time + index) * 0.5;
            const angle = time * speed + (index / 6) * Math.PI * 2;
            
            mesh.position.x = Math.cos(angle) * radius;
            mesh.position.z = Math.sin(angle) * radius;
            mesh.position.y = Math.sin(time * 2 + index) * 1.5;
            
            // Rotate individual shapes
            mesh.rotation.x += 0.02;
            mesh.rotation.y += 0.015;
            mesh.rotation.z += 0.01;
            
            // Color cycling
            mesh.material.color.setHSL((time * 0.1 + index / 6) % 1, 1, 0.6);
        });
        
        // Animate spiral particles
        spiralParticles.rotation.y += 0.005;
        spiralParticles.rotation.x += 0.002;
        
        // Update ambient particles
        const positions = ambientParticles.geometry.attributes.position.array;
        for(let i = 0; i < ambientCount; i++) {
            positions[i * 3] += ambientVelocities[i].x;
            positions[i * 3 + 1] += ambientVelocities[i].y;
            positions[i * 3 + 2] += ambientVelocities[i].z;
            
            // Boundary check and reset
            if(Math.abs(positions[i * 3]) > 7.5) ambientVelocities[i].x *= -1;
            if(Math.abs(positions[i * 3 + 1]) > 7.5) ambientVelocities[i].y *= -1;
            if(Math.abs(positions[i * 3 + 2]) > 7.5) ambientVelocities[i].z *= -1;
        }
        ambientParticles.geometry.attributes.position.needsUpdate = true;
        
        // Animate energy rings
        rings.forEach((ring, index) => {
            ring.rotation.x += 0.01 + index * 0.002;
            ring.rotation.y += 0.008 + index * 0.003;
            ring.rotation.z += 0.005 + index * 0.001;
            
            // Pulsing effect
            const scale = 1 + Math.sin(time * 3 + index * 2) * 0.2;
            ring.scale.setScalar(scale);
            
            // Opacity animation
            ring.material.opacity = 0.2 + Math.sin(time * 2 + index) * 0.1;
        });
        
        // Animate dynamic circles
        circles.forEach((circle, index) => {
            // Floating movement
            circle.position.x += Math.sin(time * 0.5 + index) * 0.01;
            circle.position.y += Math.cos(time * 0.7 + index) * 0.01;
            circle.position.z += Math.sin(time * 0.3 + index) * 0.008;
            
            // Rotation
            circle.rotation.x += 0.02;
            circle.rotation.y += 0.015;
            
            // Color cycling
            circle.material.color.setHSL((time * 0.1 + index * 0.2) % 1, 1, 0.7);
            
            // Scale pulsing
            const circleScale = 1 + Math.sin(time * 4 + index * 1.5) * 0.3;
            circle.scale.setScalar(circleScale);
            
            // Opacity variation
            circle.material.opacity = 0.6 + Math.sin(time * 2 + index) * 0.2;
        });
        
        // Animate circle outlines
        circleOutlines.forEach((outline, index) => {
            outline.rotation.x += 0.005 + index * 0.001;
            outline.rotation.y += 0.007 + index * 0.002;
            outline.rotation.z += 0.003 + index * 0.001;
            
            // Orbital movement around center
            const orbitRadius = 3 + Math.sin(time + index) * 0.5;
            const orbitAngle = time * 0.3 + index * Math.PI * 0.5;
            
            outline.position.x = Math.cos(orbitAngle) * orbitRadius;
            outline.position.z = Math.sin(orbitAngle) * orbitRadius;
            outline.position.y = Math.sin(time * 2 + index) * 2;
            
            // Pulsing glow effect
            const glowScale = 1 + Math.sin(time * 5 + index * 2) * 0.4;
            outline.scale.setScalar(glowScale);
            
            // Opacity pulsing
            outline.material.opacity = 0.3 + Math.sin(time * 3 + index) * 0.2;
        });
        
        // Automatic camera orbit
        cameraAngle += 0.003;
        camera.position.x = Math.cos(cameraAngle) * 6;
        camera.position.z = Math.sin(cameraAngle) * 6;
        camera.lookAt(0, 0, 0);
        
        // Global pulsing effect
        const globalPulse = 1 + Math.sin(time * 1.5) * 0.05;
        scene.scale.setScalar(globalPulse);
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Initialize Three.js when page loads
window.addEventListener('load', () => {
    // Check if Three.js is available
    if (typeof THREE !== 'undefined') {
        init3DBackground();
    } else {
        console.log('Three.js not loaded, using fallback design');
        // Fallback: create a gradient background
        const container = document.querySelector('.image-container');
        container.style.background = 'linear-gradient(135deg, #00ff88 0%, #0066ff 100%)';
        container.style.backgroundSize = '200% 200%';
        container.style.animation = 'gradientShift 4s ease-in-out infinite';
        
        // Add gradient animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes gradientShift {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
        `;
        document.head.appendChild(style);
    }
});



// Certificate Modal Functions
function openCertificateModal(imageUrl, title) {
    const modal = document.getElementById('certificate-modal');
    const titleElement = document.getElementById('certificate-title');
    const imageElement = document.getElementById('certificate-image');
    
    titleElement.textContent = title;
    imageElement.src = imageUrl;
    imageElement.alt = title;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add fade-in animation
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeCertificateModal(event) {
    const modal = document.getElementById('certificate-modal');
    
    // Only close if clicking on the modal background or close button
    if (!event || event.target === modal || event.target.classList.contains('certificate-modal-close')) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close certificate modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCertificateModal();
    }
});

console.log('🚀 Portfolio loaded successfully! Welcome to T2-Astra\'s digital space.');
console.log('💡 Try the Konami code for a surprise: ↑↑↓↓←→←→BA');

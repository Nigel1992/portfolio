/* ================================================
   MODERN DARK PORTFOLIO - JAVASCRIPT
   ================================================ */

// ==================== Initialization ====================
document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    initCursorTrail();
    initThemeToggle();
    initMatrixRain();
    initTerminalAnimator();
    initConstellation();
    initAsteroidGame();
    initNavigation();
    initSmoothScrollTracking();
    initHeroTyping();
    initScrollAnimations();
    initCountUp();
    initSkillBars();
    initTestimonials();
    initMobileMenu();
    initProjectFilters();
    initEmailObfuscation();
});

// ==================== Cursor Glow Effect ====================
function initCursorGlow() {
    const cursorGlow = document.querySelector('.cursor-glow');
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// ==================== Navigation Scroll Effect ====================
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
}

function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ==================== Hero Typing Animation ====================
function initHeroTyping() {
    const typingText = document.querySelector('.typing-text');
    const roles = [
        'ICT Professional',
        'Automation Specialist',
        'System Administrator',
        'Software Developer'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }
        
        typingText.textContent = currentRole.substring(0, charIndex);
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause before deleting
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            roleIndex = (roleIndex + 1) % roles.length;
            isDeleting = false;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// ==================== Scroll Animations ====================
function initScrollAnimations() {
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
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// ==================== Count Up Animation ====================
function initCountUp() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                const target = parseInt(entry.target.dataset.count);
                countUp(entry.target, target);
                entry.target.dataset.counted = 'true';
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function countUp(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const steps = 50;
    const stepDuration = duration / steps;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepDuration);
}

// ==================== Skill Bars Animation ====================
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const skillProgress = entry.target.querySelector('.skill-progress');
                const progress = entry.target.dataset.skill;
                skillProgress.style.setProperty('--progress', `${progress}%`);
                entry.target.dataset.animated = 'true';
            }
        });
    }, observerOptions);
    
    skillItems.forEach(item => observer.observe(item));
}

// ==================== Testimonials Slider ====================
function initTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (index >= testimonialCards.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = testimonialCards.length - 1;
        } else {
            currentIndex = index;
        }
        
        testimonialCards[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        showTestimonial(currentIndex + 1);
    }, 5000);
}

// ==================== Email Obfuscation ====================
function initEmailObfuscation() {
    // Multi-layer obfuscation: Character codes shifted by +1
    // Original: thedjskywalker@gmail.com
    // Each character code is incremented by 1 to obfuscate
    const obfuscated = [117,105,102,101,107,116,108,122,120,98,109,108,102,115,65,104,110,98,106,109,47,100,112,110];
    
    // Decode function: reverse character code shift
    const decodeEmail = () => {
        return String.fromCharCode(...obfuscated.map(code => code - 1));
    };
    
    const emailLink = document.getElementById('email-link');
    const emailText = document.getElementById('email-text');
    
    if (emailLink && emailText) {
        // Decode email with a small delay to make scraping harder
        setTimeout(() => {
            const email = decodeEmail();
            
            // Set the text content
            emailText.textContent = email;
            
            // Set the mailto link dynamically
            emailLink.href = 'mailto:' + email;
            emailLink.removeAttribute('onclick');
            emailLink.style.cursor = 'pointer';
            
            // Add additional protection: store in a way that's harder to scrape
            emailLink.setAttribute('data-contact', 'email');
        }, 100);
    }
}

// ==================== Notification System ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    let bgColor = '#3b82f6'; // default blue
    if (type === 'success') {
        bgColor = '#10b981'; // green
    } else if (type === 'error') {
        bgColor = '#ef4444'; // red
    }
    
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${bgColor};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ==================== Mobile Menu ====================
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navContainer = document.querySelector('.nav-container');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            
            if (mobileMenuBtn.classList.contains('active')) {
                // Create mobile menu
                const mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                mobileMenu.innerHTML = `
                    <a href="#home" class="mobile-menu-link">Home</a>
                    <a href="#about" class="mobile-menu-link">About</a>
                    <a href="#skills" class="mobile-menu-link">Skills</a>
                    <a href="#projects" class="mobile-menu-link">Projects</a>
                    <a href="#contact" class="mobile-menu-link">Contact</a>
                `;
                navContainer.appendChild(mobileMenu);
                
                // Close menu on link click
                document.querySelectorAll('.mobile-menu-link').forEach(link => {
                    link.addEventListener('click', () => {
                        mobileMenuBtn.classList.remove('active');
                        mobileMenu.remove();
                    });
                });
            } else {
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu) mobileMenu.remove();
            }
        });
    }
}

// ==================== Smooth Scroll Behavior ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ==================== Page Load Animation ====================
window.addEventListener('load', () => {
    // Trigger fade-in animations for elements already in view
    document.querySelectorAll('.fade-in').forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 50);
    });
});

// ==================== Project Filtering ====================
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Initialize project cards with animation
    projectCards.forEach((card, index) => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
}

// ==================== Performance Optimization ====================
// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('scroll', debounce(() => {
    updateActiveLink();
}, 100), false);

// ==================== Add Missing CSS for Mobile Menu ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(10px);
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .mobile-menu {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        right: 0;
        background: rgba(22, 22, 31, 0.98);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 16px 0;
        min-width: 220px;
        gap: 4px;
        z-index: 999;
        margin-top: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        animation: slideDown 0.3s ease;
    }
    
    .mobile-menu-link {
        padding: 14px 24px;
        color: var(--text-primary);
        transition: all 0.3s ease;
        border-left: 3px solid transparent;
        font-weight: 500;
        position: relative;
    }
    
    .mobile-menu-link::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 0;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
        transition: width 0.3s ease;
        z-index: -1;
    }
    
    .mobile-menu-link:hover::before {
        width: 100%;
    }
    
    .mobile-menu-link:hover {
        color: var(--text-primary);
        border-left-color: var(--accent-primary);
        padding-left: 28px;
    }
`;
document.head.appendChild(style);
// ==================== Cursor Trail Effect ====================
function initCursorTrail() {
    const colors = ['#6366f1', '#8b5cf6', '#a855f7'];
    let particles = [];
    
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.7) {
            createParticle(e.clientX, e.clientY, colors[Math.floor(Math.random() * colors.length)]);
        }
    });
    
    function createParticle(x, y, color) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = color;
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.opacity = '0.6';
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        document.body.appendChild(particle);
        
        let vx = (Math.random() - 0.5) * 2;
        let vy = (Math.random() - 0.5) * 2 - 2;
        let life = 1;
        
        const animate = () => {
            x += vx;
            y += vy;
            vy += 0.1;
            life -= 0.02;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = life * 0.6;
            
            if (life > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
}

// ==================== Smooth Scroll Link Tracking ====================
function initSmoothScrollTracking() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ==================== THEME TOGGLE ====================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.classList.toggle('light-theme', savedTheme === 'light');
    updateThemeIcon(savedTheme === 'light');
    
    themeToggle.addEventListener('click', () => {
        const isLight = htmlElement.classList.contains('light-theme');
        htmlElement.classList.toggle('light-theme');
        localStorage.setItem('theme', isLight ? 'dark' : 'light');
        updateThemeIcon(!isLight);
    });
    
    function updateThemeIcon(isLight) {
        themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

// ==================== MATRIX RAIN EFFECT ====================
function initMatrixRain() {
    const container = document.getElementById('matrixRain');
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    function createMatrixChar() {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = Math.random() * 100 + '%';
        char.style.top = Math.random() * -100 + 'px';
        char.style.animationDuration = (Math.random() * 10 + 5) + 's';
        container.appendChild(char);
        
        setTimeout(() => char.remove(), 15000);
    }
    
    setInterval(createMatrixChar, 200);
}

// ==================== TERMINAL CODE ANIMATOR ====================
function initTerminalAnimator() {
    const codeSnippets = [
        `// Automation Magic in PowerShell
function Invoke-PortfolioAutomation {
    [CmdletBinding()]
    param(
        [string]$Project
    )
    
    Write-Host "🚀 Deploying $Project..."
    
    # Advanced automation logic
    foreach ($task in @('build', 'test', 'deploy')) {
        Invoke-Task -Name $task
    }
}

Invoke-PortfolioAutomation -Project "AsteroPi"`,
        
        `// Python Kodi Addon Magic
class PortfolioAddon(xbmcaddon.Addon):
    def __init__(self):
        super().__init__()
        self.sync_projects()
    
    def sync_projects(self):
        for project in self.get_github_repos():
            self.display_project(project)
            self.add_interactive_elements()
    
    def on_item_clicked(self, item):
        self.launch_project_viewer(item)

addon = PortfolioAddon()`,
        
        `// React Component Magic
export const PortfolioShowcase = ({ projects }) => {
  const [active, setActive] = useState(0);
  
  useEffect(() => {
    loadProjects();
  }, []);
  
  return (
    <div className="showcase">
      {projects.map((p, i) => (
        <ProjectCard 
          key={i} 
          project={p}
          isActive={i === active}
        />
      ))}
    </div>
  );
};`
    ];
    
    const terminalCode = document.getElementById('terminalCode');
    let snippetIndex = 0;
    
    function typeCode() {
        const snippet = codeSnippets[snippetIndex];
        terminalCode.textContent = snippet;
        snippetIndex = (snippetIndex + 1) % codeSnippets.length;
    }
    
    typeCode();
    setInterval(typeCode, 8000);
}

// ==================== CONSTELLATION GRAPH ====================
function initConstellation() {
    const canvas = document.getElementById('constellationCanvas');
    const nodesContainer = document.getElementById('constellationNodes');
    const ctx = canvas.getContext('2d');
    
    const nodes = [
        { tech: 'JavaScript', icon: 'fab fa-js-square', x: 0.15, y: 0.3 },
        { tech: 'Python', icon: 'fab fa-python', x: 0.85, y: 0.3 },
        { tech: 'PowerShell', icon: 'fas fa-terminal', x: 0.5, y: 0.1 },
        { tech: 'React', icon: 'fab fa-react', x: 0.25, y: 0.7 },
        { tech: 'Node.js', icon: 'fab fa-node-js', x: 0.75, y: 0.7 },
        { tech: 'Linux', icon: 'fab fa-linux', x: 0.1, y: 0.9 },
        { tech: 'Windows', icon: 'fab fa-windows', x: 0.9, y: 0.9 },
    ];
    
    let selectedNode = null;
    const connections = {
        'JavaScript': ['React', 'Node.js'],
        'Python': ['Linux', 'Windows'],
        'PowerShell': ['Windows', 'Linux'],
        'React': ['JavaScript', 'Node.js'],
        'Node.js': ['JavaScript', 'Linux'],
        'Linux': ['Python', 'PowerShell'],
        'Windows': ['PowerShell', 'Python']
    };
    
    function resizeCanvas() {
        const wrapper = canvas.parentElement;
        canvas.width = wrapper.offsetWidth;
        canvas.height = wrapper.offsetHeight;
        drawConstellation();
    }
    
    function drawConstellation() {
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-secondary');
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-glow');
        ctx.lineWidth = 1;
        
        nodes.forEach(node => {
            connections[node.tech]?.forEach(connectedTech => {
                const connNode = nodes.find(n => n.tech === connectedTech);
                if (connNode) {
                    ctx.beginPath();
                    ctx.moveTo(node.x * canvas.width, node.y * canvas.height);
                    ctx.lineTo(connNode.x * canvas.width, connNode.y * canvas.height);
                    ctx.stroke();
                }
            });
        });
    }
    
    function createNodeElements() {
        nodesContainer.innerHTML = '';
        nodes.forEach(node => {
            const nodeEl = document.createElement('div');
            nodeEl.className = 'constellation-node';
            nodeEl.style.left = (node.x * 100) + '%';
            nodeEl.style.top = (node.y * 100) + '%';
            
            nodeEl.innerHTML = `
                <div class="constellation-node-inner">
                    <i class="${node.icon}"></i>
                </div>
                <div class="constellation-node-label">${node.tech}</div>
            `;
            
            nodeEl.addEventListener('click', () => {
                selectedNode = selectedNode === node.tech ? null : node.tech;
                updateConnections();
            });
            
            nodesContainer.appendChild(nodeEl);
        });
    }
    
    function updateConnections() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawConstellation();
        
        if (selectedNode) {
            ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary');
            ctx.lineWidth = 2;
            
            const node = nodes.find(n => n.tech === selectedNode);
            connections[selectedNode]?.forEach(connectedTech => {
                const connNode = nodes.find(n => n.tech === connectedTech);
                if (connNode) {
                    ctx.beginPath();
                    ctx.moveTo(node.x * canvas.width, node.y * canvas.height);
                    ctx.lineTo(connNode.x * canvas.width, connNode.y * canvas.height);
                    ctx.stroke();
                }
            });
        }
    }
    
    resizeCanvas();
    createNodeElements();
    window.addEventListener('resize', () => {
        resizeCanvas();
        createNodeElements();
    });
}

// ==================== ASTEROID GAME ====================
function initAsteroidGame() {
    const startBtn = document.getElementById('gameStartBtn');
    const gameModal = document.getElementById('gameModal');
    const closeBtn = document.getElementById('gameModalClose');
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.getElementById('gameScore');
    const livesDisplay = document.getElementById('gameLives');
    const gameOverScreen = document.getElementById('gameOverScreen');
    const finalScoreDisplay = document.getElementById('finalScore');
    const restartBtn = document.getElementById('gameRestartBtn');
    
    let gameActive = false;
    let score = 0;
    let lives = 3;
    
    function resizeCanvas() {
        canvas.width = gameModal.offsetWidth;
        canvas.height = gameModal.offsetHeight - 60;
    }
    
    class Ship {
        constructor() {
            this.x = canvas.width / 2;
            this.y = canvas.height - 50;
            this.width = 30;
            this.height = 40;
            this.speed = 6;
            this.vx = 0;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.fillStyle = '#6366f1';
            ctx.beginPath();
            ctx.moveTo(0, -this.height / 2);
            ctx.lineTo(-this.width / 2, this.height / 2);
            ctx.lineTo(this.width / 2, this.height / 2);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
        
        update() {
            this.x += this.vx;
            if (this.x < this.width / 2) this.x = this.width / 2;
            if (this.x > canvas.width - this.width / 2) this.x = canvas.width - this.width / 2;
        }
    }
    
    class Asteroid {
        constructor(x, y, size) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.radius = size * 8;
            this.vx = (Math.random() - 0.5) * 4;
            this.vy = Math.random() * 3 + 1;
        }
        
        draw() {
            ctx.fillStyle = '#8b5cf6';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
        }
        
        isOffscreen() {
            return this.y > canvas.height + this.radius;
        }
    }
    
    let ship = new Ship();
    let asteroids = [];
    let gameLoop;
    
    const keys = {};
    document.addEventListener('keydown', (e) => {
        keys[e.key] = true;
        if (e.key === 'ArrowLeft') ship.vx = -ship.speed;
        if (e.key === 'ArrowRight') ship.vx = ship.speed;
    });
    
    document.addEventListener('keyup', (e) => {
        keys[e.key] = false;
        if (e.key === 'ArrowLeft' && !keys['ArrowRight']) ship.vx = 0;
        if (e.key === 'ArrowRight' && !keys['ArrowLeft']) ship.vx = 0;
    });
    
    function spawnAsteroid() {
        const size = Math.random() > 0.5 ? 1 : 2;
        asteroids.push(new Asteroid(Math.random() * canvas.width, -20, size));
    }
    
    function update() {
        ship.update();
        asteroids.forEach(asteroid => asteroid.update());
        asteroids = asteroids.filter(a => !a.isOffscreen());
        
        // Check collisions
        asteroids.forEach(asteroid => {
            const dx = ship.x - asteroid.x;
            const dy = ship.y - asteroid.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < asteroid.radius + ship.width / 2) {
                lives--;
                livesDisplay.textContent = lives;
                asteroids = asteroids.filter(a => a !== asteroid);
                
                if (lives <= 0) {
                    endGame();
                }
            }
        });
        
        score++;
        scoreDisplay.textContent = Math.floor(score / 10);
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 15, 0.9)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ship.draw();
        asteroids.forEach(a => a.draw());
    }
    
    function gameUpdate() {
        update();
        draw();
        gameLoop = requestAnimationFrame(gameUpdate);
    }
    
    function startGame() {
        gameActive = true;
        gameOverScreen.style.display = 'none';
        ship = new Ship();
        asteroids = [];
        score = 0;
        lives = 3;
        scoreDisplay.textContent = 0;
        livesDisplay.textContent = lives;
        resizeCanvas();
        gameLoop = requestAnimationFrame(gameUpdate);
        
        // Spawn asteroids
        const spawnInterval = setInterval(() => {
            if (gameActive) {
                spawnAsteroid();
            } else {
                clearInterval(spawnInterval);
            }
        }, 1000);
    }
    
    function endGame() {
        gameActive = false;
        cancelAnimationFrame(gameLoop);
        finalScoreDisplay.textContent = Math.floor(score / 10);
        gameOverScreen.style.display = 'flex';
    }
    
    startBtn.addEventListener('click', () => {
        gameModal.classList.add('active');
        startGame();
    });
    
    closeBtn.addEventListener('click', () => {
        gameModal.classList.remove('active');
        gameActive = false;
        cancelAnimationFrame(gameLoop);
    });
    
    restartBtn.addEventListener('click', startGame);
}

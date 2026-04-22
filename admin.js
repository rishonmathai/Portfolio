document.addEventListener('DOMContentLoaded', () => {
    
    // 1. INITIALIZE ADMIN SESSION
    const initAdmin = () => {
        // Since Admins are usually static, we'll check for a custom label 
        // or just ensure the Terminal feel is active.
        console.log("%c[SYSTEM]: EduCore Kernel v4.0.1 - Admin Session Active", "color: #ef4444; font-weight: bold; font-size: 12px;");
        
        // Start simulated server monitoring
        startSystemMonitoring();
    };

    initAdmin();

    // 2. SYSTEM COMMAND & FEATURE SEARCH
    const searchInput = document.getElementById('featureSearch');
    const featureGrid = document.getElementById('featureGrid');

    if (searchInput && featureGrid) {
        const cards = featureGrid.querySelectorAll('.feature-card');

        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            
            cards.forEach(card => {
                const text = card.querySelector('span').innerText.toLowerCase();
                
                if (text.includes(term)) {
                    card.style.display = "flex";
                    // Force restart animation for consistent terminal feel
                    card.style.animation = "none";
                    card.offsetHeight; 
                    card.style.animation = "slideUpFade 0.3s ease forwards";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }

    // 3. ADMIN SIDEBAR NAVIGATION
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Only prevent default if the href is "#"
            if (this.getAttribute('href') === "#") e.preventDefault();
            
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            const page = this.dataset.page || "overview";
            console.log(`%c[SYS]: Accessing Module -> ${page.toUpperCase()}`, "color: #6366f1; font-weight: bold;");
        });
    });

    // 4. TACTILE "POWER" FEEDBACK
    const allCards = document.querySelectorAll('.feature-card');
    allCards.forEach(card => {
        card.addEventListener('mousedown', function() {
            // Sharper, faster press for administrative authority
            this.style.transform = "scale(0.95) translateY(-2px)";
            this.style.filter = "contrast(1.1) brightness(0.95)";
            this.style.transition = "0.05s";
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = ""; 
            this.style.filter = "";
            this.style.transition = "0.2s";
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = "";
            this.style.filter = "";
        });
    });
});

// 5. SYSTEM MONITORING SIMULATOR (Adds to the Admin Aesthetic)
function startSystemMonitoring() {
    const cpuDisplay = document.getElementById('cpu-load');
    if (!cpuDisplay) return;

    setInterval(() => {
        const load = Math.floor(Math.random() * (16 - 8 + 1)) + 8; // Keeps it between 8-16%
        cpuDisplay.innerText = `${load}%`;
        
        // Randomly log system "pings" to console for immersion
        if (Math.random() > 0.8) {
            console.log(`%c[PING]: Database Latency: ${Math.floor(Math.random() * 20) + 5}ms`, "color: #94a3b8; font-size: 10px;");
        }
    }, 4000);
}

// 6. ADMIN FEATURE CONTROLLER
function navigateTo(feature) {
    const featureName = feature.replace('-', ' ').toUpperCase();
    const container = document.querySelector('.dashboard-container');

    // Authority warnings for specific tools
    const secureTools = {
        'backup': 'Initiating full database encryption and cloud backup...',
        'block-users': 'Accessing global user permission manifest...',
        'terminal': 'DANGER: Accessing SQL Terminal. All queries are permanent.'
    };

    if (secureTools[feature]) {
        console.warn(`[SECURITY]: ${secureTools[feature]}`);
    }

    // Standard routing logic
    const routes = {
        'add-student': 'admin-enroll.html',
        'add-teacher': 'admin-faculty.html',
        'manage-roles': 'admin-roles.html',
        'block-users': 'admin-access.html',
        'master-timetable': 'admin-timetable.html',
        'terminal': 'admin-terminal.html'
    };

    const target = routes[feature] || `admin-${feature}.html`;

    // Transition effect
    if (container) {
        container.style.opacity = '0';
        container.style.filter = 'blur(5px)';
        container.style.transition = '0.3s';
    }

    setTimeout(() => {
        window.location.href = target;
    }, 300);
}

// 7. SECURE SYSTEM EXIT
function handleLogout() {
    if (confirm("CRITICAL: Terminate Admin Session? Unsaved configuration changes may be lost.")) {
        console.error("[SYS]: Admin session manually terminated.");
        
        // Visual "Shutdown" effect
        document.body.style.backgroundColor = "#000";
        document.body.style.opacity = "0";
        document.body.style.transition = "all 0.6s ease";
        
        setTimeout(() => {
            localStorage.removeItem('isLoggedIn');
            sessionStorage.clear();
            window.location.href = "index.html"; 
        }, 600);
    }
}


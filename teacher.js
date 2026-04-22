document.addEventListener("DOMContentLoaded", () => {
    // 1. INITIALIZE TEACHER DATA
    const initializeProfile = () => {
        const name = localStorage.getItem('userName') || "Prof. Mathai";
        const id = localStorage.getItem('userID') || "T-8821";
        
        // Update header and welcome banner if elements exist
        const nameEl = document.getElementById('nav-teacher-name');
        const idEl = document.getElementById('nav-teacher-id');
        const welcomeEl = document.getElementById('welcome-msg');

        if (nameEl) nameEl.innerText = name.toUpperCase();
        if (idEl) idEl.innerText = `Faculty | ID: ${id}`;
        if (welcomeEl) welcomeEl.innerText = `Welcome, ${name.split(' ')[0]}!`;
    };

    initializeProfile();

    // 2. TEACHER-SPECIFIC SEARCH FILTERING
    const searchInput = document.getElementById("featureSearch");
    const featureGrid = document.getElementById("featureGrid");

    if (searchInput && featureGrid) {
        const cards = featureGrid.querySelectorAll(".feature-card");

        searchInput.addEventListener("input", (e) => {
            const term = e.target.value.toLowerCase();

            cards.forEach((card) => {
                const text = card.querySelector("span").innerText.toLowerCase();
                if (text.includes(term)) {
                    card.style.display = "flex";
                    // Resetting animation to trigger it again
                    card.style.animation = "none";
                    card.offsetHeight; // trigger reflow
                    card.style.animation = "slideUpFade 0.3s ease forwards";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }

    // 3. FACULTY SIDEBAR ACTIVE STATE
    const navItems = document.querySelectorAll(".nav-item");
    const currentPath = window.location.pathname.split('/').pop();

    navItems.forEach((item) => {
        // Set active class based on URL on load
        if (item.getAttribute('href') === currentPath) {
            item.classList.add('active');
        }

        item.addEventListener("click", function () {
            navItems.forEach((i) => i.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // 4. TEACHER CARD INTERACTION (Tactile Scale Effect)
    const allCards = document.querySelectorAll(".feature-card");
    allCards.forEach((card) => {
        card.addEventListener("mousedown", () => {
            card.style.transform = "scale(0.96) translateY(-4px)";
            card.style.transition = "0.1s";
        });

        card.addEventListener("mouseup", () => {
            card.style.transform = ""; // Returns to CSS hover state
            card.style.transition = "0.3s";
        });
        
        // Ensure scale resets if mouse leaves card while pressed
        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
});

// 5. IMPROVED NAVIGATION LOGIC
/**
 * @param {string} feature - The module identifier or direct URL
 */
function navigateTo(feature) {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(10px)';
        mainContent.style.transition = 'all 0.3s ease';
    }

    // Map features to actual file names (Fixing your previous mark-attendance loop)
    const routes = {
        'mark-attendance': 'tr-attendance.html',
        'upload-grades': 'tr-grades.html',
        'assignments': 'tr-assignments.html',
        'course-material': 'tr-materials.html',
        'leave-application': 'tr-leave.html',
        'student-records': 'tr-students.html'
    };

    const targetPath = routes[feature] || `${feature}.html`;

    setTimeout(() => {
        console.log(`Faculty Route: ${targetPath}`);
        window.location.href = targetPath;
    }, 250);
}

// 6. SECURE LOGOUT
function handleLogout() {
    // Custom styled confirmation for a "pro" feel
    const confirmLogout = confirm("Professor, are you sure you want to log out of the Faculty Portal?");
    
    if (confirmLogout) {
        // Use a small delay for a smooth fade out
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s';
        
        setTimeout(() => {
            localStorage.removeItem('isLoggedIn'); // Assuming this is your auth key
            sessionStorage.clear();
            window.location.href = "index.html";
        }, 500);
    }
}
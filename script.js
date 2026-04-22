// 1. Role Selection Logic
document.querySelectorAll('input[name="role"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const label = document.getElementById('idLabel');
        const role = e.target.value;
        
        // Update labels dynamically based on selection
        if (role === 'student') {
            label.innerText = 'Student ID Number';
        } else if (role === 'teacher') {
            label.innerText = 'Staff Employee ID';
        } else {
            label.innerText = 'Admin Security Key';
        }
    });
});

// 2. Updated Authentication and Redirection Logic
function handleAuth(event) {
    event.preventDefault();
    
    // Get values from form
    const roleInput = document.querySelector('input[name="role"]:checked');
    // We now target the Email field instead of an ID
    const inputEmail = document.getElementById('userEmailVerify').value.trim();
    const inputPass = document.getElementById('userPass').value;

    if (!roleInput) {
        alert("Please select a role first!");
        return;
    }

    const role = roleInput.value;

    // --- REAL SESSION-BASED AUTHENTICATION ---
    
    // 1. Fetch the "database" of registered users
    const usersDB = JSON.parse(localStorage.getItem('usersDB')) || [];

    // 2. Find the user who matches the Email AND Password entered
    const authenticatedUser = usersDB.find(user => 
        user.email.toLowerCase() === inputEmail.toLowerCase() && 
        user.password === inputPass
    );

    if (authenticatedUser) {
        // SUCCESS: The visitor entered the correct credentials they created earlier
        
        // Update session storage for the dashboards to use
        localStorage.setItem('userName', authenticatedUser.name);
        localStorage.setItem('userEmail', authenticatedUser.email);
        localStorage.setItem('userRole', role); 
        localStorage.setItem('isLoggedIn', 'true');
        // Keep the internal ID for professional look in dashboards
        localStorage.setItem('userID', authenticatedUser.id);

        // UI Feedback
        const btn = document.querySelector('.btn-submit');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying Credentials...';
        btn.disabled = true;

        setTimeout(() => {
            alert(`Identity Verified! Welcome to the ${role.charAt(0).toUpperCase() + role.slice(1)} Portal, ${authenticatedUser.name}.`);
            
            // Redirect based on selected role
            if (role === 'student') {
                window.location.href = "student.html";
            } else if (role === 'teacher') {
                window.location.href = "teacher.html";
            } else if (role === 'admin') {
                window.location.href = "admin.html";
            }
        }, 1200);

    } else {
        // FAILURE: Password doesn't match the one they set, or email is wrong
        alert("Verification Failed! The email or password does not match the account you created. Please try again.");
        
        const btn = document.querySelector('.btn-submit');
        btn.innerHTML = 'Sign In to Dashboard';
        btn.disabled = false;
    }
}

// Main JS
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.portal-page');
    pages.forEach(page => page.classList.add('hidden'));

    // Show selected page
    document.getElementById(pageId).classList.remove('hidden');

    // Update active button state
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

// Optional: Add click ripple effect to cards
document.querySelectorAll('.icon-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(-10px)';
        }, 100);
        
        const feature = this.querySelector('span').innerText;
        console.log(`Navigating to: ${feature}`);
    });
});
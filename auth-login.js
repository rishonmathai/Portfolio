let isLogin = true;

// Initialize "Users Database" in LocalStorage if it doesn't exist
if (!localStorage.getItem('usersDB')) {
    localStorage.setItem('usersDB', JSON.stringify([]));
}

function toggleAuth() {
    isLogin = !isLogin;
    const title = document.getElementById('authTitle');
    const subtitle = document.getElementById('authSubtitle');
    const submitBtn = document.getElementById('submitBtn');
    const toggleMsg = document.getElementById('toggleMsg');
    const toggleLink = document.querySelector('.toggle-text a');
    
    const nameGroup = document.getElementById('nameGroup');
    const phoneGroup = document.getElementById('phoneGroup'); // New phone field group

    if (isLogin) {
        title.innerText = "Sign In";
        subtitle.innerText = "Enter your account details to continue";
        submitBtn.innerText = "Sign In";
        toggleMsg.innerText = "New to the portal?";
        toggleLink.innerText = "Create Account";
        nameGroup.style.display = "none";
        phoneGroup.style.display = "none"; // Hide phone on login
    } else {
        title.innerText = "Create Account";
        subtitle.innerText = "Join our institutional network today";
        submitBtn.innerText = "Register Now";
        toggleMsg.innerText = "Already have an account?";
        toggleLink.innerText = "Sign In";
        nameGroup.style.display = "block";
        phoneGroup.style.display = "block"; // Show phone on registration
    }
}

function handleInitialAuth(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('loginName').value.trim();
    const emailInput = document.getElementById('loginEmail').value.trim();
    const phoneInput = document.getElementById('loginPhone').value.trim(); // Get Phone
    const passwordInput = document.getElementById('loginPassword').value;
    
    let users = JSON.parse(localStorage.getItem('usersDB'));

    if (!isLogin) {
        // --- REGISTRATION LOGIC ---
        const userExists = users.find(u => u.email === emailInput);
        if (userExists) {
            alert("This email is already registered. Please Sign In.");
            return;
        }

        // Create new user object including the phone number
        const newUser = {
            name: nameInput,
            email: emailInput,
            phone: phoneInput, // <--- Added Phone here
            password: passwordInput, 
            role: "student", 
            id: '2026PC' + Math.floor(1000 + Math.random() * 9000)
        };

        users.push(newUser);
        localStorage.setItem('usersDB', JSON.stringify(users));
        
        alert("Account Created Successfully! Please Sign In.");
        toggleAuth(); 

    } else {
        // --- LOGIN LOGIC ---
        const user = users.find(u => u.email === emailInput && u.password === passwordInput);

        if (user) {
            // SUCCESS: Store CURRENT session data including phone
            localStorage.setItem('userName', user.name);
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userPhone', user.phone); // <--- Added Phone to session
            localStorage.setItem('userID', user.id);
            localStorage.setItem('isLoggedIn', 'true');

            const btn = document.getElementById('submitBtn');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
            btn.disabled = true;

            setTimeout(() => {
                window.location.href = "login.html"; 
            }, 1000);
        } else {
            alert("Invalid Email or Password!");
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
  // 1. FEATURE SEARCH LOGIC
  const searchInput = document.getElementById("featureSearch");
  const cards = document.querySelectorAll(".feature-card");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase().trim();

      cards.forEach((card) => {
        const text = card.querySelector("span").innerText.toLowerCase();
        if (text.includes(term)) {
          card.style.display = "flex";
          // Re-trigger the animation from your CSS
          card.style.animation = "slideUpFade 0.4s ease forwards";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // 2. SIDEBAR NAVIGATION ACTIVE STATE
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      // Remove active class from all items
      navItems.forEach((i) => i.classList.remove("active"));
      // Add to clicked item
      this.classList.add("active");

      console.log(`Switching to page: ${this.dataset.page}`);
    });
  });

  // Notification Clear
  function clearNotifications() {
    const badge = document.getElementById("notif-badge");
    if (badge) {
      // Hides the red circle badge immediately
      badge.style.display = "none";

      // Optional: Store the 'read' state in localStorage
      // so it doesn't come back when they refresh the page
      localStorage.setItem("notificationsRead", "true");
    }
  }

  // Logic to run when any page loads
  document.addEventListener("DOMContentLoaded", () => {
    const badge = document.getElementById("notif-badge");

    // Check if the user is on the notification page
    // OR if they have already clicked it once before
    if (
      window.location.pathname.includes("notification.html") ||
      localStorage.getItem("notificationsRead") === "true"
    ) {
      if (badge) {
        badge.style.display = "none";
      }
    }
  });

  // 3. CARD CLICK ANIMATION (Tactile Feedback)
  cards.forEach((card) => {
    // When mouse is pressed down
    card.addEventListener("mousedown", function () {
      this.style.transform = "scale(0.95) translateY(-5px)";
      this.style.transition = "all 0.1s ease";
    });

    // When mouse is released
    card.addEventListener("mouseup", function () {
      this.style.transform = "translateY(-12px)";
      this.style.transition =
        "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    });

    // Reset if mouse leaves the card while pressing
    card.addEventListener("mouseleave", function () {
      if (!this.matches(":hover")) {
        this.style.transform = "translateY(0)";
      }
    });
  });
});

// 4. NAVIGATION HANDLER (Redirection)
function navigateTo(feature) {
  console.log(`Navigating to feature: ${feature}`);

  // Define your routing logic here
  const routes = {
    credentials: "changecredentials.html",
    "profile-edit": "profile.html",
    fees: "print-fee.html",
    notices: "notices.html",
    attendance: "attendance-report.html",
    homework: "homeworks-notes.html",
    timetable: "classtt.html"
  };

  if (routes[feature]) {
    window.location.href = routes[feature];
  } else {
    // Fallback for features not yet built
    alert(`The ${feature.replace("-", " ")} module is under maintenance.`);
  }
}

// 5. LOGOUT HANDLER
function handleLogout() {
  // A more personalized confirmation
  const confirmLogout = confirm("Rishon, are you sure you want to log out?");
  if (confirmLogout) {
    // Clear session data if needed
    sessionStorage.clear();
    // Redirect to login page (ensure path is correct)
    window.location.href = "index.html";
  }
}

// Redirect to Time Table Page
function goToClassTT() {
  window.location.href = "classtt.html";
}

// Redirect To Fees
function goToFees() {
  window.location.href = "print-fee.html";
}

// Redirect to Attendance
function goToAttendance(){
  window.location.href = "attendance-report.html";
}

// Redirect to Profile
function goToCProfile() {
  window.location.href = "profile.html"
}
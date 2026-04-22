// This script should be included on EVERY page
document.addEventListener('DOMContentLoaded', () => {
    // 1. Check for saved theme preference immediately on load
    const savedTheme = localStorage.getItem('educore_theme') || 'light';
    applyTheme(savedTheme);

    // 2. Settings Page Specific Logic
    const themeToggle = document.getElementById('darkModeToggle');
    
    // If we are on the settings page, sync the toggle state with saved theme
    if (themeToggle) {
        themeToggle.checked = (savedTheme === 'dark');
        
        themeToggle.addEventListener('change', () => {
            const newTheme = themeToggle.checked ? 'dark' : 'light';
            localStorage.setItem('educore_theme', newTheme);
            applyTheme(newTheme);
        });
    }
});

/**
 * The "Master Switch" that changes the whole website
 */
function applyTheme(theme) {
    if (theme === 'dark') {
        // We inject a class into the <html> or <body> tag
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}
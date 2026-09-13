document.addEventListener('DOMContentLoaded', () => {
    // Check Auth State for Navbar
    const authLinks = document.querySelectorAll('.auth-required');
    const loginLinks = document.querySelectorAll('.login-link');
    const isLoggedIn = sessionStorage.getItem('nexa_auth') === 'true';

    if (isLoggedIn) {
        authLinks.forEach(el => el.classList.remove('hidden'));
        loginLinks.forEach(el => el.classList.add('hidden'));
    } else {
        authLinks.forEach(el => el.classList.add('hidden'));
        loginLinks.forEach(el => el.classList.remove('hidden'));
    }

    // Login Form logic
    const loginForm = document.getElementById('nexa-login');
    const errorMsg = document.getElementById('login-error');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (email === 'admin@gmail.com' && password === 'admin@123') {
                sessionStorage.setItem('nexa_auth', 'true');
                window.location.href = 'prediction.html';
            } else {
                errorMsg.classList.remove('hidden');
            }
        });
    }

    // Logout
    const logoutBtns = document.querySelectorAll('.logout-btn');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('nexa_auth');
            window.location.href = 'index.html';
        });
    });

    // Guard Prediction Page
    const isPredictionPage = window.location.pathname.includes('prediction.html');
    if (isPredictionPage && !isLoggedIn) {
        window.location.href = 'login.html';
    }
});

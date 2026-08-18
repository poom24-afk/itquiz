const LOGIN_USERNAME = 'Admin';
const LOGIN_PASSWORD = '12345678';

const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const logoutBtn = document.getElementById('logoutBtn');

function isLoggedIn() {
  return localStorage.getItem('taTaLoggedIn') === 'true';
}

function ensureAccess() {
  if (window.location.pathname.endsWith('profile.html') && !isLoggedIn()) {
    window.location.href = 'index.html';
  }
}

if (loginForm) {
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === LOGIN_USERNAME && password === LOGIN_PASSWORD) {
      localStorage.setItem('taTaLoggedIn', 'true');
      window.location.href = 'profile.html';
      return;
    }

    errorMessage.textContent = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', function () {
    localStorage.removeItem('taTaLoggedIn');
    window.location.href = 'index.html';
  });
}

ensureAccess();

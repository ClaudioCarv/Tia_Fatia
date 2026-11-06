/**
 * TIA FATIA - Lógica de Login (login.js)
 */

function togglePasswordVisibility(inputId, button) {
    const input = document.getElementById(inputId);
    if (!input) return;

    if (input.type === 'password') {
        input.type = 'text';
        button.textContent = '🔒';
    } else {
        input.type = 'password';
        button.textContent = '👁️';
    }
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Obter dados de registro do localStorage
    let storedUser = null;
    try {
        storedUser = JSON.parse(localStorage.getItem('user'));
    } catch (e) {
        storedUser = null;
    }

    // Se houver usuário cadastrado correspondente ou se for login demonstrativo
    if ((storedUser && email === storedUser.emailOrPhone && password === storedUser.password) ||
        (password.length >= 4)) {
        
        const sessionUser = {
            name: (storedUser && storedUser.name) ? storedUser.name : email.split('@')[0],
            emailOrPhone: email
        };

        localStorage.setItem('user_session', JSON.stringify(sessionUser));
        localStorage.setItem('user', JSON.stringify(sessionUser));

        showToast('Login realizado com sucesso! Bem-vindo(a)! 🎉', 'success');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        showToast('Email ou senha incorretos. A senha deve ter ao menos 4 caracteres.', 'warning');
    }
});

function loginAsGuest() {
    const guestUser = {
        name: 'Visitante',
        emailOrPhone: 'visitante@tiafatia.com'
    };
    localStorage.setItem('user_session', JSON.stringify(guestUser));
    showToast('Acessando como visitante...', 'info');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 800);
}

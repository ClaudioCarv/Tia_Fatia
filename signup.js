/**
 * TIA FATIA - Lógica de Cadastro (signup.js)
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

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('fullName').value.trim();
    const emailOrPhone = document.getElementById('emailOrPhone').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (password !== confirmPassword) {
        showToast('As senhas não coincidem. Por favor, tente novamente.', 'warning');
        return;
    }

    if (password.length < 6) {
        showToast('A senha deve conter no mínimo 6 caracteres.', 'warning');
        return;
    }

    // Armazenamento dos dados de cadastro
    const user = { name, emailOrPhone, password };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('user_session', JSON.stringify(user));

    showToast(`Conta criada com sucesso para ${name}! Bem-vindo(a)! 🎉`, 'success');

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1200);
});

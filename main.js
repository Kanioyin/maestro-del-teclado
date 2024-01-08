function login(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${username}&password=${password}`
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'dashboard.php'; // Przekierowanie po udanym zalogowaniu
            } else {
                document.getElementById('error-message').innerText = data.message;
            }
        })
        .catch(error => console.error('Błąd logowania:', error));
}

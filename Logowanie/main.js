function register() {
    var username = document.getElementById("regUsername").value;
    var password = document.getElementById("regPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Hasła nie są zgodne. Proszę wpisać identyczne hasła.");
        return;
    }

    var users = JSON.parse(localStorage.getItem('users')) || [];

    var existingUser = users.find(function(user) {
        return user.username === username;
    });

    if (existingUser) {
        alert("Użytkownik o podanej nazwie już istnieje. Wybierz inny login.");
        return;
    }

    var userData = {
        username: username,
        password: password
    };

    users.push(userData);

    localStorage.setItem('users', JSON.stringify(users));

    window.location.href = "login.html";
}

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var users = JSON.parse(localStorage.getItem('users')) || [];
    var userData = users.find(function(user) {
        return user.username === username;
    });

    if (userData && password === userData.password) {
        localStorage.setItem('loggedUser', JSON.stringify(userData));
        window.location.href = "../index.html";
    } else {
        alert("Błędne dane logowania. Spróbuj ponownie.");
    }

}

function goToRegistration() {
    window.location.href = "registration.html";
}

function goToLogin() {
    window.location.href = "login.html";
}

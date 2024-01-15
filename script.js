document.addEventListener("DOMContentLoaded", function () {
    // Sprawdzenie, czy użytkownik jest zalogowany
    var loggedUser = localStorage.getItem('loggedUser');

    // Ukrywanie lub pokazywanie odpowiednich elementów na podstawie zalogowania
    if (loggedUser) {
        showLoggedInUI(loggedUser);
    } else {
        showLoggedOutUI();
    }

    // Obsługa zdarzenia kliknięcia na "Zaloguj się"
    document.querySelector('.menu .highlight[href="Logowanie/login.html"]').addEventListener('click', function (event) {
        event.preventDefault();

        // Przykładowe dane użytkowników z localStorage
        var users = JSON.parse(localStorage.getItem('users')) || [];

        // Tutaj powinno być zaimplementowane prawdziwe logowanie, sprawdzanie użytkownika i hasła
        // Przykład dla zalogowania dla jednego z użytkowników
        var usernameInput = document.getElementById("username").value;
        var passwordInput = document.getElementById("password").value;

        var loggedInUser = users.find(function(user) {
            return user.username === usernameInput && user.password === passwordInput;
        });

        if (loggedInUser) {
            localStorage.setItem('loggedUser', loggedInUser.username);
            showLoggedInUI(loggedInUser.username);
        } else {
            alert("Błędne dane logowania. Spróbuj ponownie.");
        }
    });

    // Obsługa zdarzenia kliknięcia na "Wyloguj się"
    document.querySelector('.menu .highlight[href="index.html"]').addEventListener('click', function (event) {
        event.preventDefault();

        // Tutaj powinno być zaimplementowane prawdziwe wylogowanie, na przykład przekierowanie na stronę główną
        // Przykład dla symulacji wylogowania
        localStorage.removeItem('loggedUser');
        showLoggedOutUI();
    });

    // Funkcja ukazująca interfejs po zalogowaniu
    function showLoggedInUI(username) {
        document.querySelector('.menu .highlight[href="Logowanie/login.html"]').style.display = 'none';
        document.querySelector('.menu .highlight[href="Logowanie/registration.html"]').style.display = 'none';
        document.querySelector('.menu .highlight[href="index.html"]').textContent = 'Wyloguj się';
        document.querySelector('.menu .highlight[href="index.html"]').classList.add('logout-link');
        document.querySelector('.menu').insertAdjacentHTML('beforeend', '<span>Zalogowano: ' + username + '</span>');
    }

    // Funkcja ukazująca interfejs po wylogowaniu
    function showLoggedOutUI() {
        document.querySelector('.menu .highlight[href="Logowanie/login.html"]').style.display = 'inline-block';
        document.querySelector('.menu .highlight[href="Logowanie/registration.html"]').style.display = 'inline-block';
        document.querySelector('.menu .highlight[href="index.html"]').textContent = 'Strona główna';
        document.querySelector('.menu .highlight[href="index.html"]').classList.remove('logout-link');
        var loggedInInfo = document.querySelector('.menu span');
        if (loggedInInfo) {
            loggedInInfo.remove();
        }
    }
});

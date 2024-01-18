document.addEventListener("DOMContentLoaded", function () {
    // Sprawdzenie, czy użytkownik jest zalogowany
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const userPanel = document.querySelector("#user-panel");

    console.log(loggedUser);

    // Ukrywanie lub pokazywanie odpowiednich elementów na podstawie zalogowania
    if (loggedUser) {
        userPanel.insertAdjacentHTML("beforeend", `<div> <span>${loggedUser.username}</span> <button id="loggout-button">Wyloguj sie</button> </div>`)
        document.querySelector("#loggout-button").
        addEventListener("click", ()=>{
            localStorage.removeItem("loggedUser");
            window.location.reload()
        })

    } else {
        userPanel.insertAdjacentHTML("beforeend", `<div> <a href="Logowanie/login.html" class="highlight">Zaloguj się</a> <a href="Logowanie/registration.html" class="highlight">Zarejestruj się</a> </div>`)
    }




})


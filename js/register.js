document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const username = document.getElementById("registerUsername").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const registerMessage = document.getElementById("registerMessage");

    if (password !== confirmPassword) {
        registerMessage.textContent = "Passwords do not match.";
        registerMessage.style.color = "red";
        return;
    }

    const user = {
        fullName: fullName,
        username: username,
        email: email,
        password: password
    };

    localStorage.setItem("registeredUser", JSON.stringify(user));

    registerMessage.textContent = "Registration successful! Redirecting to login...";
    registerMessage.style.color = "green";

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
});
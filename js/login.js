document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const role = document.getElementById("loginRole").value;
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;
    const loginMessage = document.getElementById("loginMessage");

    if (role === "doctor") {
        const doctorUsername = "doctor";
        const doctorPassword = "medconnect123";

        if (username === doctorUsername && password === doctorPassword) {
            localStorage.setItem("loggedInUser", username);
            localStorage.setItem("loggedInRole", "doctor");

            loginMessage.textContent = "Doctor login successful! Redirecting...";
            loginMessage.style.color = "green";

            setTimeout(() => {
                window.location.href = "doctor.html";
            }, 1000);
        } else {
            loginMessage.textContent = "Invalid doctor username or password.";
            loginMessage.style.color = "red";
        }

        return;
    }

    if (role === "patient") {
        const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

        if (!savedUser) {
            loginMessage.textContent = "No registered patient found. Please register first.";
            loginMessage.style.color = "red";
            return;
        }

        if (username === savedUser.username && password === savedUser.password) {
            localStorage.setItem("loggedInUser", savedUser.username);
            localStorage.setItem("loggedInRole", "patient");

            loginMessage.textContent = "Patient login successful! Redirecting...";
            loginMessage.style.color = "green";

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        } else {
            loginMessage.textContent = "Invalid patient username or password.";
            loginMessage.style.color = "red";
        }

        return;
    }

    loginMessage.textContent = "Please select an account type.";
    loginMessage.style.color = "red";
});
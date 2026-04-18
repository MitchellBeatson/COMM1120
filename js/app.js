function showTab(tabNumber) {
    const loggedInUser = localStorage.getItem("loggedInUser");

    // 🚫 Block access if not logged in
    if (!loggedInUser && tabNumber !== 1) {
        alert("Please log in to access this section.");
        return;
    }

    // Hide all tabs
    const tabs = document.querySelectorAll(".pinkBackground");
    tabs.forEach(tab => tab.style.display = "none");

    // Show selected tab
    const selectedTab = document.getElementById("tab" + tabNumber);
    if (selectedTab) {
        selectedTab.style.display = "flex";
    }

    // Optional: highlight active button
    const buttons = document.querySelectorAll(".tab-buttons button");
    buttons.forEach(btn => btn.classList.remove("active-tab"));
    buttons[tabNumber - 1].classList.add("active-tab");
}

/*
function showTab(tabNumber) {
    // Hide all pink backgrounds
    document.querySelectorAll('.pinkBackground').forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected one
    document.getElementById(`tab${tabNumber}`).style.display = 'flex';

    // Remove active-tab class from all buttons
    document.querySelectorAll('.tab-buttons button').forEach(button => {
        button.classList.remove('active-tab');
    });

    // Add active-tab class to the clicked button
    document.querySelector(`.tab-buttons button:nth-child(${tabNumber})`).classList.add('active-tab');
}

function goToLogin() {
    window.location.href = "login.html";
}
*/
/*
window.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = localStorage.getItem("loggedInUser");

    const userText = document.querySelector(".user-text");
    const userIcon = document.querySelector(".user-icon");
    const userArea = document.querySelector(".user-area");

    if (loggedInUser && userText) {
        // Change "Login" → username
        userText.textContent = loggedInUser;

        // Optional: show first letter instead of 👤
        if (userIcon) {
            userIcon.textContent = loggedInUser.charAt(0).toUpperCase();
        }

        // Optional: disable link to login page
       // userArea.href = "#";

        userArea.addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            window.location.href = "login.html";
        });
    }
});
*/

window.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const buttons = document.querySelectorAll(".tab-buttons button");

    const userText = document.querySelector(".user-text");
    const userIcon = document.querySelector(".user-icon");
    const userArea = document.querySelector(".user-area");

    if (loggedInUser && userText) {
        // Show username
        userText.textContent = loggedInUser;

        // Show first letter instead of 👤
        if (userIcon) {
            userIcon.textContent = loggedInUser.charAt(0).toUpperCase();
        }

        // 🔥 Change link to logout page
        userArea.href = "logout.html";
    } else {
        // Not logged in → go to login page
        userArea.href = "login.html";
    }
/*
    if (!loggedInUser) {
        // Disable tabs except HOME
        buttons.forEach((btn, index) => {
            if (index !== 0) {
                btn.style.opacity = "0.5";
            }
        });
    }
 */
    const welcome = document.getElementById("welcomeUser");

    if (welcome) {
        if (loggedInUser) {
            welcome.textContent = "Welcome back, " + loggedInUser + " 👋";
        } else {
            welcome.textContent = "Welcome! Please log in to get started.";
        }
    }

    loadPastRecords();
    loadUserDetails();
});



const painScale = document.getElementById("painScale");
const painValue = document.getElementById("painValue");

if (painScale) {
    painScale.addEventListener("input", function () {
        painValue.textContent = painScale.value;
    });
}

const symptomForm = document.getElementById("symptomForm");

if (symptomForm) {
    symptomForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const emergency = document.getElementById("emergency").checked;
        const pain = document.getElementById("painScale").value;
        const symptoms = document.getElementById("symptoms").value.trim();
        const user = localStorage.getItem("loggedInUser");
        const symptomMessage = document.getElementById("symptomMessage");

        if (!user) {
            symptomMessage.textContent = "You must be logged in to submit symptoms.";
            return;
        }

        const submission = {
            emergency: emergency,
            pain: pain,
            symptoms: symptoms,
            user: user,
            date: new Date().toLocaleString()
        };

        const allRecords = JSON.parse(localStorage.getItem("symptomRecords")) || [];
        allRecords.push(submission);
        localStorage.setItem("symptomRecords", JSON.stringify(allRecords));

        symptomMessage.textContent = "Submission sent!";

        symptomForm.reset();
        painValue.textContent = "0";

        loadPastRecords();
    });
}

function loadPastRecords() {
    const recordsContainer = document.getElementById("recordsContainer");
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!recordsContainer) return;

    const allRecords = JSON.parse(localStorage.getItem("symptomRecords")) || [];
    const userRecords = allRecords.filter(record => record.user === loggedInUser);

    if (userRecords.length === 0) {
        recordsContainer.innerHTML = "<p class='text-on-pink'>No past records yet.</p>";
        return;
    }

    recordsContainer.innerHTML = "";

    userRecords.slice().reverse().forEach((record, index) => {
        const recordItem = document.createElement("div");
        recordItem.className = "record-item";

        const summaryButton = document.createElement("button");
        summaryButton.className = "record-summary";
        summaryButton.textContent = `Record ${userRecords.length - index} - ${record.date}`;

        const detailsDiv = document.createElement("div");
        detailsDiv.className = "record-details";
        detailsDiv.innerHTML = `
      <p><strong>Emergency:</strong> ${record.emergency ? "Yes" : "No"}</p>
      <p><strong>Pain Level:</strong> ${record.pain}/10</p>
      <p><strong>Symptoms:</strong> ${record.symptoms}</p>
    `;

        summaryButton.addEventListener("click", function () {
            const isVisible = detailsDiv.style.display === "block";
            detailsDiv.style.display = isVisible ? "none" : "block";
        });

        recordItem.appendChild(summaryButton);
        recordItem.appendChild(detailsDiv);
        recordsContainer.appendChild(recordItem);
    });
}

function loadUserDetails() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) return;

    const savedDetails = JSON.parse(localStorage.getItem("userDetails_" + loggedInUser));
    if (!savedDetails) return;

    document.getElementById("fullNameDetails").value = savedDetails.fullName || "";
    document.getElementById("dateOfBirth").value = savedDetails.dateOfBirth || "";
    document.getElementById("sexAtBirth").value = savedDetails.sexAtBirth || "";
    document.getElementById("gender").value = savedDetails.gender || "";
    document.getElementById("height").value = savedDetails.height || "";
    document.getElementById("weight").value = savedDetails.weight || "";
    document.getElementById("bloodType").value = savedDetails.bloodType || "";
    document.getElementById("allergies").value = savedDetails.allergies || "";
    document.getElementById("medications").value = savedDetails.medications || "";
    document.getElementById("vaccinated").checked = savedDetails.vaccinated || false;
    document.getElementById("vaccinations").value = savedDetails.vaccinations || "";
    document.getElementById("pastIllnesses").value = savedDetails.pastIllnesses || "";
    document.getElementById("pastSurgeries").value = savedDetails.pastSurgeries || "";
    document.getElementById("emergencyContact").value = savedDetails.emergencyContact || "";
    document.getElementById("phoneNumber").value = savedDetails.phoneNumber || "";
}

const detailsForm = document.getElementById("detailsForm");

if (detailsForm) {
    detailsForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const loggedInUser = localStorage.getItem("loggedInUser");
        const detailsMessage = document.getElementById("detailsMessage");

        if (!loggedInUser) {
            detailsMessage.textContent = "You must be logged in to save details.";
            detailsMessage.style.color = "red";
            return;
        }

        const userDetails = {
            fullName: document.getElementById("fullNameDetails").value.trim(),
            dateOfBirth: document.getElementById("dateOfBirth").value,
            sexAtBirth: document.getElementById("sexAtBirth").value,
            gender: document.getElementById("gender").value.trim(),
            height: document.getElementById("height").value,
            weight: document.getElementById("weight").value,
            bloodType: document.getElementById("bloodType").value,
            allergies: document.getElementById("allergies").value.trim(),
            medications: document.getElementById("medications").value.trim(),
            vaccinated: document.getElementById("vaccinated").checked,
            vaccinations: document.getElementById("vaccinations").value.trim(),
            pastIllnesses: document.getElementById("pastIllnesses").value.trim(),
            pastSurgeries: document.getElementById("pastSurgeries").value.trim(),
            emergencyContact: document.getElementById("emergencyContact").value.trim(),
            phoneNumber: document.getElementById("phoneNumber").value.trim()
        };

        localStorage.setItem("userDetails_" + loggedInUser, JSON.stringify(userDetails));

        detailsMessage.textContent = "Details saved successfully.";
        detailsMessage.style.color = "green";
    });
}

// Show the first tab by default
showTab(1);

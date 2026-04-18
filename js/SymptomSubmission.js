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
            date: new Date().toLocaleString(),
            timestamp: Date.now()
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
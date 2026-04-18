window.addEventListener("DOMContentLoaded", function () {
    const role = localStorage.getItem("loggedInRole");
    const doctorRecordsContainer = document.getElementById("doctorRecordsContainer");
    const patientSearch = document.getElementById("patientSearch");

    if (role !== "doctor") {
        window.location.href = "login.html";
        return;
    }

    const allRecords = JSON.parse(localStorage.getItem("symptomRecords")) || [];

    if (allRecords.length === 0) {
        doctorRecordsContainer.innerHTML = "<p class='text-on-pink'>No patient records available.</p>";
        return;
    }

    const recordsByPatient = {};

    allRecords.forEach((record) => {
        if (!recordsByPatient[record.user]) {
            recordsByPatient[record.user] = [];
        }
        recordsByPatient[record.user].push(record);
    });

    doctorRecordsContainer.innerHTML = "";

    Object.keys(recordsByPatient).forEach((patientUsername) => {
        const patientRecords = recordsByPatient[patientUsername];

        patientRecords.sort((a, b) => {
            const timeA = a.timestamp || 0;
            const timeB = b.timestamp || 0;
            return timeB - timeA;
        });

        const patientDetails = JSON.parse(localStorage.getItem("userDetails_" + patientUsername));

        const fullName = patientDetails && patientDetails.fullName
            ? patientDetails.fullName
            : "";

        const patientItem = document.createElement("div");
        patientItem.className = "record-item";

        // search text stored here
        patientItem.dataset.search = `${patientUsername} ${fullName}`.toLowerCase();

        const patientButton = document.createElement("button");
        patientButton.className = "record-summary";
        patientButton.textContent = fullName
            ? `${fullName} (${patientUsername})`
            : patientUsername;

        const patientDropdown = document.createElement("div");
        patientDropdown.className = "record-details";

        let patientInfoHTML = `
      <p><strong>Username:</strong> ${patientUsername}</p>
    `;

        if (patientDetails) {
            patientInfoHTML += `
        <p><strong>Full Name:</strong> ${patientDetails.fullName || ""}</p>
        <p><strong>Date of Birth:</strong> ${patientDetails.dateOfBirth || ""}</p>
        <p><strong>Sex Assigned at Birth:</strong> ${patientDetails.sexAtBirth || ""}</p>
        <p><strong>Gender:</strong> ${patientDetails.gender || ""}</p>
        <p><strong>Height:</strong> ${patientDetails.height || ""} cm</p>
        <p><strong>Weight:</strong> ${patientDetails.weight || ""} kg</p>
        <p><strong>Blood Type:</strong> ${patientDetails.bloodType || ""}</p>
        <p><strong>Allergies:</strong> ${patientDetails.allergies || ""}</p>
        <p><strong>Current Medications:</strong> ${patientDetails.medications || ""}</p>
        <p><strong>Vaccinated:</strong> ${patientDetails.vaccinated ? "Yes" : "No"}</p>
        <p><strong>Vaccinations:</strong> ${patientDetails.vaccinations || ""}</p>
        <p><strong>Past Illnesses:</strong> ${patientDetails.pastIllnesses || ""}</p>
        <p><strong>Past Surgeries:</strong> ${patientDetails.pastSurgeries || ""}</p>
        <p><strong>Emergency Contact:</strong> ${patientDetails.emergencyContact || ""}</p>
        <p><strong>Phone Number:</strong> ${patientDetails.phoneNumber || ""}</p>
        <hr>
        <p><strong>Submitted Records:</strong></p>
      `;
        } else {
            patientInfoHTML += `
        <hr>
        <p><strong>Submitted Records:</strong></p>
      `;
        }

        patientDropdown.innerHTML = patientInfoHTML;

        patientRecords.forEach((record, index) => {
            const singleRecord = document.createElement("div");
            singleRecord.className = "doctor-record-entry";

            singleRecord.innerHTML = `
        <p><strong>Record ${index + 1}:</strong> ${record.date}</p>
        <p><strong>Emergency:</strong> ${record.emergency ? "Yes" : "No"}</p>
        <p><strong>Pain Level:</strong> ${record.pain}/10</p>
        <p><strong>Symptoms:</strong> ${record.symptoms}</p>
        <hr>
      `;

            patientDropdown.appendChild(singleRecord);
        });

        patientButton.addEventListener("click", function () {
            const isVisible = patientDropdown.style.display === "block";
            patientDropdown.style.display = isVisible ? "none" : "block";
        });

        patientItem.appendChild(patientButton);
        patientItem.appendChild(patientDropdown);
        doctorRecordsContainer.appendChild(patientItem);
    });

    if (patientSearch) {
        patientSearch.addEventListener("input", function () {
            const searchTerm = patientSearch.value.toLowerCase().trim();
            const patientItems = document.querySelectorAll("#doctorRecordsContainer .record-item");

            patientItems.forEach((item) => {
                const searchText = item.dataset.search || "";
                if (searchText.includes(searchTerm)) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    }
});
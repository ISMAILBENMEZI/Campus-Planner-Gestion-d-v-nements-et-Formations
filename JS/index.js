
const homeINformation = document.getElementById("formation_cards");
document.addEventListener('DOMContentLoaded', function () {
    adminSinIn();
    studentSinIn();
    homeINformation.innerHTML = "";
    affichehomeinformation();
})

let nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{3,}$/;
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
let phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{9,10}$/;

const badMessag = document.getElementById("bad");
const goodMessag = document.getElementById("good");

function showMessage(element, text) {
    element.textContent = text;
    element.style.display = "block";
    setTimeout(() => element.style.display = "none", 3000);
}

function adminSinIn() {
    const adminButton = document.getElementById("admin_sinin");
    const adminSection = document.getElementById("sin_in_admin");
    const sinOutAdmin = document.getElementById("sign_out_admin");
    const adminForm = document.getElementById("sinin_form_admin");
    if (!adminButton || !adminSection || !adminForm || !sinOutAdmin) return;

    adminButton.addEventListener("click", function () {
        const checkAdminData = localStorage.getItem("adminInformation")
        if (checkAdminData)
            setTimeout(() => { window.location.href = "admin.html" }, 500)

        else
            adminSection.style.display = "block";

    })

    sinOutAdmin.addEventListener("click", function () {
        adminSection.style.display = "none";
    })

    adminForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const adminName = document.getElementById("username").value.trim();
        const adminEmail = document.getElementById("email").value.trim();
        const adminPhone = document.getElementById("phone").value.trim();
        const adminCampus = document.getElementById("campus").value.trim();
        const adminAge = Number(document.getElementById("age").value);
        const adminPassword = document.getElementById("password").value.trim();

        if (!adminName || !adminEmail || !adminPhone || !adminCampus || !adminAge || !adminPassword)
            return showMessage(badMessag, "Please fill all fileds");

        if (adminAge < 20)
            return showMessage(badMessag, "Age must be 20 or older");


        if (!emailRegex.test(adminEmail))
            return showMessage(badMessag, "Invalid email address");

        if (!phoneRegex.test(adminPhone))
            return showMessage(badMessag, "Invalid phone number");


        if (!passwordRegex.test(adminPassword))
            return showMessage(badMessag, "Invalid password (1 uppercase, 1 digit, 6+ chars)");
        let SaveAdminInformtion = { adminName, adminEmail, adminPhone, adminCampus, adminAge, adminPassword }
        localStorage.setItem("adminInformation", JSON.stringify(SaveAdminInformtion));
        showMessage(goodMessag, "Sign-in successful!")
        adminForm.reset();
        setTimeout(() => { window.location.href = "admin.html" }, 1000)
    })
}

function studentSinIn() {
    const studentButton = document.getElementById("etudiant_sinin");
    const studentSinout = document.getElementById("sign_outstudent");
    const studentSinin = document.getElementById("sin_instudent");
    const studentForm = document.getElementById("sinin_formstudent");

    studentButton.addEventListener("click", function () {
        const checkStudentData = localStorage.getItem("studentInformations");
        if (checkStudentData)
            setTimeout(() => { window.location.href = "student.html"; }, 500);
        else
            studentSinin.style.display = "block";

    })

    studentSinout.addEventListener("click", function () {
        studentSinin.style.display = "none";
    })

    studentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const studentName = document.getElementById("student_username").value.trim();
        const studentEmail = document.getElementById("student_email").value.trim();
        const studentPassword = document.getElementById("student_password").value.trim();
        const studentPhone = document.getElementById("student_phone").value.trim();
        const studentCampus = document.getElementById("student_campus").value.trim();
        const studentAge = Number(document.getElementById("student_age").value);

        if (!studentName || !studentEmail || !studentPhone || !studentCampus || !studentAge || !studentPassword)
            return showMessage(badMessag, "Please fill all fileds");

        if (studentAge < 18)
            return showMessage(badMessag, "Age must be 20 or older");


        if (!emailRegex.test(studentEmail))
            return showMessage(badMessag, "Invalid email address");


        if (!phoneRegex.test(studentPhone))
            return showMessage(badMessag, "Invalid phone number");
        if (!passwordRegex.test(studentPassword))
            return showMessage(badMessag, "Invalid password (1 uppercase, 1 digit, 6+ chars)")


        let studentsInformation = { studentName, studentEmail, studentPhone, studentCampus, studentAge };

        localStorage.setItem("studentInformations", JSON.stringify(studentsInformation));

        showMessage(goodMessag, "Sign-in successful!");

        setTimeout(() => { window.location.href = "student.html"; }, 1000);
    })
}

function affichehomeinformation() {
    let LocalStorageInfo = JSON.parse(localStorage.getItem("information"));

    LocalStorageInfo.forEach((information) => {
        displayStudentInformation(information)
    })

    function displayStudentInformation(information) {
        let studentHomeInfo = document.createElement("div")
        studentHomeInfo.className = "formation-card";
        studentHomeInfo.innerHTML = `
                    <h3>${information.theme}</h3>
                    <p><strong>Duration:</strong> ${information.duration} hours</p>
                    <p><strong>Trainer:</strong> ${information.trainer} </p>
                    <p><strong>Capacity:</strong> ${information.capacity} participants</p>
                    <p><strong>Enrolled:</strong> ${information.participants.length} participants</p>
                    <p><strong>Completion rate:</strong>${~~((information.participants.length * 100) / information.capacity)}%</p>
                    <a href="#" class="register-btn">Enroll</a>
        `
        homeINformation.appendChild(studentHomeInfo);
    }
}





const evenement = "evenement";
let evenemenCard = document.getElementById("evenemen_card");
document.addEventListener("DOMContentLoaded", () => {
    affichagerEvenement(); 
});
function getData() {
  let eventData = localStorage.getItem(evenement);
  return eventData ? JSON.parse(eventData) : [];
}
function saveEvent(newEvent) {
  let eventData = getData();
  eventData.push(newEvent);
  localStorage.setItem(evenement, JSON.stringify(eventData));
}
console.log(getData());
function affichagerEvenement() {
  let events = getData();
  evenemenCard.innerHTML = "";
  if (events.length === 0) {
    evenemenCard.innerHTML = `<h2>Aucun evenement sauvegarde</h2>`;
    return;
  }
  events.forEach((event) => {
    const eventCard = document.createElement("div");
    eventCard.className = "event-card";

    const Cardcontent = `<div class="card-info">
      <h3>Club: ${event.title || "Sans titre"}</h3>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <p><strong>Type:</strong> ${event.type}</p>
      <p><strong>Description:</strong> ${event.description}</p>
    `;

    let contentType = "";
    const type = event.type ? event.type.trim().toLowerCase() : "";
    let id = event.id;
    if (type === "conference") {
      contentType = `
        <p><strong>Speaker:</strong> ${event.speaker}</p>
        <p><strong>Duration:</strong> ${event.duration}</p>
        <p><strong>Registration Link:</strong> <a href="${event.registrationLink}" target="_blank">Lien</a></p>
         </div>
        
        </div>
      `;
    } else if (type === "atelier") {
      contentType = `
        <p><strong>materials:</strong> ${event.materials}</p>
        <p><strong>skillLevel:</strong> ${event.skillLevel}</p>
        <p><strong>maxParticipants:</strong> ${event.maxParticipants}</p>
        </div>
      
         </div>
      `;
    } else if (type === "club") {
      contentType = `
        <p><strong>frequency:</strong> ${event.frequency}</p>
        <p><strong>Skill contact:</strong> ${event.contact}</p>
        <p><strong>Max membershipFee:</strong> ${event.membershipFee}</p>
        </div>
      
         </div>
      `;
    } else if (type === "autre") {
      contentType = `
        <p><strong>customFieldLabel:</strong> ${event.customFieldLabel}</p>
        <p><strong>Skill customFieldValue:</strong> ${event.customFieldValue}</p>
        </div>
        
         </div>
      `;
    }

    eventCard.innerHTML = Cardcontent + contentType;
    evenemenCard.appendChild(eventCard);
  });
}

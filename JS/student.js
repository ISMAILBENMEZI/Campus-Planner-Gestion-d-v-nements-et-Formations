const studentINformation = document.getElementById("formation_cards");
console.log(studentINformation)
document.addEventListener('DOMContentLoaded', function () {
    studentINformation.innerHTML = "";
    affichestudentInformation();
})


function affichestudentInformation() {
    let localStorageStudent = JSON.parse(localStorage.getItem("information"));

    localStorageStudent.forEach((information) => {
        dispalystudentInformation(information);
    })

    function dispalystudentInformation(information) {
        let NewStudentCard = document.createElement("div");
        NewStudentCard.className = "formations-card";
        NewStudentCard.innerHTML = `
                    <h3>${information.theme}</h3>
                    <p><strong>Duration:</strong> ${information.duration} hours</p>
                    <p><strong>Trainer:</strong> ${information.trainer} </p>
                    <p><strong>Capacity:</strong> ${information.capacity} participants</p>
                    <p><strong>Enrolled:</strong> ${information.participants.length} participants</p>
                    <p><strong>Completion rate:</strong>${~~((information.participants.length * 100) / information.capacity)}%</p>
                    <a href="#" class="register-btn">Enroll</a>
        `
        studentINformation.appendChild(NewStudentCard);
    }
}
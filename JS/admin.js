
const adminFormationCard = document.getElementById("admin_formation_card");

document.addEventListener('DOMContentLoaded', function () {
    const checkAdminJson = JSON.parse(localStorage.getItem("information"));
    if (!checkAdminJson) {
        adminJsonInformation();
    }
    adminFormationCard.innerHTML = "";
    afficheAdmininformation();
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

async function adminJsonInformation() {
    fetch("../data/formations.json").then((res) => {
        if (res.ok)
            return res.json();
    }).then((data) => {
        localStorage.setItem("information", JSON.stringify(data));
    })
}

const formationAdminForm = document.getElementById("formation_form");
const saveAdminFormation = document.getElementById("save_input_formation");

function AddNewInformationCards() {
    if (saveAdminFormation.textContent == "Save Formation") {
        const theme = document.getElementById("theme").value.trim();
        const duration = document.getElementById("duration").value.trim();
        const trainer = document.getElementById("trainer").value.trim();
        const capacity = document.getElementById("capacity").value.trim();
        const participants = document.getElementById("participants").value.trim().split(/\s+/);
        let id = Math.random().toString(36).substr(2, 6);
        if (!theme || !duration || !trainer || !capacity || !participants)
            return showMessage(badMessag, "Please fill all fileds");
        if (participants.length > capacity)
            return showMessage(badMessag, "The number of participants is greater than the capacity.");

        let addInformation = { id, theme, duration, trainer, capacity, participants }
        let addNewInformation = JSON.parse(localStorage.getItem("information")) || [];
        let find = 0;
        addNewInformation.forEach((element) => {
            if (element.theme === addInformation.theme)
                return find = 1;
        })
        if (find === 0) {
            addNewInformation.push(addInformation);
            localStorage.setItem("information", JSON.stringify(addNewInformation));
            showMessage(goodMessag, "Sign-in successful!");
        }
        else {
            showMessage(badMessag, "You have already entered this information before!");
        }
        formationAdminForm.reset()
        adminFormationCard.innerHTML = "";
        afficheAdmininformation();
    }
}

formationAdminForm.addEventListener("submit", function (e) {
    e.preventDefault();
    AddNewInformationCards();
})

function afficheAdmininformation() {
    let laocalStorageAffiche = JSON.parse(localStorage.getItem("information"));
    laocalStorageAffiche.forEach((element) => {
        dispalyadmininformation(element);
    })
    function dispalyadmininformation(information) {
        let formation_card = document.createElement("div");
        formation_card.className = "formation-card";
        formation_card.innerHTML = `
                    <h3>${information.theme}</h3>
                    <p><strong>Duration:</strong> ${information.duration} hours</p>
                    <p><strong>Trainer:</strong> ${information.trainer} </p>
                    <p><strong>Capacity:</strong> ${information.capacity} participants</p>
                    <p><strong>Enrolled:</strong> ${information.participants.length} participants</p>
                    <p><strong>Completion rate:</strong>${~~((information.participants.length * 100) / information.capacity)}%</p>
                    <div>
                        <a href="#" class="register-btn">Enroll</a>
                        <button type="submit" id="delet_information" onclick="suprimeInformation('${information.id}')">Supprime</button>
                        <button type="submit" id="edite_information" onclick="editeAdminInformation('${information.id}')">Modifier</button>
                    </div>
        `
        adminFormationCard.appendChild(formation_card);
    }
}

function suprimeInformation(id) {
    let InformationLocalStorige = JSON.parse(localStorage.getItem("information"));
    let suprimeObject = InformationLocalStorige.filter((e) => e.id !== id);
    localStorage.setItem("information", JSON.stringify(suprimeObject));
    adminFormationCard.innerHTML = "";
    afficheAdmininformation();
}

function editeAdminInformation(id) {
    let InformationLocalStorige = JSON.parse(localStorage.getItem("information"));
    let editeObject = InformationLocalStorige.find((e) => e.id === id);
    participants.value = editeObject.participants;
    capacity.value = editeObject.capacity;
    trainer.value = editeObject.trainer;
    duration.value = editeObject.duration;
    theme.value = editeObject.theme;
    saveAdminFormation.textContent = "Modifier";

    formationAdminForm.onsubmit = function (e) {
        e.preventDefault();
        if (saveAdminFormation.textContent == "Modifier") {
            console.log("hello")
            suprimeInformation(id)
            adminFormationCard.innerHTML = "";
            afficheAdmininformation();
            saveAdminFormation.textContent = "Save Formation";
            AddNewInformationCards();
            showMessage(goodMessag, "Les informations ont été modifiées avec succès.");
        }
    }
}

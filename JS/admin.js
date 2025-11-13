
const adminFormationCard = document.getElementById("admin_formation_card");

document.addEventListener("DOMContentLoaded", () => {
      const checkAdminJson = JSON.parse(localStorage.getItem("information"));
    if (checkAdminJson.length == 0) {
        adminJsonInformation();
    }
    adminFormationCard.innerHTML = "";
    afficheAdmininformation();
  let events = getData();
  formEvent.addEventListener("submit", AjouterEvent);
  typeForm.addEventListener("input", selectedTypeEvent);
  sauvgarde.addEventListener("click", () => {
    if (sauvgarde.innerHTML === "Medifier") { 
      AjouterEvent;
      supprimerEvent(idMd);
    }
  });
  if (events.length === 0) {
    chargerJSON();
  } else {
    affichagerEvenement();
  }
  async function chargerJSON() {
    try {
      const response = await fetch("../data/evenements.json");
      if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
      const data = await response.json();
      data.forEach((item) => saveEvent(item));
      affichagerEvenement();
    } catch (error) {
      console.error("Erreur lors du chargement du JSON :", error.message);
    }
  }
});

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
            suprimeInformation(id)
            adminFormationCard.innerHTML = "";
            afficheAdmininformation();
            saveAdminFormation.textContent = "Save Formation";
            AddNewInformationCards();
            showMessage(goodMessag, "Les informations ont été modifiées avec succès.");
        }
    }
}

let formEvent = document.getElementById("event_form");
let adminvent = document.getElementById("admin-event");
let formInput = document.getElementById("card-content");
let typeForm = document.getElementById("type");
let sauvgarde = document.getElementById("save_event");
const evenement = "evenement";
var id = 6;
var idMd;

function getData() {
  let eventData = localStorage.getItem(evenement);
  return eventData ? JSON.parse(eventData) : [];
}

function saveEvent(newEvent) {
  let eventData = getData();
  eventData.push(newEvent);
  localStorage.setItem(evenement, JSON.stringify(eventData));
}

function selectedTypeEvent() {
  let typeEvent = document.getElementById("type");
  let type = typeEvent.value ? typeEvent.value.trim().toLowerCase() : "";
  console.log(id);
  if (type === "conference") {
    formInput.innerHTML = `
        <label for="speaker">speaker</label>
        <input type="text" name="speaker" id="speaker" placeholder="Enter speaker" >
        <label for="duration">duration</label>
        <input type="number" name="duration" id="duration" placeholder="Enter duration" >
        <label for="registrationLink">registrationLink</label>
        <input type="text" name="registrationLink" id="registrationLink" placeholder="Enter registrationLink" >  
      `;
  } else if (type === "atelier") {
    formInput.innerHTML = `
        <label for="materials">materials</label>
        <input type="text" name="materials" id="materials" placeholder="Enter materials" >
        <label for="skillLevel">skillLevel</label>
        <input type="text" name="skillLevel" id="skillLevel" placeholder="Enter skillLevel" >
        <label for="maxParticipants">maxParticipants</label>
        <input type="number" name="maxParticipants" id="maxParticipants" placeholder="Enter maxParticipants" >  
      `;
  } else if (type === "club") {
    formInput.innerHTML = `
        <label for="frequency">frequency</label>
        <input type="text" name="frequency" id="frequency" placeholder="Enter frequency" >
        <label for="contact">contact</label>
        <input type="text" name="contact" id="contact" placeholder="Enter contact" >
        <label for="membershipFee">membershipFee</label>
        <input type="number" name="membershipFee" id="membershipFee" placeholder="Enter membershipFee" >  
      `;
  } else if (type === "autre") {
    formInput.innerHTML = `
        <label for="customFieldLabel">customFieldLabel</label>
        <input type="text" name="customFieldLabel" id="customFieldLabel" placeholder="Enter customFieldLabel" >
        <label for="customFieldValue">customFieldValue</label>
        <input type="text" name="customFieldValue" id="customFieldValue" placeholder="Enter customFieldValue" >
      `;
  } else {
    formInput.innerHTML = "";
  }
}

function AjouterEvent(e) {
  e.preventDefault();
  let myInputs = e.target.querySelectorAll("input,textarea,select");
  let nouvelEvent = {};
  nouvelEvent.id = "evt_" + id++;
  myInputs.forEach((input) => {
    console.log(input.name);
    console.log(input.value);
    nouvelEvent[input.name] = input.value;
  });
  saveEvent(nouvelEvent);
  affichagerEvenement();
  formEvent.reset();
  formInput.innerHTML = "";
  sauvgarde.innerHTML = "";
  sauvgarde.innerHTML = "Save";
}
function affichagerEvenement() {
  let events = getData();
  adminvent.innerHTML = "";
  if (events.length === 0) {
    adminvent.innerHTML = `<h2>Aucun evenement sauvegarde</h2>`;
    return;
  }
  events.forEach((event) => {
    const eventCard = document.createElement("div");
    eventCard.className = "event-card";

    const Cardcontent = `<div class="card-info">
      <h3>Club: ${event.title}</h3>
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
         <div class="btn-card">
         <button class="btn-md" onclick="reblisageForm('${event.id}')">Modifier</button>
         <button class="btn-sp" onclick="supprimerEvent('${event.id}')">Supprimer</button>
         </div>
        </div>
      `;
    } else if (type === "atelier") {
      contentType = `
        <p><strong>materials:</strong> ${event.materials}</p>
        <p><strong>skillLevel:</strong> ${event.skillLevel}</p>
        <p><strong>maxParticipants:</strong> ${event.maxParticipants}</p>
        </div>
        <div class="btn-card">
         <button class="btn-md" onclick="reblisageForm('${event.id}')">Modifier</button>
         <button class="btn-sp" onclick="supprimerEvent('${event.id}')">Supprimer</button>
         </div>
         </div>
      `;
    } else if (type === "club") {
      contentType = `
        <p><strong>frequency:</strong> ${event.frequency}</p>
        <p><strong>Skill contact:</strong> ${event.contact}</p>
        <p><strong>Max membershipFee:</strong> ${event.membershipFee}</p>
        </div>
        <div class="btn-card">
         <button class="btn-md" onclick="reblisageForm('${event.id}')">Modifier</button>
         <button class="btn-sp" onclick="supprimerEvent('${event.id}')">Supprimer</button>
         </div>
         </div>
      `;
    } else if (type === "autre") {
      contentType = `
        <p><strong>customFieldLabel:</strong> ${event.customFieldLabel}</p>
        <p><strong>Skill customFieldValue:</strong> ${event.customFieldValue}</p>
        </div>
        <div class="btn-card">
         <button class="btn-md" onclick="reblisageForm('${event.id}')">Modifier</button>
         <button class="btn-sp" onclick="supprimerEvent('${event.id}')">Supprimer</button>
         </div>
         </div>
      `;
    }

    eventCard.innerHTML = Cardcontent + contentType;
    adminvent.appendChild(eventCard);
  });
}
function supprimerEvent(id) {
  let events = getData();
  let newEvent = events.filter((e) => e.id !== id);
  localStorage.setItem(evenement, JSON.stringify(newEvent));
  affichagerEvenement();
}
function reblisageForm(id) {
  let inputReplir = formEvent.querySelectorAll("input,textarea,select");
  let formule = [];
  idMd = id;
  inputReplir.forEach((input) => {
    formule = input.value;
  });
  if (formule) {
    alert("sauvgarde la formule");
  } else {
    modifierEvent(idMd);
  }
}
function modifierEvent(id) {
  sauvgarde.innerHTML = "";
  sauvgarde.innerHTML = "Medifier";
  let events = getData();
  let newEvent = events.find((e) => e.id === id);
  document.getElementById("title").value = newEvent.title;
  document.getElementById("date").value = newEvent.date;
  document.getElementById("location").value = newEvent.location;
  document.getElementById("description").value = newEvent.description;
  document.getElementById("type").value = newEvent.type;
  let type = newEvent.type ? newEvent.type.trim().toLowerCase() : "";
  if (type === "conference") {
    formInput.innerHTML = `
        <label for="speaker">speaker</label>
        <input type="text" name="speaker" id="speaker" placeholder="Enter speaker" value="${newEvent.speaker}">
        <label for="duration">duration</label>
        <input type="text" name="duration" id="duration" placeholder="Enter duration" value="${newEvent.duration}">
        <label for="registrationLink">registrationLink</label>
        <input type="text" name="registrationLink" id="registrationLink" placeholder="Enter registrationLink" value="${newEvent.registrationLink}">
         
      `;
  } else if (type === "atelier") {
    formInput.innerHTML = `
        <label for="materials">materials</label>
        <input type="text" name="materials" id="materials" placeholder="Enter materials" value="${newEvent.materials}">
        <label for="skillLevel">skillLevel</label>
        <input type="text" name="skillLevel" id="skillLevel" placeholder="Enter skillLevel" value="${newEvent.skillLevel}">
        <label for="maxParticipants">maxParticipants</label>
        <input type="text" name="maxParticipants" id="maxParticipants" placeholder="Enter maxParticipants" value="${newEvent.maxParticipants}"> 
      `;
  } else if (type === "club") {
    formInput.innerHTML = `
        <label for="frequency">frequency</label>
        <input type="text" name="frequency" id="frequency" placeholder="Enter frequency" value="${newEvent.frequency}">
        <label for="contact">contact</label>
        <input type="text" name="contact" id="contact" placeholder="Enter contact" value="${newEvent.contact}">
        <label for="membershipFee">membershipFee</label>
        <input type="text" name="membershipFee" id="membershipFee" placeholder="Enter membershipFee" value="${newEvent.membershipFee}">
         
       `;
  } else if (type === "autre") {
    formInput.innerHTML = `
        <label for="customFieldLabel">customFieldLabel</label>
        <input type="text" name="customFieldLabel" id="customFieldLabel" placeholder="Enter customFieldLabel" value="${newEvent.customFieldLabel}">
        <label for="customFieldValue">customFieldValue</label>
        <input type="text" name="customFieldValue" id="customFieldValue" placeholder="Enter customFieldValue" value="${newEvent.customFieldValue}">
       `;
  }
}

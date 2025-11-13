let formEvent = document.getElementById("event_form");
let adminvent = document.getElementById("admin-event");
let formInput = document.getElementById("card-content");
let typeForm = document.getElementById("type");
let sauvgarde = document.getElementById("save_event");
const evenement = "evenement";
var id = 6;
var idMd;

document.addEventListener("DOMContentLoaded", () => {
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

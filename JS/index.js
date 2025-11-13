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
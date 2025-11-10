// // let arr  = [];
// // const l7ya = (callback) => {
// //     fetch("https://simplonline-v3-prod.s3.eu-west-3.amazonaws.com/media/file/json/evenements-69086d33d21e2465419657.json").then((res) => res.json()).then((dat)=> arr = Array.from(dat))
// // }

// // l7ya();

// let arr = [
//   {
//     "id": "evt_1",
//     "title": "Conférence: IA et Éducation",
//     "date": "2026-01-15",
//     "location": "Amphi A",
//     "type": "conférence",
//     "description": "Impact de l'IA sur les méthodes d'enseignement.",
//     "speaker": "Dr. Marie Dupont",
//     "duration": 60,
//     "registrationLink": "https://example.com/ia-education"
//   },
//   {
//     "id": "evt_2",
//     "title": "Atelier: Git & GitHub",
//     "date": "2025-12-10",
//     "location": "Salle 204",
//     "type": "atelier",
//     "description": "Pratique collaborative avec Git.",
//     "materials": "Ordinateur portable, Git installé",
//     "skillLevel": "débutant",
//     "maxParticipants": 25
//   },
//   {
//     "id": "evt_3",
//     "title": "Club: Coding Dojo",
//     "date": "2025-12-05",
//     "location": "Lab 3",
//     "type": "club",
//     "description": "Sessions de katas et revues de code.",
//     "frequency": "hebdomadaire",
//     "contact": "Alice Martin <alice@campus.edu>",
//     "membershipFee": 0
//   },
//   {
//     "id": "evt_4",
//     "title": "Soirée Hackathon Warmup",
//     "date": "2025-11-28",
//     "location": "Espace Innov",
//     "type": "autre",
//     "description": "Préparation au hackathon annuel.",
//     "customFieldLabel": "Dress code",
//     "customFieldValue": "Casual"
//   },
//   {
//     "id": "evt_5",
//     "title": "Conférence: Sécurité Web Moderne",
//     "date": "2026-02-02",
//     "location": "Amphi B",
//     "type": "conférence",
//     "description": "OWASP Top 10 et bonnes pratiques.",
//     "speaker": "Jean-Pierre Lefèvre",
//     "duration": 90,
//     "registrationLink": "https://example.com/sec-web"
//   }
// ]

// const form = document.getElementById("from_evenment");

// arr.forEach((subarr) => {
//     if (subarr.type === "autre"){
//         // form.innerHTML = "";
//         Object.entries(subarr).forEach(([key, val], ind) => {
//             if (ind > 4) {
//                 console.log(ind)
//                 let input = document.createElement("input");
//                 let ph = (key.match(/[A-Z]/g) || []).forEach(letter => {
//                     let joined = key;
//                     let splitted = joined.split(letter);
//                     joined = splitted.join(" ");
//                 }) || key;
//                 input.placeholder = ph;
//                 input.type = (typeof val) === "string"? "text" : "number";
//                 form.appendChild(input);
//             }
//         })
//     }
// })
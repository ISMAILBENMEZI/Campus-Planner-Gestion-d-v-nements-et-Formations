const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");

lettersArray.forEach(letter => {
  let span = document.createElement("span");
  span.textContent = letter;
  span.className = 'letter-box';
  lettersContainer.appendChild(span);
});

const words = {
  programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
  movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
  people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
};

const maxAttempts = 8;
let wrongAttempts = 0;
let randomValueValue;
let guessSpans;
const attemptsDisplay = document.createElement("div");
attemptsDisplay.className = "attempts";
document.body.appendChild(attemptsDisplay);

function newGame() {
  wrongAttempts = 0;
  attemptsDisplay.textContent = `Essais restants : ${maxAttempts}`;

  lettersContainer.querySelectorAll(".letter-box").forEach(span => {
    span.classList.remove("clicked");
  });

  document.querySelectorAll(".letters-guess span").forEach(span => span.remove());
  document.querySelector(".popup")?.remove();

  let allKeys = Object.keys(words);
  let randomPropName = allKeys[Math.floor(Math.random() * allKeys.length)];
  let randomPropValue = words[randomPropName];
  randomValueValue = randomPropValue[Math.floor(Math.random() * randomPropValue.length)];
  document.querySelector(".game-info .category span").textContent = randomPropName;

  let lettersGuessContainer = document.querySelector(".letters-guess");
  Array.from(randomValueValue).forEach(letter => {
    let emptySpan = document.createElement("span");
    if (letter === ' ') emptySpan.className = 'with-space';
    lettersGuessContainer.appendChild(emptySpan);
  });

  guessSpans = document.querySelectorAll(".letters-guess span");
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains('letter-box') && !e.target.classList.contains('clicked')) {
    e.target.classList.add("clicked");
    let theClickedLetter = e.target.textContent.toLowerCase();
    let theChosenWord = Array.from(randomValueValue.toLowerCase());
    let correct = false;

    theChosenWord.forEach((letter, index) => {
      if (theClickedLetter === letter) {
        guessSpans[index].textContent = theClickedLetter;
        correct = true;
      }
    });

    if (!correct) {
      wrongAttempts++;
      attemptsDisplay.textContent = `Essais restants : ${maxAttempts - wrongAttempts}`;
      if (wrongAttempts === maxAttempts) endGame(false);
    } else if (checkWin()) {
      endGame(true);
    }
  }
});

function checkWin() {
  return Array.from(guessSpans).every(span => span.textContent !== "");
}

function endGame(win) {
  let div = document.createElement("div");
  div.className = 'popup';
  div.textContent = win ? `Bravo ! Tu as trouvé le mot : ${randomValueValue}` : `Game Over Le mot était : ${randomValueValue}`;
  document.body.appendChild(div);
}

const button = document.createElement("button");
button.textContent = "Changer de catégorie";
button.className = "change-category";
button.addEventListener("click", newGame);
document.body.appendChild(button);
newGame();



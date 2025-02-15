let currentWordIndex = 0;
let timeLimit = 10;
let timerInterval;
let timeLeft;
let incorrectQuestions = [];

let gameLevel = localStorage.getItem("gameLevel");

if (gameLevel === "easy") {
  timeLimit = 15;
} else if (gameLevel === "medium") {
  timeLimit = 10;
} else if (gameLevel === "hard") {
  timeLimit = 5;
}


function startTimer() {
    clearInterval(timerInterval);
  
    timeLeft = timeLimit;
    document.getElementById("timeLeft").textContent = timeLeft;
    timerInterval = setInterval(function () {
      timeLeft--;
      document.getElementById("timeLeft").textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        checkAnswer();
      }
    }, 1000);
  }

function loadImages() {
  const imagesDiv = document.getElementById("images");
  const lettersDiv = document.getElementById("letters");
  const selectedLettersDiv = document.getElementById("selectedLetters");

  imagesDiv.innerHTML = "";
  lettersDiv.innerHTML = "";
  selectedLettersDiv.innerHTML = "";

  const currentWord = words[currentWordIndex];
  const correctWord = currentWord.answer;
  const allLetters = getShuffledLetters(correctWord);

  currentWord.images.forEach((img) => {
    const imageElement = document.createElement("img");
    imageElement.src = img;
    imagesDiv.appendChild(imageElement);
  });

  allLetters.forEach((letter) => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.onclick = function () {
      selectLetter(letter);
    };
    lettersDiv.appendChild(button);
  });

 // startTimer();
}

function getShuffledLetters(word) {
  const wordArray = word.split("");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const randomLetters = [];
  
  while (randomLetters.length < word.length + 5) {
    randomLetters.push(letters[Math.floor(Math.random() * letters.length)]);
  }

  randomLetters.push(...wordArray);
  return randomLetters.sort(() => Math.random() - 0.5);
}

function selectLetter(letter) {
  const selectedLettersDiv = document.getElementById("selectedLetters");
  const selectedLetterBtn = document.createElement("span");
  selectedLetterBtn.textContent = letter;
  selectedLettersDiv.appendChild(selectedLetterBtn);
  

  const button = [...document.getElementById("letters").children].find(b => b.textContent === letter);
  button.disabled = true;
}

document.getElementById("submitBtn").addEventListener("click", checkAnswer);

function checkAnswer() {
  const userInput = [...document.getElementById("selectedLetters").children].map(span => span.textContent).join("").toLowerCase();
  const currentWord = words[currentWordIndex].answer.toLowerCase();
  const message = document.getElementById("message");

  if (userInput === currentWord) {
    message.textContent = "Correct ! 🎉";
    currentWordIndex++;
    if (currentWordIndex < words.length) {
      loadImages();
    } else {
      document.getElementById("gamer").setAttribute("hidden", "");
      document.getElementById('felicitation').innerHTML = "<h1> Félicitations, vous avez terminé le jeu ! 🏆 </h1>";
      message.textContent = "Félicitations, vous avez terminé le jeu ! 🏆";
      document.getElementById("resetBtn").style.display = "block";
    }
  } else {
    message.textContent = "Incorrect, essayez encore. ❌";
    resetLetters();
  }
}

function resetLetters() {
  const selectedLettersDiv = document.getElementById("selectedLetters");
  [...selectedLettersDiv.children].forEach(child => child.remove());
  const lettersDiv = document.getElementById("letters");
  [...lettersDiv.children].forEach(button => button.disabled = false);
}

document.getElementById("resetBtn").addEventListener("click", resetGame);

function resetGame() {
  currentWordIndex = 0;
  incorrectQuestions = [];
  document.getElementById("incorrectQuestions").innerHTML = "";
  document.getElementById("resetBtn").style.display = "none";
  loadImages();
  document.getElementById("message").textContent = "";
  document.getElementById("timeLeft").textContent = "";
  document.getElementById("gamer").removeAttribute("hidden");
}

loadImages();

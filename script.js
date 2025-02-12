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

console.log("Niveau du jeu:", gameLevel);

function loadImages() {
  const imagesDiv = document.getElementById("images");
  imagesDiv.innerHTML = "";
  const currentWord = words[currentWordIndex];

  currentWord.images.forEach((img) => {
    const imageElement = document.createElement("img");
    imageElement.src = img;
    imagesDiv.appendChild(imageElement);
  });

  startTimer();
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

document.getElementById("submitBtn").addEventListener("click", checkAnswer);

function checkAnswer() {
  const userInput = document.getElementById("userInput").value.toLowerCase();
  const currentWord = words[currentWordIndex].answer.toLowerCase();
  const message = document.getElementById("message");

  if (userInput === currentWord) {
    message.textContent = "Correct ! 🎉";
    currentWordIndex++;
    if (currentWordIndex < words.length) {
      loadImages();
      document.getElementById("userInput").value = "";
    } else {
      document.getElementById("gamer").setAttribute("hidden", "");
      document.getElementById('felicitation').innerHTML = "<h1> Félicitations, vous avez terminé le jeu ! 🏆 </h1>";
      document.getElementById("felicitation").innerHTML +=
      '<br><br> <br><br> <button id="Recommercer" onclick="Recommercer()">Recommercer</button>';
      message.textContent = "Félicitations, vous avez terminé le jeu ! 🏆";
      document.getElementById("resetBtn").style.display = "block";

     generateLights();
     generateSnowflakes();
     setInterval(2000);
    }
  } else {
    message.textContent = "Incorrect, essayez encore. ❌";
    incorrectQuestions.push(words[currentWordIndex]);
    currentWordIndex++;
    if (currentWordIndex < words.length) {
      loadImages();
      document.getElementById("userInput").value = "";
    } else {
      document.getElementById("gamer").setAttribute("hidden", "");
      document.getElementById("incorrectQuestions").removeAttribute("hidden");
      document.getElementById("resetBtn").style.display = "block";
      document.getElementById("incorrectQuestions").innerHTML =
        "<strong>Questions Incorrectes:</strong><br>" +
        incorrectQuestions.map((q) => q.answer).join("<br>");
      document.getElementById("incorrectQuestions").innerHTML +=
        '<br><br> <br><br> <button id="Recommercer" onclick="Recommercer()">Recommercer</button>';
    }
  }
}
function Recommercer() {
    let recommercer = "true"; 

    localStorage.setItem('recommercer', recommercer);

    window.location.href = './index.html';
}

document.getElementById("resetBtn").addEventListener("click", resetGame);

function resetGame() {
  currentWordIndex = 0;
  incorrectQuestions = [];
  document.getElementById("incorrectQuestions").innerHTML = "";
  document.getElementById("resetBtn").style.display = "none";
  loadImages();
  document.getElementById("userInput").value = "";
  document.getElementById("message").textContent = "";
  document.getElementById("timeLeft").textContent = "";
  document.getElementById("gamer").removeAttribute("hidden");
}

loadImages();


function generateSnowflakes() {
    const snowContainer = document.getElementById("snow");
    const numFlakes = 5;

    for (let i = 0; i < numFlakes; i++) {
      const snowflake = document.createElement("span");
      snowflake.textContent =["🌸", "⭐", "🎉",  "❄","🏆"];
      snowflake.classList.add("snowflake");
      snowflake.style.left = `${Math.random() * 100}vw`;
      snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`;
      snowflake.style.animationDelay = `${Math.random() * 5}s`;
      snowContainer.appendChild(snowflake);
    }
  }


  function generateLights() {
    const lightsContainer = document.createElement("div");
    lightsContainer.classList.add("lights");
    document.body.appendChild(lightsContainer);

    const numLights = 150;
    for (let i = 0; i < numLights; i++) {
      const light = document.createElement("div");
      light.classList.add("light");
      light.style.left = `${Math.random() * 100}vw`;
      light.style.top = `${Math.random() * 100}vh`;
      light.style.animationDuration = `${Math.random() * 1 + 2}s`;
      light.style.animationDelay = `${Math.random() * 2}s`;
      light.style.backgroundColor = `hsl(${
        Math.random() * 360
      }, 100%, 80%)`;
      lightsContainer.appendChild(light);
    }
  }




/*document.getElementById('level').addEventListener('change', function() {
    const level = this.value;
    if (level === 'easy') {
        timeLimit = 15; 
    } else if (level === 'medium') {
        timeLimit = 10;
    } else if (level === 'hard') {
        timeLimit = 5; 
    }
    resetGame();
}); */

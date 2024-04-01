let availableImages = []; // Array to store available image filenames
let changeBackgroundCounter = 0;
let currentImageIndex = 0; // Variable to track the current image index
const totalImages = 11; // เปลี่ยนจำนวนรูปทั้งหมดที่นี่

// Function to initialize available images
function initializeAvailableImages() {
  availableImages = [];
  for (let i = 1; i <= totalImages; i++) {
    availableImages.push(`${i}.jpg`);
  }
}

// Initialize available images
initializeAvailableImages();
const container = document.getElementById("container");
const pieces = document.querySelectorAll(".piece");
let timer;
let countdown = 15; // Initial countdown value in seconds
let previousImage = null; // To store the previously selected image

// Function to increase the score of a player
function increaseScore(index) {
  const scoreCell = document.getElementById(`score${index}`);
  let score = parseInt(scoreCell.textContent);
  score++;
  scoreCell.textContent = score;
}

// Function to decrease the score of a player
function decreaseScore(index) {
  const scoreCell = document.getElementById(`score${index}`);
  let score = parseInt(scoreCell.textContent);
  if (score > 0) {
    score--;
    scoreCell.textContent = score;
  }
}

function getPlayerCount() {
  const leaderboardBody = document.getElementById("leaderboardBody");
  return leaderboardBody.children.length;
}

// Function to add a player to the leaderboard
function addPlayer() {
  const unitNameInput = document.getElementById("unitName");
  const playerName = unitNameInput.value.trim();

  // Check if the input field is empty
  if (playerName === "") {
    alert("กรุณากรอกชื่อผู้เล่น");
    return;
  }

  // Check the count of players before adding a new player
  const maxPlayers = 10; // Example: Maximum allowed players
  if (getPlayerCount() >= maxPlayers) {
    alert("ห้องเต็มเเล้วจร้ารอตาหน้านะ");
    return;
  }

  // Create a new row for the leaderboard table
  const leaderboardBody = document.getElementById("leaderboardBody");
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
  <th scope="row">${getPlayerCount() + 1}</th>
  <td>${playerName}</td>
  <td id="score${getPlayerCount() + 1}">0</td>
  <td>
      <button class="btn btn-primary btn-sm" onclick="increaseScore(${
        getPlayerCount() + 1
      })">+</button>
      <button class="btn btn-danger btn-sm" onclick="decreaseScore(${
        getPlayerCount() + 1
      })">-</button>
  </td>
`;

  // Append the new row to the leaderboard table
  leaderboardBody.appendChild(newRow);

  // Clear the input field after adding the player
  unitNameInput.value = "";
}

// Function to change the background image to the next image
function changeBackground() {
  if (availableImages.length > 0) {
    const nextImage = availableImages.shift(); // Take the first image from the array
    container.style.backgroundImage = `url("../../assets/image/${nextImage}")`;
  } else {
    window.location.href = "game-over.html";
  }
  revealAllRE();
}

// Function to reveal the complete image
// function revealImage() {
//   this.classList.add("hidden"); // Hide the clicked piece's background
//   timeLeft = 15; // Reset the timeLeft variable to 15 seconds
//   runTimer(document.querySelector(".timerCountDown"));
// }
function revealImage() {
  if (timeLeft <= 0) {
    this.classList.add("hidden");
    timeLeft = 15; // Hide the clicked piece's background
    runTimer(document.querySelector(".timerCountDown"));
  }
}

function giveUp() {
  timeLeft = 0;
}

function revealAllRE() {
  const timerElement = document.querySelector(".timerCountDown");
  timerElement.classList.remove("timerCountDownEnd"); // Remove the end class if present
  timeLeft = 0;
  const timeout = document.getElementById("timeout");
  const start = document.getElementById("start");
  start.classList.remove("d-none");
  timeout.classList.add("d-none");
  pieces.forEach((piece) => {
    piece.classList.remove("hidden");
  });
}

// Function to reveal all pieces
function revealAll() {
  timeLeft = 0;
  pieces.forEach((piece) => {
    piece.classList.add("hidden");
  });
}

let timeLeft = 0;
let timerCountDown = document.getElementById("timeLeft");

function isTimeLeft() {
  return timeLeft > -1;
}

function runTimer(timerElement) {
  const timerCircle = timerElement.querySelector("svg > circle + circle");
  timerElement.classList.add("animatable");
  timerCircle.style.strokeDashoffset = 1;
  const start = document.getElementById("start");
  const second = document.getElementById("second");
  const timeout = document.getElementById("timeout");
  const unit = document.getElementById("unit");
  let countdownTimer = setInterval(function () {
    if (isTimeLeft()) {
      timerElement.classList.remove("timerCountDownEnd");
      start.classList.add("d-none");
      second.classList.remove("d-none");
      timeout.classList.add("d-none");
      unit.classList.remove("d-none");
      const timeRemaining = timeLeft--;
      const normalizedTime = (15 - timeRemaining) / 15;
      timerCircle.style.strokeDashoffset = normalizedTime;
      timerCountDown.innerHTML = timeRemaining;
    } else {
      clearInterval(countdownTimer);
      timerElement.classList.remove("animatable");
      timerElement.classList.add("timerCountDownEnd");
      start.classList.add("d-none");
      second.classList.add("d-none");
      timeout.classList.remove("d-none");
      unit.classList.add("d-none");
    }
  }, 1000);
}
// Attach click event listener to each piece
pieces.forEach((piece) => {
  piece.addEventListener("click", revealImage);
});

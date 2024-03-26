let availableImages = []; // Array to store available image filenames
let changeBackgroundCounter = 0;

// Function to initialize available images
function initializeAvailableImages() {
  availableImages = [];
  for (let i = 1; i <= 11; i++) {
    availableImages.push(`${i}.jpg`);
  }
}

// Initialize available images
initializeAvailableImages();
const container = document.getElementById("container");
const pieces = document.querySelectorAll(".piece");
let timer;
let countdown = 10; // Initial countdown value in seconds
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

// Function to add a player to the leaderboard
function addPlayer() {
  const unitNameInput = document.getElementById("unitName");
  const playerName = unitNameInput.value.trim();

  // Check if the input field is empty
  if (playerName === "") {
    alert("Please enter a valid player name.");
    return;
  }

  // Create a new row for the leaderboard table
  const leaderboardBody = document.getElementById("leaderboardBody");
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
  <th scope="row">${leaderboardBody.children.length + 1}</th>
  <td>${playerName}</td>
  <td id="score${leaderboardBody.children.length + 1}">0</td>
  <td>
      <button class="btn btn-primary btn-sm" onclick="increaseScore(${
        leaderboardBody.children.length + 1
      })">+</button>
      <button class="btn btn-danger btn-sm" onclick="decreaseScore(${
        leaderboardBody.children.length + 1
      })">-</button>
  </td>
`;

  // Append the new row to the leaderboard table
  leaderboardBody.appendChild(newRow);

  // Clear the input field after adding the player
  unitNameInput.value = "";
}

// Function to get a random image
function getRandomImage() {
  if (availableImages.length === 0) {
    // If all images have been used, reset the available images
    initializeAvailableImages();
  }

  const randomIndex = Math.floor(Math.random() * availableImages.length);
  const randomImage = availableImages[randomIndex];
  availableImages.splice(randomIndex, 1); // Remove the selected image from available images
  return randomImage;
}

// Function to change the background image randomly
function changeBackground() {
  const countdownElement = document.getElementById("countdown");
  countdownElement.style.display = "none"; // Hide the countdown element
  const randomImage = getRandomImage();
  console.log("randomImage", randomImage);
  container.style.backgroundImage = `url("../../assets/image/${randomImage}")`;
  changeBackgroundCounter++; // Increment the counter
  pieces.forEach((piece) => {
    piece.classList.remove("hidden");
  });
  if (changeBackgroundCounter === 11) {
    // Display the Game Over popup after 11 times
    alert("รูปสุดท้ายเเล้วน้าาา");
    changeBackgroundCounter = 0; // Reset the counter
  }
}
// Function to reveal the complete image
function revealImage() {
  const countdownElement = document.getElementById("countdown");
  countdownElement.style.display = "block"; // Hide the countdown element
  this.classList.add("hidden"); // Hide the clicked piece's background
  resetTimer(); // Reset the timer
}
function revealAllRE() {
  const countdownElement = document.getElementById("countdown");
  countdownElement.style.display = "block"; // Hide the countdown element
  pieces.forEach((piece) => {
    piece.classList.remove("hidden");
  });
  resetTimer(); // Reset the timer
}
// Function to reveal all pieces
function revealAll() {
  const countdownElement = document.getElementById("countdown");
  countdownElement.style.display = "none"; // Hide the countdown element
  pieces.forEach((piece) => {
    piece.classList.add("hidden");
  });
  resetTimer(); // Reset the timer
}

// Function to start the countdown timer
function startTimer() {
  timer = setInterval(updateCountdown, 1000); // Call updateCountdown function every 1 second
}

// Function to update the countdown display
function updateCountdown() {
  document.getElementById(
    "countdown"
  ).textContent = `เหลือเวลาอีก: ${countdown} วินาที`;
  countdown--;
  if (countdown < 0) {
    clearInterval(timer);
    document.getElementById("countdown").textContent = "หมดเวลา!!!";
  }
}

// Function to reset the countdown timer
function resetTimer() {
  clearInterval(timer); // Clear the current timer
  countdown = 10; // Reset countdown value
  updateCountdown(); // Update countdown display
  startTimer(); // Start a new timer
}

// Attach click event listener to each piece
pieces.forEach((piece) => {
  piece.addEventListener("click", revealImage);
});

// Start the timer initially

const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const containerLogin = document.getElementById("containerLogin");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

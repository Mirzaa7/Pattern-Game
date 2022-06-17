var gamePattern = [];
var userClickedPattern = [];
var level = 0;

buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
  $("#level-title").text("Level " + level);     // Change the level title
  level++;
  var randomNumber = Math.floor(Math.random() * 4); // random number 0-3

  var randomColour = buttonColours[randomNumber];
  gamePattern.push(randomColour);                 // Add the random colour to the game pattern
  animatePress(randomColour);
  playSound(randomColour);            // Animate the press
  userClickedPattern = [];          // Clear the previous user pattern
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");   // Query for a certain colour id and add a active class to it
  setTimeout(restore, 100);

  function restore() {                        // After 100ms call the restore function that removes the added class
    $("#" + currentColour).removeClass("pressed");
  }
}

$(".btn").click(function () {           // Listen for a click on any button
  userClickedPattern.push(this.id);           // Add to the user created pattern
  console.log(userClickedPattern);
  animatePress(this.id);
  playSound(this.id);
  checkAnswer();
});

function gameIsOver() {
  $("body").addClass("game-over");        // Add a active class for game over state for 200ms
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  var gameOverSound = new Audio("wrong.mp3");
  gameOverSound.play();                           // Play the game over sound and change the h1 text
  $("h1").text("Game Over, Press Any Key To Restart");
  startOver();
}

function startOver() {
  level = 0;                    // Reset the level to 0
  gamePattern = [];             // Reset the patterns
  userClickedPattern = [];
}
function checkAnswer() {
  var gameOver = false;

  for (var i = 0; i < userClickedPattern.length; i++) {   // Check if the current user created pattern
    if (userClickedPattern[i] != gamePattern[i]) {        // matches the game pattern
      gameOver = true;
      break;
    }
  }

  if (gameOver) gameIsOver();
  else if (userClickedPattern.length === gamePattern.length) {
    setTimeout(nextSequence, 500);
  }
}

$(document).keydown(function () {     // Listen for key press
  if (level === 0) {
    nextSequence();       // Call the next sequence
  }
});

function playSound(randomColour) {
  switch (randomColour) {
    case "red":
      var redSound = new Audio("sounds/red.mp3");
      redSound.play();                              // Switch through cases of colours and play different sounds
      break;

    case "blue":
      var blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;

    case "green":
      var greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;

    case "yellow":
      var yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
      break;

    default:
      break;
  }
}

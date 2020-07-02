var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

// function to generate a random integer number within range
function randomGenerator(min, max) {
  if (min==null && max==null)
    return 0;

  if (max == null) {
      max = min;
      min = 0;
    }
  return min + Math.floor(Math.random() * (max - min + 1));
};

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
};

function nextSequence() {
  var randomNumber = randomGenerator(0, 3);
  var randomChosenColour = buttonColors[randomNumber];
  level++;
  $("#level-title").html("Level " + level);
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
};

function startOver() {

  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}

function checkAnswer(currentLevel) {
  sequenceLast = gamePattern[currentLevel - 1];
  userLast = userClickedPattern[currentLevel - 1];
  if (sequenceLast == userLast) {
    console.log("Yeah");

    if (gamePattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {
      console.log("AHHH");
      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      //2. Call startOver() if the user gets the sequence wrong.
      startOver();
  };
};

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  //Press Feedback
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(level);
  console.log(gamePattern);
  console.log(userClickedPattern);
});

$(document).on("keypress", function() {
  if (!started) {
    nextSequence();
    started = true;
  }
})

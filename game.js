var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
    userClickedPattern = []; 
    level++;
    $("h1").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        animatePress(userClickedPattern[currentLevel]);
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        
        startOver();
    }
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(color) {
    var audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
}

$(document).on("keypress", function() {
    if (!started) {
        nextSequence();
        started = true;
    }
});

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}



var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern =[];
var userClickedPattern = [];
var start="false";
var level = 0;
$(document).keypress(function(){
    if(start==="false"){
      $("#level-title").text("Level " + level);
      nextSequence();
      start="true";
    }
});

function startOver(){
    level=0;
    start="false";
    gamePattern=[];
}

function nextSequence(){
    userClickedPattern=[];
    level+=1;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#'+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
//  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    console.log(gamePattern);
    console.log(userClickedPattern);
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        console.log("succes");
        if(currentLevel+1==gamePattern.length){
            setTimeout(nextSequence(),1000);
        }
    }
    else
    {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass('game-over');
        setTimeout(function(){
            $("body").removeClass('game-over')
        },200);
        startOver();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
    }
}

function playSound(name){
    var audio = new Audio("sounds/"+name+'.mp3');
    audio.play();
}

function animatePress(currentColour){
    $('#'+currentColour).addClass('pressed');
    setTimeout(function() {
        $('#'+currentColour).removeClass('pressed');
    }, 100);
  
}




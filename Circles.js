// STATE VARIABLES
var gameActive = 0;
var smallCount = 0;
var mediumCount = 0;
var largeCount = 0;
var timePassed;

// ACTIVATE GAME
const play = e => {
  e.preventDefault();
  gameActive = 1;
  // REINITIALIZE STATE VARIABLES
  smallCount = 0;
  mediumCount = 0;
  largeCount = 0;
}

// DEACTIVATE GAME
function gameEnd () {
  // RESET GAME STATE VARIABLE
  gameActive = 0;
}

// CIRCLE GENERATION FUNCTIONS
function smallCircle () {
  // CREATE CIRCLE ELEMENT
  let small = document.createElement("span");
  // ADD CLASS TO CIRCLE
  smallClass = `small${smallCount}`
  small.className = smallClass;
  // INSERT CIRCLE + INCREASE COUNT
  let field = document.getElementById("field");
  document.body.appendChild(small, field);
  smallCount +=1;
}

function mediumCircle () {
  // CREATE CIRCLE ELEMENT
  let medium = document.createElement("span");
  // ADD CLASS TO CIRCLE
  mediumClass = `medium${mediumCount}`
  medium.className = mediumClass;
  // INSERT CIRCLE + INCREASE COUNT
  let field = document.getElementById("field");
  document.body.appendChild(medium, field);
  mediumCount +=1;
}

function largeCircle () {
  // CREATE CIRCLE ELEMENT
  let large = document.createElement("span");
  // ADD CLASS TO CIRCLE
  largeClass = `large${largeCount}`
  large.className = largeClass;
  // INSERT CIRCLE + INCREASE COUNT
  let field = document.getElementById("field");
  document.body.appendChild(large, field);
  largeCount +=1;
}

// TIMING FUNCTION
function timing () {
  window.setInterval((function(){
     let start = Date.now();
     timePassed = document.createTextNode('0');
     document.getElementById('timer').appendChild(timePassed);
     return function() {
          timePassed.data = Math.floor((Date.now()-start)/1000);
          };
     }()), 1000);
}

// CIRCLES PER SECOND FUNCTION
function generateCircles(circlesPerSecond) {
  
}

// ADDING EVENT LISTENER TO PLAY BUTTONS
let playBtn= document.getElementById('play-button');
playBtn.addEventListener('click', function(event) {
  event.preventDefault();

  // INITIALIZE GAME
  play();

  // INITIALIZE GAME TIMER
  timing();

  // GAME
  // FIRST LEVEL, LARGE CIRCLES ONLY (EASY)
  if (timePassed >= 20) {

  }
  // SECOND LEVEL, LARGE AND MEDIUM CIRCLES (NORMAL)
  if (timePassed >= 40) {

  }
  // THIRD LEVEL, ALL CIRCLES (HARD)
  if (timePassed >= 60) {

  }
  // FOURTH LEVEL, MEDIUM AND SMALL CIRCLES (DIFFICULT)
  if (timePassed >= 80) {

  }
  // FIFTH LEVEL, SMALL CIRCLES ONLY (EXTREME)
  if (timePassed >= 100) {

  }

  // END GAME
  gameEnd();
});


















// WORKSPACE

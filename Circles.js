jQuery( document ).ready(function($) {

  /*
  TO DO
   */

   // ADD TRACKING FOR HIGH SCORE AND GAMES PLAYED. STORE AS COOKIE/LOCAL/SESSION

   // FINALIZE HOW GAME WILL PROGRESS


  /*
  STATE GLOBALS
   */

  var gameActive = 0;
  var gamesPlayed = 0;
  var madnessMode = 0;

  var smallCount = 0;
  var mediumCount = 0;
  var largeCount = 0;

  var smallClicked = 0;
  var mediumClicked = 0;
  var largeClicked = 0;
  var misClicks = 0;

  const smallValue = 3;
  const mediumValue = 2;
  const largeValue = 1;

  var circleLifetime = 2000;

  var score = 0;
  var time = 0;
  var timerId = 0;

  // CREATE ALL INFORMATION NODES AND APPEND ELEMENTS
  var timeNode = document.createTextNode('0');
  document.getElementById('timer').appendChild(timeNode);
  var scoreNode = document.createTextNode('0');
  document.getElementById('score').appendChild(scoreNode);
  var timeLogNode = document.createTextNode('0');
  document.getElementById('time-output').appendChild(timeLogNode);
  var scoreLogNode = document.createTextNode('0');
  document.getElementById('score-output').appendChild(scoreLogNode);
  var clicksLogNode = document.createTextNode('0');
  document.getElementById('clicked-output').appendChild(clicksLogNode);
  var missedCirclesLogNode = document.createTextNode('0');
  document.getElementById('missed-output').appendChild(missedCirclesLogNode);
  var accuracyLogNode = document.createTextNode('0');
  document.getElementById('accuracy-output').appendChild(accuracyLogNode);

  // FIND ALL MODAL ELEMENTS NEEDED FOR DISPLAYING AND CONDITIONS
  var modalArea = document.getElementById("modal-area");
  var modalPlay = document.getElementById("modal-play");
  var modalScore = document.getElementById("modal-score");
  var modalOverlay = document.getElementById("modal-overlay");
  var madnessElement = document.getElementById("madness");
  var easyElement = document.getElementById("easy");
  var normalElement = document.getElementById("normal");
  var hardElement = document.getElementById("hard");

  /*
  HELPER FUNCTIONS
   */

  // PROTOTYPE DEFINITIONS FOR REMOVING ELEMENTS
  Element.prototype.remove = function() {
      this.parentElement.removeChild(this);
  }
  NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
      for(var i = this.length - 1; i >= 0; i--) {
          if(this[i] && this[i].parentElement) {
              this[i].parentElement.removeChild(this[i]);
          }
      }
  }

  // RANDOM %-NUMBER FUNCTIONS
  function randomNum () {
    return Math.floor(Math.random() * 100);
  }

  function randomTop () {
    let num;
    do {
      num = randomNum();
    }
    while (num < 3.7);

    return num;
  }

  function randomLeft () {
    let num;
    do {
      num = randomNum();
    }
    while (num < 0.2);

    return num;
  }

  // RANDOM ID-NUMBER FUNCTION
  function randomID () {
    let id = "";
    let allPossibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++)
      id += allPossibleCharacters.charAt(Math.floor(Math.random() * allPossibleCharacters.length));
    return id;
  }

  // REINITIALIZE STATE VARIABLES
  function resetGlobals () {
    smallCount = 0;
    mediumCount = 0;
    largeCount = 0;
    smallClicked = 0;
    mediumClicked = 0;
    largeClicked = 0;
    time = 0;
    score = 0;
    timeNode.data = 0;
    scoreNode.data = 0;
    timeLogNode.data = 0;
    scoreLogNode.data = 0;
    clicksLogNode.data = 0;
    missedCirclesLogNode.data = 0;
  }

  // CALCULATE SCORE
  function scoring () {
    score = (smallClicked * smallValue) + (mediumClicked * mediumValue) + (largeClicked * largeValue);
    scoreNode.data = score;
    return true;
  }

  // REMOVE CIRCLES (CLEAR GAME FIELD)
  function clearCircles () {
    document.getElementsByClassName("largeCircle").remove();
    document.getElementsByClassName("mediumCircle").remove();
    document.getElementsByClassName("smallCircle").remove();
  }

  // CHECK FOR CHECKBOXES ON CLICK
  function isCheckBox(event) {
    if (event.target.id === "madness" ||
        event.target.id === "madness-label" ||
        event.target.id === "hard" ||
        event.target.id === "hard-label" ||
        event.target.id === "normal" ||
        event.target.id === "normal-label" ||
        event.target.id === "easy" ||
        event.target.id === "easy-label") {
      return true;
    } else {
      return false;
    }
  }

  /*
  CIRCLE GENERATION FUNCTIONS
   */

  function smallCircle () {
    // CREATE CIRCLE ELEMENT
    let small = document.createElement("div");
    // ADD STYLING CLASS AND UNIQUE ID
    small.className = 'smallCircle';
    let smallID = randomID();
    small.id = smallID;
    // SET RANDOM TOP & BOTTOM STYLES
    let top = randomTop();
    let left = randomLeft();
    // BOUNDARY CHECKS TO KEEP CIRCLE WITHIN GAME FIELD
    if (top > 98.7) {top = 98.7;}
    if (left > 99) {left = 99;}
    small.setAttribute("style", `top:${top}%; left:${left}%;`);
    // INSERT CIRCLE + INCREASE COUNT
    let field = document.getElementById("field");
    field.appendChild(small);
    smallCount++;
    // ADD EVENT LISTENER TO ELEMENT FOR REMOVAL
    small.addEventListener('click', function(event) {
      // INCREMENT CLICKED ELEMENTS AND UPDATE SCORE
      smallClicked++;
      scoring();
      // REMOVE ELEMENT
      small.parentNode.removeChild(small);
      return true;
    });
    // REMOVE CIRCLE AFTER circleLifetime
    // CHECK FOR MADNESS MODE
    if (!madnessMode) {
      setTimeout(function(){
        // CHECK IF ELEMENT HAS BEEN CLICKED
        let smallExist = document.getElementById(smallID);
        if (smallExist) {
          // REMOVE ELEMENT
          small.parentNode.removeChild(small);
        }
        return true;
      }, circleLifetime);
    }
    return true;
  }

  function mediumCircle () {
    // CREATE CIRCLE ELEMENT
    let medium = document.createElement("div");
    // ADD STYLING CLASS AND UNIQUE ID
    medium.className = 'mediumCircle';
    let mediumID = randomID();
    medium.id = mediumID;
    // SET RANDOM TOP & BOTTOM STYLES
    let top = randomTop();
    let left = randomLeft();
    // BOUNDARY CHECKS TO KEEP CIRCLE WITHIN GAME FIELD
    if (top > 97.5) {top = 97.5;}
    if (left > 98) {left = 98;}
    medium.setAttribute("style", `top:${top}%; left:${left}%;`);
    // INSERT CIRCLE + INCREASE COUNT
    let field = document.getElementById("field");
    field.appendChild(medium);
    mediumCount++;
    // ADD EVENT LISTENER TO ELEMENT FOR REMOVAL
    medium.addEventListener('click', function(event) {
      // INCREMENT CLICKED ELEMENTS AND UPDATE SCORE
      mediumClicked++;
      scoring();
      // REMOVE ELEMENT
      medium.parentNode.removeChild(medium);
      return true;
    });
    // REMOVE CIRCLE AFTER circleLifetime
    // CHECK FOR MADNESS MODE
    if (!madnessMode) {
      setTimeout(function(){
        // CHECK IF ELEMENT HAS BEEN CLICKED
        let mediumExist = document.getElementById(mediumID);
        if (mediumExist) {
          // REMOVE ELEMENT
          medium.parentNode.removeChild(medium);
        }
        return true;
      }, circleLifetime);
    }
    return true;
  }

  function largeCircle () {
    // CREATE CIRCLE ELEMENT
    let large = document.createElement("div");
    // ADD STYLING CLASS AND UNIQUE ID
    large.className = 'largeCircle';
    let largeID = randomID();
    large.id = largeID;
    // SET RANDOM TOP & BOTTOM STYLES
    let top = randomTop();
    let left = randomLeft();
    // BOUNDARY CHECKS TO KEEP CIRCLE WITHIN GAME FIELD
    if (top > 96.3) {top = 96.3;}
    if (left > 97.2) {left = 97.2;}
    large.setAttribute("style", `top:${top}%; left:${left}%;`);
    // INSERT CIRCLE + INCREASE COUNT
    let field = document.getElementById("field");
    field.appendChild(large);
    largeCount++;
    // ADD EVENT LISTENER TO ELEMENT FOR REMOVAL
    large.addEventListener('click', function(event) {
      // INCREMENT CLICKED ELEMENTS AND UPDATE SCORE
      largeClicked++;
      scoring();
      // REMOVE ELEMENT
      large.parentNode.removeChild(large);
      return true;
    });
    // REMOVE CIRCLE AFTER circleLifetime
    // CHECK FOR MADNESS MODE
    if (!madnessMode) {
      setTimeout(function(){
        // CHECK IF ELEMENT HAS BEEN CLICKED
        let largeExist = document.getElementById(largeID);
        if (largeExist) {
          // REMOVE ELEMENT
          large.parentNode.removeChild(large);
        }
        return true;
      }, circleLifetime);
    }
    return true;
  }

  /*
  GAME FUNCTIONS
   */

  // ACTIVATE GAME
  function play () {
    gameActive = 1;
    // CHECK FOR MADNESS MODE
    if (document.getElementById('madness').checked) {
      madnessMode = 1;
    } else {
      madnessMode = 0;
    }
    // CLEAR GAME FIELD FOR MADNESS MODE
    if (madnessMode) {
      clearCircles();
    }
    // REINITIALIZE STATE VARIABLES
    resetGlobals();
    // CLOSE MODALS
    if (gamesPlayed === 0) {
      modalPlay.classList.add("hidden");
      modalOverlay.classList.add("hidden");
      modalArea.classList.add("hidden");
    } else {
      modalScore.classList.add("hidden");
      modalOverlay.classList.add("hidden");
      modalArea.classList.add("hidden");
    }
    // INITIALIZE GAME
    game();
    return true;
  }

  // DEACTIVATE GAME
  function gameEnd () {
    // RESET GAME STATE AND INCREMENT GAMES PLAYED
    gameActive = 0;
    gamesPlayed++;
    // STOP TIMER
    clearInterval(timerId);
    // LOG ALL PLAY DATA IN SCORE MODAL
    timeLogNode.data = time-1;
    scoreLogNode.data = score;
    clicksLogNode.data = smallClicked + mediumClicked + largeClicked;
    missedCirclesLogNode.data = (smallCount - smallClicked) + (mediumCount - mediumClicked) + (largeCount - largeClicked);
    let accuracy = (((smallClicked + mediumClicked + largeClicked) / (smallClicked + mediumClicked + largeClicked + misClicks)) * 100)
    // ENSURE ACCURACY IS A VALID NUMBER
    if (accuracy) {
      accuracyLogNode.data = Math.round(accuracy * 100) / 100;
    } else {
      accuracyLogNode.data = 0;
    }
    // OPEN SCORE MODAL
    modalScore.classList.remove("hidden");
    modalOverlay.classList.remove("hidden");
    modalArea.classList.remove("hidden");
    return true;
  }

  // GAMEPLAY FUNCTION
  function game () {
    // TIMING INTERVAL FUNCTION
    timerId = window.setInterval((function(){
      // GAME CONDITIONS
      return function() {
        // SET timeNode AND INCREMENT GAME TIME
        time++;
        timeNode.data = time;
        // FIRST LEVEL, LARGE CIRCLES ONLY (EASY)
        if (time <= 15) {
          largeCircle();
        }
        // SECOND LEVEL, LARGE AND MEDIUM CIRCLES (NORMAL)
        if (time > 15 && time <= 30) {
          mediumCircle();
        }
        // THIRD LEVEL, ALL CIRCLES (HARD)
        if (time > 30 && time <= 45) {
          smallCircle();
        }
        // FOURTH LEVEL, MEDIUM AND SMALL CIRCLES (DIFFICULT)
        if (time > 45 && time <= 60) {
          gameEnd();
        }
        // FIFTH LEVEL, SMALL CIRCLES ONLY (EXTREME)
        if (time > 60 && time <= 80) {

        }
        // END GAME
        if (time >= 100) {

        }
        return true;
      };
    }()), 1000);
    return true;
  }

  /*
  EVENT LISTENERS
   */

  // ADDING EVENT LISTENER TO PAGE TO DISABLE/PREVENT TEXT HIGHLIGHTING
  $('html, body').bind('pointerup pointerdown mouseup mousedown', function(event) {
    // EXCEPTION FOR CHECKBOXES
    if (isCheckBox(event)) {
      return true;
    }
    event.preventDefault();
    return true;
  });

  // ADDING EVENT LISTENER TO DOCUMENT TO CAPTURE PLAY BUTTONS,
  // LOG ACCURACY, AND DETERMINE DIFFICULTY
  document.addEventListener('click', function(event) {
    let id = event.target.id;
    // GAME DIFFICULTIES
    if (id === "easy") {
      circleLifetime = 3000;
      madnessElement.checked = false;
      hardElement.checked = false;
      normalElement.checked = false;
    }
    if (id === "normal") {
      circleLifetime = 2000;
      madnessElement.checked = false;
      hardElement.checked = false;
      easyElement.checked = false;
    }
    if (id === "hard") {
      circleLifetime = 1000;
      madnessElement.checked = false;
      normalElement.checked = false;
      easyElement.checked = false;
    }
    if (id === "madness") {
      hardElement.checked = false;
      normalElement.checked = false;
      easyElement.checked = false;
    }
    // EXCEPTION FOR CHECKBOXES
    if (isCheckBox(event)) {
      return true;
    }
    event.preventDefault();
    // INITIALIZE GAME
    if (id === "play-button" || id === "play-button2") {
      play();
    }
    // LOG MISSED CLICKS
    if (gameActive && id === "field") {
      misClicks++;
    }
    return true;
  });

}); // END DOCUMENT READY














  // WORKSPACE

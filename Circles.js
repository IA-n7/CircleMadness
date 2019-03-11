jQuery( document ).ready(function() {

  /*
  TO DO
   */

   // ADD TRACKING FOR HIGH SCORE AND GAMES PLAYED. STORE AS COOKIE/LOCAL/SESSION

   // ADD CHECKBOX FOR MADNESS MODE

   // ADD DIFFICULTY CHECK FOR NON-MADNESS MODE (circleLifetime to 1000 HARD 2000 NORMAL 3000 EASY)

   // IF IN MADNESS MODE, REMOVE OPTION FOR DIFFICULTY

   // REMOVE WINDOW RESIZE FUNCTION IF UNEEDED (at end)

  /*
  STATE GLOBALS
   */

  var gameActive = 0;
  var gamesPlayed = 0;
  var madnessMode = 0;

  var smallCount = 0;
  var smallClicked = 0;
  var mediumCount = 0;
  var mediumClicked = 0;
  var largeCount = 0;
  var largeClicked = 0;

  const smallValue = 3;
  const mediumValue = 2;
  const largeValue = 1;

  var circleLifetime = 2000;

  var score = 0;
  var time = 0;
  var timerId = 0;
  var timerId2 = 0; //not in use right now
  var interval = 1000; // not in use right now

  // CREATE ALL INFORMATION NODES AND APPEND ELEMENT
  var timeNode = document.createTextNode('0');
  document.getElementById('timer').appendChild(timeNode);
  var scoreNode = document.createTextNode('0');
  document.getElementById('score').appendChild(scoreNode);
  var timeLogNode = document.createTextNode('0');
  document.getElementById('time').appendChild(timeLogNode);
  var scoreLogNode = document.createTextNode('0');
  document.getElementById('scored').appendChild(scoreLogNode);
  var clicksLogNode = document.createTextNode('0');
  document.getElementById('clicked').appendChild(clicksLogNode);
  var misclicksLogNode = document.createTextNode('0');
  document.getElementById('missed').appendChild(misclicksLogNode);

  // var width = window.innerWidth;
  // var height = window.innerHeight;

  var modalArea = document.getElementById("modal-area");
  var modalPlay = document.getElementById("modal-play");
  var modalScore = document.getElementById("modal-score");
  var modalOverlay = document.getElementById("modal-overlay");

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

  // ADJUSTMENT FUNCTION FOR WINDOW SIZE
  // const onresize = e => {
  //    width = e.target.innerWidth;
  //    height = e.target.innerHeight;
  // }

  // RANDOM %-NUMBER FUNCTION
  function randomNum () {
    return Math.floor(Math.random() * 100);
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
    misclicksLogNode.data = 0;
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

  /*
  CIRCLE GENERATION FUNCTIONS
   */

  function smallCircle () {
    // CREATE CIRCLE ELEMENT
    let small = document.createElement("div");
    // ADD STYLING CLASS
    small.className = 'smallCircle';
    // ADD UNIQUE ID
    let smallID = randomID();
    small.id = smallID;
    // SET RANDOM TOP & BOTTOM STYLES
    let top = randomNum();
    let left = randomNum();
    // BOUNDARY CHECKS TO KEEP CIRCLE WITHIN GAME FIELD
    if (top > 98.7) {top = 98.7;}
    if (top < 0.3) {top = 0.3;}
    if (left > 99) {left = 99;}
    if (left < 0.2) {left = 0.2;}
    small.setAttribute("style", `top:${top}%; left:${left}%;`);
    // INSERT CIRCLE + INCREASE COUNT
    let field = document.getElementById("field");
    field.appendChild(small);
    smallCount++;
    // ADD EVENT LISTENER TO ELEMENT
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
      }, circleLifetime);
    }
    return true;
  }

  function mediumCircle () {
    // CREATE CIRCLE ELEMENT
    let medium = document.createElement("div");
    // ADD STYLING CLASS
    medium.className = 'mediumCircle';
    // ADD UNIQUE ID
    let mediumID = randomID();
    medium.id = mediumID;
    // SET RANDOM TOP & BOTTOM STYLES
    let top = randomNum();
    let left = randomNum();
    // BOUNDARY CHECKS TO KEEP CIRCLE WITHIN GAME FIELD
    if (top > 97.5) {top = 97.5;}
    if (top < 0.3) {top = 0.3;}
    if (left > 98) {left = 98;}
    if (left < 0.2) {left = 0.2;}
    medium.setAttribute("style", `top:${top}%; left:${left}%;`);
    // INSERT CIRCLE + INCREASE COUNT
    let field = document.getElementById("field");
    field.appendChild(medium);
    mediumCount++;
    // ADD EVENT LISTENER TO ELEMENT
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
      }, circleLifetime);
    }
    return true;
  }

  function largeCircle () {
    // CREATE CIRCLE ELEMENT
    let large = document.createElement("div");
    // ADD STYLING CLASS
    large.className = 'largeCircle';
    // ADD UNIQUE ID
    let largeID = randomID();
    large.id = largeID;
    // SET RANDOM TOP & BOTTOM STYLES
    let top = randomNum();
    let left = randomNum();
    // BOUNDARY CHECKS TO KEEP CIRCLE WITHIN GAME FIELD
    if (top > 96.3) {top = 96.3;}
    if (top < 0.3) {top = 0.3;}
    if (left > 97.2) {left = 97.2;}
    if (left < 0.2) {left = 0.2;}
    large.setAttribute("style", `top:${top}%; left:${left}%;`);
    // INSERT CIRCLE + INCREASE COUNT
    let field = document.getElementById("field");
    field.appendChild(large);
    largeCount++;
    // ADD EVENT LISTENER TO ELEMENT
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
    timeLogNode.data = time;
    scoreLogNode.data = score;
    clicksLogNode.data = smallClicked + mediumClicked + largeClicked;
    misclicksLogNode.data = (smallCount - smallClicked) + (mediumCount - mediumClicked) + (largeCount - largeClicked);
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

      };
    }()), 1000);
  }

  /*
  EVENT LISTENERS
   */

  // ADDING EVENT LISTENER TO WINDOW FOR RESIZING
  // window.addEventListener("resize", onresize);

  // ADDING EVENT LISTENER TO PLAY BUTTON [MODAL-PLAY]
  let playBtn = document.getElementById('play-button');
  playBtn.addEventListener('click', function(event) {
    event.preventDefault();
    // INITIALIZE GAME
    play();
    return true;
  });

  // ADDING EVENT LISTENER TO PLAY BUTTON [MODAL-SCORE]
  let playBtn2 = document.getElementById('play-button2');
  playBtn2.addEventListener('click', function(event) {
    event.preventDefault();
    // INITIALIZE GAME
    play();
    return true;
  });

}); // END DOCUMENT READY














  // WORKSPACE

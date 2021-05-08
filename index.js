const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");

let gameSpeed = document.getElementById("game-speed");
// // Alternatively if your select resides inside a form, you could use this:
// document.getElementById("myForm").elements["a_drop_down_box"];

let value = gameSpeed.options[gameSpeed.selectedIndex].value;

// To prevent having a mole pop up twice at the same place in a row
let lastHole;
let timeUp = false;
let score = 0 ;

// random amount of time
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}


// pick a random hole for the mole to pop up
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  // to prevent having twice the same hole, if it's the same we run randomHole again
  if (hole === lastHole) {
    console.log('Ah nah that\'s the same one bud');
    return randomHole(holes);
  }
  // console.log(holes.length);

  lastHole = hole;
  return hole;
}


// make the mole pop up the selected hole
function pop() {
  // Mole speed level
  // const time = randomTime(200, 1000);
  let time = 1000;

  const grandpaSpeed = randomTime(800, 1000);
  const normalSpeed = randomTime(300, 800);
  const ninjaSpeed = randomTime(200, 400);
  
  if (gameSpeed.value === 'ninjaSpeed') {
    time = ninjaSpeed
  } else if (gameSpeed.value === 'grandpaSpeed') {
    time = grandpaSpeed
  } else {
    time = normalSpeed
  }
  

  console.log(time);
  console.log(gameSpeed.value);
  // console.log(value);
  
  const hole = randomHole(holes);
  // console.log(time, hole);
  hole.classList.add('up');
  // so the mole go down after pop
  // setTimeout to be the random amount of time of the var time
  setTimeout(() => {
    hole.classList.remove('up');      
    if(!timeUp) pop();    
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  pop();
  // set in game timer, not visible yet
  setTimeout(()=> timeUp = true, 10000)
}

function bonk(e) {
  if(!e.isTrusted) return; // cheaters
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));
// see below for better mobile UX
// moles.forEach(mole => mole.addEventListener('', bonk));
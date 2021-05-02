const holes = document.querySelectorAll(".hole");
      const scoreBoard = document.querySelector(".score");
      const moles = document.querySelectorAll(".mole");

      const gameSpeed = document.querySelector("#game-speed");
      const speed = document.querySelectorAll(".speed");

      console.log(gameSpeed);
      console.log(gameSpeed.value);
      console.log(speed);
      console.log(speed.value);

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
        console.log(holes.length);

        lastHole = hole;
        return hole;
      }

      // make the mole pop up the selected hole
      function pop() {
        // Mole speed level
        // const time = randomTime(200, 1000);
        const normalSpeed = randomTime(500, 800);
        const ninjaSpeed = randomTime(50, 200);
        const grandpaSpeed = randomTime(800, 1000);
        
        let time = 1000;

        if (gameSpeed.value === 'normalSpeed') {
          time = normalSpeed;
        } time = ninjaSpeed ;
        
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
        setTimeout(()=> timeUp = true, 5000)
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

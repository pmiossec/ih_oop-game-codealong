const stepSize = 2
     
class Player {
    
    constructor() {
        this.width = 20;
        this.height = 15;
        this.positionX = 50 - this.width / 2;
        this.positionY = 0;
        this.playerElm = this.createDomElement();
        this.move();
    }

    createDomElement() {
        // step1: create the element
        const playerElm = document.createElement("div");

        // step2: add content or modify (ex. innerHTML...)
        playerElm.id = "player";
        playerElm.style.width = this.width + "vw";
        playerElm.style.height = this.height + "vh";
        playerElm.style.left = this.positionX + "vw";
        playerElm.style.bottom = this.positionY + "vh";
        playerElm.innerHTML = '<img src="./images/ironhack.png" alt="ironhack">';

        //step3: append to the dom: `parentElm.appendChild()`
        const parentElm = document.getElementById("board");
        parentElm.appendChild(playerElm);

        return playerElm;
    }

    move() {
        this.playerElm.style.left = `${this.positionX}vw`;
    }

    moveLeft() {
        this.positionX = Math.max(0, this.positionX - stepSize);
        // console.log("Move left", this.positionX);
        this.move();
    }

    moveRight() {
        this.positionX = Math.min(100 - this.width, this.positionX + stepSize);
        // console.log("Move right", this.positionX);
        this.move();
    }

    getPlayerPosition() {
        return this.playerElm.getBoundingClientRect();
    }
}

const enemyType = [
    "./images/html.png",
    "./images/js.png",
    "./images/css.png",
    "./images/banana.png",
    "./images/luis_book.png",
    "./images/qualified.png",
    "./images/gin_tonic.png",
    "./images/react.png"
]

class Enemy {
    constructor() {
        this.enemyElm = this.createDomElement();
        this.positionX = Math.floor(Math.random() * 80) + 10;
        this.positionY = 2;
        this.fall();
    }

    createDomElement() {
        let urlImage = enemyType[Math.floor(Math.random() * enemyType.length)];

        // step1: create the element
        const enemyElm = document.createElement("div");

        // step2: add content or modify (ex. innerHTML...)
        enemyElm.classList.add("enemy");
        enemyElm.style.left = `${this.positionX}vw`;
        enemyElm.style.top = `${this.positionY}vh`;
        // player
        enemyElm.innerHTML = `<center><img src="${urlImage}" alt="ironhack"></center>`;

        //step3: append to the dom: `parentElm.appendChild()`
        const parentElm = document.getElementById("board");
        parentElm.appendChild(enemyElm);

        return enemyElm;
    }

    fall() {
        // console.log("move enemy");
        this.positionY = Math.min(100, this.positionY + stepSize);
        this.enemyElm.style.left = `${this.positionX}vw`;
        this.enemyElm.style.top = `${this.positionY}vh`;
        // console.log("enemy y:", this.positionY)
    }

    isOffScreen() {
        return this.positionY > 90;
    }

    removeFromBoard() {
        // console.log("remove from parent: ", this.enemyElm.parentNode);
        this.enemyElm.parentNode.removeChild(this.enemyElm);
    }

    hasCollided(playerPosition) {
        const enemyRect = this.enemyElm.getBoundingClientRect();
        // console.log("positions", playerPosition, enemyRect);
        if(enemyRect.bottom > playerPosition.top 
            && enemyRect.right > playerPosition.left 
            && enemyRect.top < playerPosition.bottom 
            && enemyRect.left < playerPosition.right) {
                return true;
            }
        return false;
    }
}

class Game {
    constructor() {
        this.player = new Player();
        this.enemies = [];

        document.addEventListener("keydown", (e) => {
            if(e.code === "ArrowLeft") {
                this.player.moveLeft();
            }
        
            if(e.code === "ArrowRight") {
                this.player.moveRight();
            }
        })

        this.counter = 0;
        this.moveEnemieIntervaleId = setInterval(() => {
            this.moveEnemies();
            this.counter++;
            if (this.counter === 15)  {
                this.createEnemy();
                this.counter = 0;
            }
        }, 100);
    }
    
    createEnemy() {
        this.enemies.push(new Enemy())
    }
    
    moveEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
            const enemy = this.enemies[i];
            enemy.fall();
            const playerPosition = this.player.getPlayerPosition();
            if (enemy.hasCollided(playerPosition)) {
                clearInterval(this.moveEnemieIntervaleId);
                // clearInterval(createEnemyIntervaleId);
                window.location.href = "https://giphy.com/search/you-lose";
            }
            if (enemy.isOffScreen()) {
                enemy.removeFromBoard();
                this.enemies.splice(i, 1);
            }
        }
    }
}

const game = new Game();
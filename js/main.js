const stepSize = 2
const enemies = [];
     
class Player {
    
    constructor() {
        this.width = 20;
        this.height = 15;
        this.positionX = 50 - this.width / 2;
        this.positionY = 0;
        this.createDomElement();
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

        this.playerElm = playerElm;

    }

    doGreatStuff() {
        console.log("I do great stuff because I'm a great player");
    }

    move() {
        this.playerElm.style.left = `${this.positionX}vw`;
    }

    moveLeft() {
        this.positionX = Math.max(0, this.positionX - stepSize);
        console.log("Move left", this.positionX);
        this.move();
    }

    moveRight() {
        this.positionX = Math.min(100 - this.width, this.positionX + stepSize);
        console.log("Move right", this.positionX);
        this.move();
    }
}

const enemyType = [
    "https://www.clipartmax.com/png/small/4-46495_free-clipart-of-a-banana-cute-banana-drawing.png",
    "../images/luis_book.png",
    "../images/qualified.png",
    "https://www.clipartmax.com/png/small/451-4519843_gin-tonic-free-icon-gin-tonic-symbol.png"
]

class Enemy {
    constructor() {
        this.enemyElm = this.createDomElement();
        this.positionX = Math.floor(Math.random() * 80) + 10;
        console.log("e x:", this.positionX);
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
        enemyElm.innerHTML = `<img src="${urlImage}" alt="ironhack">`;

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
        console.log("enemy y:", this.positionY)
    }

    isOffScreen() {
        return this.positionY > 90;
    }

    removeFromBoard() {
        console.log("remove from parent: ", this.enemyElm.parentNode);
        this.enemyElm.parentNode.removeChild(this.enemyElm);
    }
}


const player = new Player();
player.doGreatStuff();

document.addEventListener("keydown", (e) => {
    if(e.code === "ArrowLeft") {
        player.moveLeft();
    }

    if(e.code === "ArrowRight") {
        player.moveRight();
    }
})

function moveEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        enemy.fall();
        if (enemy.isOffScreen()) {
            enemy.removeFromBoard();
            enemies.splice(i, 1);
        }
    }
}

function createEnemy() {
    enemies.push(new Enemy())
}
createEnemy();
setInterval(moveEnemies, 200)
setInterval(createEnemy, 1000)
// setTimeout(createEnemy, 1000)
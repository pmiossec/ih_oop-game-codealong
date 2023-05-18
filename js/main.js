console.log("js loaded");     
const stepSize = 2
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

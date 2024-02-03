const score = document.querySelector(".score");
const gameArea = document.querySelector(".gameArea");
const startScreen = document.querySelector(".startScreen");


let keys = { ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false };
let player = { speed: 5 , score:0 };

startScreen.addEventListener("click", start);
document.addEventListener("keydown", presson);
document.addEventListener("keyup", pressoff);

function start() {
    startScreen.classList.add("hide");
    gameArea.innerHTML="";
    player.start = true;
    player.score=0;
    for (let x = 0; x < 10; x++) {
        let div = document.createElement("div");
        div.classList.add("line");
        div.y = x * 150;
        div.style.top = (x * 150) + "px";
        gameArea.appendChild(div);


    }
    window.requestAnimationFrame(playGame);

    let car = document.createElement("div");
    car.innerText = "car";
    car.setAttribute("class", "car");

    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;


    for (let x = 0; x < 5; x++) {
        let enemy = document.createElement("div");
        enemy.classList.add("enemy");
        enemy.innerHTML="<br>"+(x+1);
        enemy.y = ((x + 1) * 600) * -1;
        enemy.style.top = enemy.y + "px";
        enemy.style.left = Math.floor(Math.random() * 350) + "px";
        enemy.style.backgroundColor = getRandomColor();
        gameArea.appendChild(enemy);


    }

}
function getRandomColor() {
    
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}


function moveLines() {
    let lines = document.querySelectorAll(".line");
    lines.forEach(function (item) {
        if (item.y >= 1500) {
            item.y -= 1500;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}


function moveEnemy(car) {
    let ele = document.querySelectorAll(".enemy");
    ele.forEach(function (item) {
        if (isCollide(car, item)) {
            console.log("HIT");
            endGame();
             player.score=0;
        }
        if (item.y >= 1500) {
            item.y = -600;
            item.style.left = Math.floor(Math.random() * 350) + "px";
            item.style.backgroundColor=getRandomColor();
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) ||
        (aRect.top > bRect.bottom) ||
        (aRect.right < bRect.left) ||
        (aRect.left > bRect.right));
}


function endGame(){
    player.start=false;
    score.innerHTML="Game Over <br> Your Score " + player.score;
    startScreen.classList.remove("hide");
}

function playGame() {
    
    let car = document.querySelector(".car");
    moveLines();
    moveEnemy(car);
    let road = gameArea.getBoundingClientRect();
    if (player.start) {
        if (keys.ArrowUp && (player.y + 100) > road.top) { player.y -= player.speed; }
        if (keys.ArrowDown && (player.y +car.offsetHeight) <road.bottom ) { player.y += player.speed; }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed; }
        if (keys.ArrowRight && player.x < (road.width - 50)) { player.x += player.speed; }
        car.style.left = player.x + "px";
        car.style.top = player.y + "px";

        window.requestAnimationFrame(playGame);
        player.score++;
        score.innerText="Score: "+player.score;

    }

}

function presson(e) {
    e.preventDefault();
    keys[e.key] = true;
    // console.log("on", e.key);
}

function pressoff(e) {
    e.preventDefault();
    keys[e.key] = false;
    // console.log("off", e.key);
}
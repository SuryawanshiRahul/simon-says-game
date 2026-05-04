// Simon Say Game ************* 
let gameseq = [];
let userseq = [];
let highScore = 0;
let storedHS = localStorage.getItem("highScore");
if (storedHS) {
    highScore = parseInt(storedHS);
}   
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keydown", function () {
    if (started == false) {
        console.log("game started");
        started = true;

        levelUp();
    }
});

function gameFalash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 300);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 300);
}

function levelUp() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
document.getElementById("highScore").innerText = highScore;
    // random btn choice
    let ramIndex = Math.floor(Math.random() * 4);
    let randColor = btns[ramIndex];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(ramIndex);
    // console.log(randColor);
    // console.log(randBtn);
    gameseq.push(randColor);
    console.log(gameseq);
    gameFalash(randBtn);
}
function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(function () { 
                 levelUp();
            }, 800);
           
        }
        // console.log("same color");
    } else {
        if (level > highScore) {
            highScore = level;
            localStorage.setItem("highScore", highScore);
        }
        document.getElementById("highScore").innerText = highScore;
        h2.innerHTML = `Game Over! Your score is <b>${level}</b><br>Press any key to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
         document.querySelector("body").style.backgroundColor = "white";

        },250);
        rest();
    }
}
function btnPess() {
    // console.log(this);
    let btn = this;
    userFlash(btn);

   let  userColor = btn.getAttribute("id");
    userseq.push(userColor);
    checkAns(userseq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPess);
}  
function rest() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}


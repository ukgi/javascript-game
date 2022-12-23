let play = false;
let count = 10;
let carrotCount = Math.floor(Math.random() * 10 + 1);
let bugCount = 12 - carrotCount;
let clickBug = false;
const playBtn = document.querySelector(".info__play-btn");
const replayBtn = document.querySelector(".replay-btn");
const stopBtn = document.querySelector(".info__stop-btn");
const timer = document.querySelector(".info__timer");
const popUp = document.querySelector(".info__pop-up");
const infoTitle = document.querySelector(".info__pop-up__title");
const gameSection = document.querySelector(".game-section");
const carrot = document.querySelector(".carrot");
const bug = document.querySelector(".bug");
const infoCounter = document.querySelector(".info__counter");
const gameRect = gameSection.getBoundingClientRect();
const CARROT_SIZE = 80;

playBtn.addEventListener("click", () => {
  play = true;
  handlePlayGame();
  handleCountDown();
});

stopBtn.addEventListener("click", () => {
  play = false;
  playBtn.classList.remove("display--off");
  stopBtn.classList.add("display--off");
  popUp.classList.remove("display--off");
  infoTitle.textContent = "replay ?";
  resetBugAndCarrot();
});

replayBtn.addEventListener("click", () => {
  play = true;
  count = 10;
  resetBugAndCarrot();
  handlePlayGame();
  handleCountDown();
  popUp.classList.add("display--off");
});

function handlePlayGame() {
  if (play) {
    playBtn.classList.add("display--off");
    stopBtn.classList.remove("display--off");
    makeBugAndCarrot();
  }
}

function handleCountDown() {
  let Interval = setInterval(() => {
    timer.innerHTML = `
    <h1>00:${count--}</h1>
    `;
    if (count < 0) {
      clearInterval(Interval);
      handleCountEnd();
    } else if (play === false) {
      clearInterval(Interval);
    }
  }, 1000);
}

function handleCountEnd(clickBug) {
  play = false;
  popUp.classList.remove("display--off");
  if (carrotCount === 0) {
    infoTitle.textContent = "You Win 👍";
    infoCounter.textContent = `${carrotCount}`;
  } else if (carrotCount > 0 || clickBug) {
    infoTitle.textContent = "You Lose 🤣";
  }
  resetBugAndCarrot();
}

function makeBugAndCarrot() {
  const x1 = 0;
  const y1 = 0;
  const x2 = gameRect.width - CARROT_SIZE;
  const y2 = gameRect.height - CARROT_SIZE;
  for (let i = 0; i <= carrotCount; i++) {
    let carrot = document.createElement("img");
    carrot.setAttribute("src", "./img/carrot.png");
    carrot.classList.add("carrot");
    carrot.style.position = "absolute";
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    carrot.style.left = `${x}px`;
    carrot.style.top = `${y}px`;
    gameSection.appendChild(carrot);
    infoCounter.textContent = `${carrotCount + 1}`;
    carrot.addEventListener("click", () => {
      if (carrotCount === 0) {
        handleCountEnd();
      }
      carrot.classList.add("display--off");
      carrotCount--;
      infoCounter.textContent = `${carrotCount + 1}`;
    });
  }
  for (let i = 0; i <= bugCount; i++) {
    let bug = document.createElement("img");
    bug.setAttribute("src", "./img/bug.png");
    bug.classList.add("bug");
    bug.style.position = "absolute";
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    bug.style.left = `${x}px`;
    bug.style.top = `${y}px`;
    gameSection.appendChild(bug);
    bug.addEventListener("click", () => {
      clickBug = true;
      handleCountEnd(clickBug);
    });
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function resetBugAndCarrot() {
  gameSection.innerHTML = "";
  clickBug = false;
  carrotCount = Math.floor(Math.random() * 10 + 1);
  bugCount = 12 - carrotCount;
}

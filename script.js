const cards = document.querySelectorAll(".card");
const messageCorrect = document.getElementById("correct-message");
const messageWrong = document.getElementById("wrong-message");
const messageWin = document.getElementById("win-message");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
  matchedPairs++;

  if (matchedPairs === cards.length / 2) {
    setTimeout(showWinMessage, 500);
  } else {
    showCorrectMessage();
  }

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    showWrongMessage();
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function showCorrectMessage() {
  messageCorrect.classList.remove("hidden");
  setTimeout(() => {
    messageCorrect.classList.add("hidden");
  }, 1000);
}

function showWrongMessage() {
  messageWrong.classList.remove("hidden");
  setTimeout(() => {
    messageWrong.classList.add("hidden");
    lockBoard = false;
  }, 1000);
}

function showWinMessage() {
  messageWin.classList.remove("hidden");
}

function restartGame() {
  cards.forEach(card => {
    card.classList.remove("flip", "matched");
    card.addEventListener("click", flipCard);
  });
  matchedPairs = 0;
  messageWin.classList.add("hidden");
  resetBoard();
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * cards.length);
    card.style.order = randomPosition;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));

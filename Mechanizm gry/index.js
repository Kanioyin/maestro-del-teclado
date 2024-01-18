const PARAGRAPHS = [
  'Kochać to nie znaczy zawsze to samo Uważaj ziomek bo ta suka leci na twoje siano Co znaczy kochać poznać jej nie dano Zweryfikuj wtórnie może sypiasz z blacharą',
];

const typingText = document.querySelector('.typing-text p');
const inpField = document.querySelector('.wrapper .input-field');
const tryAgainBtn = document.querySelector('.content button');
const timeTag = document.querySelector('.time span');
const mistakeTag = document.querySelector('.mistake span');
const wpmTag = document.querySelector('.wpm span');
const cpmTag = document.querySelector('.cpm span');

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = (mistakes = isTyping = 0);
let gameEnded = false;

function loadParagraph() {
  const ranIndex = Math.floor(Math.random() * PARAGRAPHS.length);
  typingText.innerHTML = '';
  PARAGRAPHS[ranIndex].split('').forEach((char) => {
    let span = `<span>${char}</span>`;
    typingText.innerHTML += span;
  });
  typingText.querySelectorAll('span')[0].classList.add('active');
  document.addEventListener('keydown', () => inpField.focus());
  typingText.addEventListener('click', () => inpField.focus());
}

function initTyping() {
  let characters = typingText.querySelectorAll('span');
  let typedChar = inpField.value.split('')[charIndex];
  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }
    if (typedChar == null) {
      if (charIndex > 0) {
        charIndex--;
        if (characters[charIndex].classList.contains('incorrect')) {
          mistakes--;
        }
        characters[charIndex].classList.remove('correct', 'incorrect');
      }
    } else {
      if (characters[charIndex].innerText == typedChar) {
        characters[charIndex].classList.add('correct');
      } else {
        mistakes++;
        characters[charIndex].classList.add('incorrect');
      }
      charIndex++;
    }
    characters.forEach((span) => span.classList.remove('active'));
    characters[charIndex].classList.add('active');

    let wpm = Math.round(((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60);
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

    wpmTag.innerText = wpm;
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = charIndex - mistakes;
  } else {
    if (!gameEnded) {
      gameEnded = true;
      clearInterval(timer);
      inpField.value = '';
      alert(`Koniec gry! Twoje słowa na minutę: ${wpmTag.innerText}, błędy: ${mistakeTag.innerText}`);
    }
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
    let wpm = Math.round(((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60);
    wpmTag.innerText = wpm;
  } else {
    if (!gameEnded) {
      gameEnded = true;
      clearInterval(timer);
      alert(`Czas się skończył! Twoje słowa na minutę: ${wpmTag.innerText}, błędy: ${mistakeTag.innerText}`);
    }
  }
}

function resetGame() {
  gameEnded = false;
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  inpField.value = '';
  timeTag.innerText = timeLeft;
  wpmTag.innerText = 0;
  mistakeTag.innerText = 0;
  cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener('input', initTyping);
tryAgainBtn.addEventListener('click', resetGame);

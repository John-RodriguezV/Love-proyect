const secretNumber = Math.floor(Math.random() * 100) + 1;
const guessBtn = document.getElementById("guessBtn");
const message = document.getElementById("message");
const leftHeart = document.getElementById("leftHeart");
const rightHeart = document.getElementById("rightHeart");
const heartContainer = document.getElementById("heartContainer");
const gameScreen = document.getElementById("gameScreen");
const loveScreen = document.getElementById("loveScreen");
const showCardBtn = document.getElementById("showCardBtn");
const carta = document.getElementById("carta");
const closeCard = document.getElementById("closeCard");
const bgMusic = document.getElementById("bgMusic");     // 🎵 Perfect - Ed Sheeran
const loveMusic = document.getElementById("loveMusic"); // 🎵 Segunda canción

leftHeart.style.left = "0px"; 
rightHeart.style.right = "0px";

// ======== HABILITAR LA PRIMERA CANCIÓN ========
function enableMusic() {
  bgMusic.play().catch(() => {
    console.log("Esperando interacción para reproducir música...");
  });
  // quitamos este listener después de ejecutarse
  document.removeEventListener("click", enableMusic);
  document.removeEventListener("keydown", enableMusic);
}
document.addEventListener("click", enableMusic);
document.addEventListener("keydown", enableMusic);

// ==================== JUEGO ====================
function guessNumber() {
  const guess = Number(document.getElementById("guess").value);
  if (!guess) return;

  const containerWidth = heartContainer.clientWidth;
  const leftWidth = leftHeart.clientWidth;
  const rightWidth = rightHeart.clientWidth;
  const diff = Math.abs(secretNumber - guess);
  const maxMove = (containerWidth - leftWidth - rightWidth) / 2;

  if (guess === secretNumber) {
    const overlap = 70;
    const centerPos = (containerWidth - leftWidth - rightWidth + overlap) / 2;
    leftHeart.style.left = `${centerPos}px`;
    rightHeart.style.left = `${centerPos + leftWidth - overlap}px`;
    message.textContent = "¡Correcto! 💖";

    setTimeout(() => {
      gameScreen.classList.add("fade-out");
      setTimeout(() => {
        gameScreen.style.display = "none";
        loveScreen.classList.add("show");

        // 🎵 Cambiar canción al entrar en la pantalla de amor
        bgMusic.pause();
        bgMusic.currentTime = 0;
        loveMusic.play().catch(() => {
          console.log("Esperando interacción para reproducir la segunda canción...");
        });
      }, 1000);
    }, 1000);
    return;
  }

  const move = maxMove * (1 - diff / 100);
  leftHeart.style.left = `${move}px`;
  rightHeart.style.right = `${move}px`;

  if (diff <= 3) {
    message.textContent = "¡Ya casi! 💗";
  } else if (diff <= 10) {
    message.textContent = guess < secretNumber ? "Más alto 🔼" : "Más bajo 🔽";
  } else if (diff <= 30) {
    message.textContent = guess < secretNumber ? "Un poco más alto ⬆️" : "Un poco más bajo ⬇️";
  } else {
    message.textContent = "¡Estás lejísimos! 😱";
  }
}

document.getElementById("guess").addEventListener("keypress", e => { 
  if (e.key === "Enter") guessNumber(); 
});
guessBtn.addEventListener("click", guessNumber);

// ==================== CARTA ====================
showCardBtn.addEventListener("click", () => {
  carta.classList.remove("closing");
  carta.style.display = "block";
  setTimeout(() => carta.classList.add("open"), 10);
});

closeCard.addEventListener("click", () => {
  carta.classList.remove("open");
  carta.classList.add("closing");
  setTimeout(() => {
    carta.classList.remove("closing");
    carta.style.display = "none";
  }, 1000);
});

// ==================== CORAZONES ====================
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "❤";
  heart.style.position = "fixed";
  heart.style.top = "-20px";
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.fontSize = (Math.random() * 20 + 20) + "px";
  heart.style.animation = `fall ${(Math.random() * 3 + 4)}s linear`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 7000);
}
setInterval(createHeart, 30);

function createHeartInsideLoveScreen() {
  if (!loveScreen.classList.contains('show')) return;
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "❤";
  heart.style.position = "absolute";
  heart.style.top = "-20px";
  heart.style.left = Math.random() * loveScreen.clientWidth + "px";
  heart.style.fontSize = (Math.random() * 25 + 25) + "px";
  heart.style.animation = `fall ${(Math.random() * 2 + 2)}s linear`;
  heart.style.transform = `rotate(${Math.random() * 360}deg)`;
  loveScreen.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeartInsideLoveScreen, 100);

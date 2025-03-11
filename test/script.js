const waC = document.querySelector(".wa-content");
const btnWaContainer = document.querySelector(".btn-wa-content");
const btnMulaiNotif = document.querySelector(".mulai-notif");
const btnNextNotif = document.querySelector(".next");
const btnKirimPesan = document.querySelector(".kirim-pesan");

const audio = new Audio(musik);
audio.autoplay = true;
audio.loop = true;

const notifSound = new Audio("https://files.dariku.my.id/mylove/notif.mp3");
notifSound.autoplay = false;
notifSound.loop = false;

const klikSound = new Audio("https://files.dariku.my.id/mylove/klik.mp3");
klikSound.autoplay = false;
klikSound.loop = false;

const bgC = document.querySelector(".bg");
let indBgC = 0;
function createBg() {
  background.forEach((element) => {
    const bgI = document.createElement("div");
    if (indBgC == 0) {
      bgI.classList.add("show");
      indBgC++;
    }
    bgI.style.backgroundImage = `url('${element}')`;
    bgC.appendChild(bgI);
  });
}

createBg();

const bgItem = document.querySelector(".bg").children;

let indBgNext = 1;
let interv = 2000;
let activ = false;
function nextBg() {
  if (!activ) {
    if (indBgNext == bgItem.length - 1) {
      activ = true;
      bgItem[indBgNext].classList.add("show");
      setTimeout(() => {
        for (let i = 1; i < bgItem.length - 1; i++) {
          bgItem[i].classList.remove("show");
        }
      }, 1000);
      setTimeout(() => {
        bgItem[indBgNext].classList.remove("show");
        indBgNext = 1;
        activ = false;
      }, interv);
    } else if (indBgNext < bgItem.length) {
      bgItem[indBgNext].classList.add("show");
      indBgNext++;
      if (indBgNext == bgItem.length) {
        indBgNext = 1;
      }
    }
  }
}
if (background.length > 1) {
  setInterval(() => {
    nextBg();
  }, interv);
}

function createNotif() {
  for (let i = 0; i < ucapan.length; i++) {
    const notifC = document.createElement("div");
    notifC.classList.add("notif", `notif${i}`);

    notifC.innerHTML = `
    <div class="header">
        <div class="wa">
            <i class="bi bi-whatsapp"></i>
            <span>WHATSAPP</span>
        </div>
    <p class="time">Now</p>
    </div>
    <p class="name">${namaPengirim}</p>
    <p class="notif-text notif-text${i}"></p>`;

    waC.appendChild(notifC);
  }
}

createNotif();

let indNotif = 0;
function nextNotif() {
  setNotifSound();

  if (indNotif == ucapan.length - 1) {
    btnNextNotif.classList.remove("show");
    btnKirimPesan.classList.add("show");
  }
  const indTemp = indNotif;
  if (indNotif < ucapan.length) {
    if (indNotif > 0) {
      const notifT = document.querySelector(`.notif${indTemp - 1}`);
      notifT.classList.remove("show");
    }
    const notif = document.querySelector(`.notif${indTemp}`);

    notif.classList.add("show");

    setTimeout(() => {
      typing(`.notif-text${indTemp}`, ucapan[indTemp], `.notif-text${indTemp}`, () => {});
    }, 300);

    indNotif++;
  }
}

function startNotif() {
  btnMulaiNotif.classList.remove("show");
  btnNextNotif.classList.add("show");
  nextNotif();
}

btnMulaiNotif.onclick = () => {
  startNotif();
  setKlikSound();
};
btnNextNotif.onclick = () => {
  nextNotif();
  setKlikSound();
};
btnKirimPesan.onclick = () => {
  setKlikSound();
  kirimpesan();
  setAudio();
};

function typing(elem, teks, scroll, after) {
  let i = 0;
  let speed = 80;
  let txtsatu = teks;
  function typeWriter() {
    if (i < txtsatu.length) {
      if (txtsatu.charAt(i) == "#") {
        document.querySelector(elem).innerHTML += "<br>";
      } else {
        document.querySelector(elem).innerHTML += txtsatu.charAt(i);
      }
      document.querySelector(scroll).scrollTop = document.querySelector(scroll).scrollHeight;

      i++;
      setTimeout(typeWriter, speed);
    } else {
      after();
    }
  }
  typeWriter();
}

var swalo = Swal.mixin({ allowOutsideClick: false, reverseButtons: true });

function tanggal() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const d = new Date();
  let hari = days[d.getDay()];
  let tgl = d.getDate();
  let bln = months[d.getMonth()];
  document.querySelector(".tgl").innerHTML = hari + ", " + tgl + " " + bln;
}
function startTime() {
  tanggal();
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  h = checkTime(h);
  m = checkTime(m);
  document.querySelector(".jam").innerHTML = h + ":" + m;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
if (tglJamRealtime) startTime();

let audioIsPlay = false;
function setAudio() {
  const buttons = document.querySelector(".swal2-actions").querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      setAudioSound();
      audioIsPlay = true;
      if (isKlikNotif) {
        setKlikSound();
      }
      setAudio();
    });
  });
}
function setAudioSound() {
  audio.play();
}
function setKlikSound() {
  if (isKlikNotif) klikSound.play();
}
function setNotifSound() {
  if (isKlikNotif) notifSound.play();
}

window.onload = () => {
  const preload = document.querySelector(".preload");
  preload.style = "opacity: 0; transition: 1s ease all";
  setTimeout(() => {
    preload.remove();
  }, 1000);
  setTimeout(() => {
    popupAwal();
    setAudio();
  }, 500);
};

function removeBgPopup() {
  const bgPopup = document.querySelector(".bg-popup");
  bgPopup.style = "opacity: 0; transition: 1s ease all";
  setTimeout(() => {
    bgPopup.remove();
  }, 1000);
}

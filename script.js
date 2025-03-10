const frame = document.querySelector("section");
const lists = frame.querySelectorAll("article");
const audios = document.querySelectorAll("audio");
const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");

// article rotation
const deg = 60;
let i = 0;
let num = 0;
let active = 0;
const len = lists.length - 1;
// console.log(len);

// music buttons
lists.forEach((list) => {
  // const pic = list.querySelector(".pic");
  const pause = list.querySelector(".pause");
  const play = list.querySelector(".play");
  const load = list.querySelector(".load");

  list.style.transform = `rotate(${deg * i}deg) translateY(-70vh)`;
  i++;

  play.addEventListener("click", (e) => {
    const isActive = e.currentTarget
      .closest("article")
      .classList.contains("on");

    if (isActive) {
      const activePic = e.currentTarget
        .closest("article")
        .querySelector(".pic");

      const activePlay = e.currentTarget
        .closest("article")
        .querySelector(".play");

      const activeAudio = e.currentTarget
        .closest("article")
        .querySelector("audio");

      activePic.classList.add("on");
      activePlay.classList.add("on");
      activeAudio.play();

      activeAudio.addEventListener("ended", () => {
        activePic.classList.remove("on");
      });
    }
  });

  pause.addEventListener("click", (e) => {
    const isActive = e.currentTarget
      .closest("article")
      .classList.contains("on");

    if (isActive) {
      e.currentTarget
        .closest("article")
        .querySelector(".pic")
        .classList.remove("on");

      e.currentTarget
        .closest("article")
        .querySelector(".play")
        .classList.remove("on");

      e.currentTarget.closest("article").querySelector("audio").pause();
    }
  });

  load.addEventListener("click", (e) => {
    const isActive = e.currentTarget
      .closest("article")
      .classList.contains("on");

    if (isActive) {
      e.currentTarget
        .closest("article")
        .querySelector(".pic")
        .classList.add("on");

      e.currentTarget.closest("article").querySelector("audio").load();
      e.currentTarget.closest("article").querySelector("audio").play();
    }
  });
});

// prev,next
const activation = (index, lists) => {
  //lists는 전체 총 아이템이라 가정, index는
  lists.forEach((list) => {
    list.classList.remove("on");
  });
  lists[index].classList.add("on");
  // console.log(lists[index]);
};

const initMusic = () => {
  audios.forEach((audio) => {
    audio.pause();
    audio.load();
    audio.parentElement.parentElement.nextElementSibling.classList.remove("on");
    // console.log(audio.parentElement.parentElement.nextElementSibling.classList);
  });
};

let nowIndex = 0;
const getNowIndex = () => nowIndex;

const eventTarget = new EventTarget();

buttonClicker = () => {
  prev.addEventListener("click", () => {
    initMusic();
    num++;

    frame.style.transform = `rotate(${num * deg}deg)`;
    active === 0 ? (active = len) : active--;
    activation(active, lists);
    // console.log(active);
    if (nowIndex > 0 && nowIndex < 6) {
      nowIndex -= 1;
    } else if (nowIndex === 0) {
      nowIndex = 5;
    }
    eventTarget.dispatchEvent(
      new CustomEvent("updateNowIndex", { detail: nowIndex })
    );
  });

  next.addEventListener("click", () => {
    initMusic();
    num--;

    frame.style.transform = `rotate(${num * deg}deg)`;
    active === len ? (active = 0) : active++;
    activation(active, lists);

    if (nowIndex > -1 && nowIndex < 5) {
      nowIndex += 1;
    } else if (nowIndex === 5) {
      nowIndex = 0;
    }
    eventTarget.dispatchEvent(
      new CustomEvent("updateNowIndex", { detail: nowIndex })
    );
  });
};

buttonClicker();

const backImg = document.querySelector(".backImg");
console.log(backImg);

// nowIndex가 변경될 때마다 자동 감지
eventTarget.addEventListener("updateNowIndex", (event) => {
  // console.log("nowIndex 변경됨:", event.detail);
  const index = event.detail;
  backImg.style.backgroundImage = `url("./imgs/backflowers/backflowers${index}.jpg")`;
});

// 언제든 최신 nowIndex를 확인할 수 있음
setTimeout(() => {
  console.log("이벤트 후 nowIndex 값:", getNowIndex()); // 최신 값 출력 가능
}, 1000);

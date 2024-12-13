import { debounce, throttle } from "../../js/utils/timer-utils.js";

const WEEKS = "일월화수목금토";

const debounce = (cb, delay) => {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(cb, delay, ...args);
  };
};

const throttle = (cb, delay) => {
  let timer;
  return (...args) => {
    if (timer) return;
    timer = setTimeout(() => {
      cb(...args);
      timer = null;
    }, delay);
  };
};

const getNextWeek = () => {
  let widx = -1;
  return () => {
    // widx는 이 안에서만 사용 가능
    widx += 1; // side-effect!
    if (widx >= WEEKS.length) widx = 0;
    return `${WEEKS[widx]}요일`;
  };
};

const nextWeekFunction = {
  kor: getNextWeek(),
  math: getNextWeek(),
};

const setWeek = (subject) => {
  // console.log('setWeek',subject);
  // const nextWeekFn = subject == 'math' ? mathWeek : korWeek;
  document.getElementById(subject).innerText = nextWeekFunction[subject]();
};

const fnMath = throttle(setWeek, 500);

const debounceSearch = debounce((e) => {
  console.log(`${new Date()} search>> ${e.target.value}`);
});

window.addEventListener("load", () => {
  const fnKor = debounce(() => {
    setWeek("kor");
  }, 500);
  const fnMath = throttle(() => {
    setWeek("kor");
  }, 500);

  document.getElementById("btnKor").addEventListener("click", fnKor);
  document.getElementById("btnMath").addEventListener("click", fnMath);

  document.getElementById("search").addEventListener("keyup", debounceSearch);
});

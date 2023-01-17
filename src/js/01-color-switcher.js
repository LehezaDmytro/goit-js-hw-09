function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const btnStart = document.querySelector("[data-start]")
const btnStop = document.querySelector("[data-stop]")

btnStart.addEventListener('click', clickStart)
let intervalId = null;

function clickStart() {
    intervalId = setInterval(() => { document.body.style.backgroundColor = getRandomHexColor() }, 2000)
    btnStart.setAttribute("disabled", "")
    btnStop.removeAttribute("disabled")
}

btnStop.addEventListener('click', clickStop);

function clickStop() {
    clearInterval(intervalId)
    btnStart.removeAttribute("disabled")
    btnStop.setAttribute("disabled", "")
}

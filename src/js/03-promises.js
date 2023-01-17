import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form')
const { elements: { delay, step, amount } } = form;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
      resolve({position, delay})
    } else {
      reject({position, delay})
    }
    }, delay)
  })
}

form.addEventListener('submit', clickCreatePromice);
let totalStep = 0;
function clickCreatePromice(e) {
  e.preventDefault();
  for (let i = 1; i <= amount.value; i++) {
    createPromise(i, (Number(delay.value) + totalStep))
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    totalStep += Number(step.value)
  }
  totalStep = 0;
}
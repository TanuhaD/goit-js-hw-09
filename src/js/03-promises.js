import { Notify } from 'notiflix/build/notiflix-notify-aio';

function handleFormSubmit(event) {
  event.preventDefault();
  const delay = +event.currentTarget.elements.delay.value;
  const step = +event.currentTarget.elements.step.value;
  const amount = +event.currentTarget.elements.amount.value;
  for (let i = 0; i < amount; i += 1) {
    createPromise(i, delay + step * i)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        return 'Info';
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  console.log(delay);
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });

  return promise;
}

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', handleFormSubmit);

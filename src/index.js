import './styles.css';

const refs = {
  startBtn: document.querySelector('button[data-action-start]'),
  stopBtn: document.querySelector('button[data-action-stop]'),
  clockface: document.querySelector('.js-clockface'),
};

const timer = {
  intervalId: null,
  isActive: false,
  targetDate: new Date('Jul 12, 2020'),
  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    const startTime = Date.now();

    updateClockface(0);

    this.intervalId = setInterval(() => {
      const time = this.targetDate.getTime() - new Date().getTime();

      updateClockface(time);
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.isActive = false;
    updateClockface(0);
  },
};

refs.startBtn.addEventListener('click', timer.start.bind(timer));
refs.stopBtn.addEventListener('click', timer.stop.bind(timer));

function updateClockface(time) {
  /*
   * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
   * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
   */
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));

  /*
   * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
   * остатка % и делим его на количество миллисекунд в одном часе
   * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
   */
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );

  /*
   * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
   * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
   */
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

  /*
   * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
   * миллисекунд в одной секунде (1000)
   */
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  refs.clockface.textContent = `${days}:${hours}:${mins}:${secs}`;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

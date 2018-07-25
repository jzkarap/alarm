document.addEventListener('DOMContentLoaded', () => {

    let selections = document.querySelectorAll('.time');

    selections.forEach((selection) => {

        selection.addEventListener('click', (event) => {

            let seconds = event.currentTarget.dataset.time;

            addTime(Number(seconds)), startTimer.innerText = "START";
        })
    })

    startTimer.addEventListener('click', (event) => {
        if (countdownPossible === true) {
            pausePossible = false,
                alarm.pause(),
                startTimer.innerText = "Pause",
                tickTock();
        }
        else {
            clearInterval(secondsSlipAway),
                alarm.pause(),
                startTimer.innerText = "START",
                countdownPossible = true;
        }
    });
});

let countdownPossible = false;
let pausePossible = false;

let secondsSlipAway;

let startTimer = document.querySelector('#start-button');

let timer = document.querySelector('#countdown');

let start = document.querySelector('#start-button');

let interval = setInterval(1000);

let timeRemaining = timer.dataset.time;

function addTime(seconds) {
    alarm.pause();
    countdownPossible = true;
    timeRemaining = Number(timeRemaining) + Number(seconds);
    let secondsTotal = Number(timeRemaining);
    timer.innerText = convertSecondsToTimeDisplay(secondsTotal);
}

function convertSecondsToTimeDisplay(secondsTotal) {
    let hours = Math.floor(secondsTotal / 3600);
    let minutes = Math.floor((secondsTotal - (hours * 3600)) / 60);
    let seconds = secondsTotal - (hours * 3600) - (minutes * 60);

    if (String(hours).length === 1) {
        hours = "0" + hours;
    }
    if (String(minutes).length === 1) {
        minutes = "0" + minutes;
    }
    if (String(seconds).length === 1) {
        seconds = "0" + seconds;
    }

    return (String(hours + ':' + minutes + ':' + seconds));
};

let alarm = new Audio("alarm.mp3");

function tickTock() {
    pausePossible = true;

    if (pausePossible === true) {

        secondsSlipAway = setInterval(() => {

            countdownPossible = false;

            if (timeRemaining > 0 && pausePossible === true) {

                timeRemaining = Number(timeRemaining - 1);

                timer.innerHTML = convertSecondsToTimeDisplay(timeRemaining);
            }

            if (Number(timeRemaining) === 0) {
                timer.innerText = "TIME'S UP!!";
                clearInterval(secondsSlipAway);
                // var sound = document.getElementById("myAudio");

                alarm.play();
            }

        }, 1000);

    }

    if (timeRemaining === 0) {
        startTimer.innerText = "START";
        countdownPossible = true;
        pausePossible = false;
    }
}



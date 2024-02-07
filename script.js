let countdownInterval;
let stopwatchInterval;
let countDownDate;
let seconds = 0;
let minutes = 0;
let hours = 0;

const formatTime = (value) => (value < 10 ? `0${value}` : value);

const updateCountdownAndTime = () => {
  const now = new Date();
  const distance = countDownDate - now;

  const elapsedMilliseconds = now - new Date(countDownDate);
  const elapsedDays = Math.floor(elapsedMilliseconds / (1000 * 60 * 60 * 24));
  const elapsedMonths = Math.floor(elapsedDays / 30);
  const elapsedHours = Math.floor(
    (elapsedMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const elapsedMinutes = Math.floor(
    (elapsedMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );
  const elapsedSeconds = Math.floor((elapsedMilliseconds % (1000 * 60)) / 1000);

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const remainingHours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const remainingMinutes = Math.floor(
    (distance % (1000 * 60 * 60)) / (1000 * 60)
  );
  const remainingSeconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Determine the most appropriate units for countdown
  let countdownUnits = "";
  if (months > 0) {
    countdownUnits = `${months}m ${
      days % 30
    }d ${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s`;
  } else if (days > 0) {
    countdownUnits = `${days}d ${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s`;
  } else if (remainingHours > 0) {
    countdownUnits = `${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s`;
  } else if (remainingMinutes > 0) {
    countdownUnits = `${remainingMinutes}m ${remainingSeconds}s`;
  } else {
    countdownUnits = `${remainingSeconds}s`;
  }

  // Display countdown
  document.getElementById("countdown").innerHTML = countdownUnits;

  // Display elapsed time
  document.getElementById(
    "current-time"
  ).innerHTML = `Elapsed Time: ${elapsedMonths}m ${
    elapsedDays % 30
  }d ${elapsedHours}h ${elapsedMinutes}m ${elapsedSeconds}s`;

  // If the countdown is over, display a message
  if (distance < 0) {
    document.getElementById("countdown").innerHTML = "Event Happened!";
    document.getElementById(
      "current-time"
    ).innerHTML = `Event Time: ${formatTime(new Date(countDownDate))}`;
    stopStopwatch();
  }
};

const setCustomCountdown = () => {
  const eventInput = document.getElementById("event").value;
  const eventDateInput = document.getElementById("event-date").value;

  if (!eventInput || !eventDateInput) {
    alert("Please enter both the event and event date.");
    return;
  }

  countDownDate = new Date(eventDateInput).getTime();

  alert(`Countdown set for ${eventInput} on ${eventDateInput}`);

  // Clear previous intervals and start the new countdown interval
  clearInterval(countdownInterval);
  clearInterval(stopwatchInterval);
  startCountdown();
};

const startCountdown = () => {
  countdownInterval = setInterval(updateCountdownAndTime, 1000);
};

const startStopwatch = () => {
  clearInterval(countdownInterval);
  stopwatchInterval = setInterval(updateStopwatch, 1000);
};

const stopStopwatch = () => {
  clearInterval(stopwatchInterval);
};

const resetStopwatch = () => {
  clearInterval(stopwatchInterval);
  seconds = 0;
  minutes = 0;
  hours = 0;
  document.getElementById("stopwatch").innerHTML = "00:00:00";
};

const updateStopwatch = () => {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }

  const formattedTime = `${formatTime(hours)}:${formatTime(
    minutes
  )}:${formatTime(seconds)}`;
  document.getElementById("stopwatch").innerHTML = formattedTime;
};

// Initial call to start the countdown
startCountdown();

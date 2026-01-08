function countdownTimer(callback, delay) {
    const timerId = setTimeout(callback, delay);
    return timerId;
}

module.exports = countdownTimer;
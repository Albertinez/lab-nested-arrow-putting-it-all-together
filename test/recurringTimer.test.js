function recurringTimer(callback, interval) {
    const timerId = setInterval(callback, interval);
    return timerId;
}

function stopRecurringTimer(timerId) {
    clearInterval(timerId);
}

module.exports = {
    recurringTimer,
    stopRecurringTimer
};
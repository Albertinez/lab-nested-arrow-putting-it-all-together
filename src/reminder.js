function delayedReminder(message, delay) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(message);
        resolve(message);
      }, delay);
    });
  }
  
  module.exports = delayedReminder;
  
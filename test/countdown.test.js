const countdownTimer = require('../src/countdown');

test('countdownTimer returns a timer ID', () => {
  const timerId = countdownTimer(1);
  expect(typeof timerId).toBe('number');
  clearInterval(timerId); // cleanup
});

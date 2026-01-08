const delayedReminder = require('../src/reminder');

test('delayedReminder returns a Promise', async () => {
  const promise = delayedReminder('Hi', 10);
  expect(promise).toBeInstanceOf(Promise);
  await promise;
});

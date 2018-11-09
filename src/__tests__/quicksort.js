const quicksort = require('../quicksort');

test('quicksort', async () => {
  const data = [4, 2, 3, 1, 5, 8, 7, 6];

  quicksort(data);

  expect(data).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
});

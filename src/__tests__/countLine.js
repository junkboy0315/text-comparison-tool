const countLine = require('../countLine');

test('countLine', async () => {
  const data = await countLine(`${__dirname}/../../dummies/numSorted.txt`);

  expect(data).toBe(3000000);
});

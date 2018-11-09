const readPart = require('../readPart');

test('readPart', async () => {
  const data = await readPart(
    `${__dirname}/../../dummies/numSorted.txt`,
    123456,
    234567,
  );

  expect(data[0]).toBe('123456');
  expect(data[data.length - 1]).toBe('234567');
});

test('readPart', async () => {
  const data = await readPart(
    `${__dirname}/../../dummies/numSorted.txt`,
    2999990,
    3000010,
  );

  expect(data[0]).toBe('2999990');
  expect(data[data.length - 1]).toBe('3000000');
});

test('readPart', async () => {
  const data = await readPart(
    `${__dirname}/../../dummies/numSorted.txt`,
    3000010,
    3000020,
  );

  expect(data).toEqual([]);
});

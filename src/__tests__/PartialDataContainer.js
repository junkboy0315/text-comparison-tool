const PartialDataContainer = require('../PartialDataContainer');

test('PartialDataContainer', async () => {
  const mockGetPage = async pageNum => {
    switch (pageNum) {
      case 0: {
        return [1, 2, 3, 4];
      }
      case 1: {
        return [5, 6, 7];
      }
      case 2: {
        return [8, 9, 10, 11, 12];
      }
      default: {
        return [];
      }
    }
  };

  const instance = new PartialDataContainer({ getPage: mockGetPage });
  await instance.init();

  expect(instance.getNextData()).toBe(1);
  expect(instance.getNextData()).toBe(2);
  expect(instance.getNextData()).toBe(3);
  expect(instance.getNextData()).toBe(4);
  expect(instance.getNextData()).toBe(null);

  expect(await instance.getNextPage()).toBe(true);

  expect(instance.getNextData()).toBe(5);
  expect(instance.getNextData()).toBe(6);
  expect(instance.getNextData()).toBe(7);
  expect(instance.getNextData()).toBe(null);

  expect(await instance.getNextPage()).toBe(true);

  expect(instance.getNextData()).toBe(8);
  expect(instance.getNextData()).toBe(9);
  expect(instance.getNextData()).toBe(10);
  expect(instance.getNextData()).toBe(11);
  expect(instance.getNextData()).toBe(12);
  expect(instance.getNextData()).toBe(null);

  expect(await instance.getNextPage()).toBe(null);
  expect(await instance.getNextData()).toBe(null);
});

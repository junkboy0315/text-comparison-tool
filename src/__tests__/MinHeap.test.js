const MinHeap = require('../MinHeap');

test('MinHeap', async () => {
  const rand = () => Math.floor(Math.random() * 100);

  minHeap = new MinHeap();
  minHeap.insert({ value: 2 });
  minHeap.insert({ value: 7 });
  minHeap.insert({ value: 3 });
  minHeap.insert({ value: 1 });
  minHeap.insert({ value: 5 });
  minHeap.insert({ value: 4 });
  minHeap.insert({ value: 6 });

  expect(minHeap.arr).toEqual([
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 7 },
    { value: 5 },
    { value: 4 },
    { value: 6 },
  ]);

  expect(minHeap.shift()).toEqual({ value: 1 });

  expect(minHeap.arr).toEqual([
    { value: 2 },
    { value: 5 },
    { value: 3 },
    { value: 7 },
    { value: 6 },
    { value: 4 },
  ]);

  minHeap.insert({ value: 2 });

  expect(minHeap.arr).toEqual([
    { value: 2 },
    { value: 5 },
    { value: 2 },
    { value: 7 },
    { value: 6 },
    { value: 4 },
    { value: 3 },
  ]);

  expect(minHeap.shift()).toEqual({ value: 2 });
  expect(minHeap.shift()).toEqual({ value: 2 });
  expect(minHeap.shift()).toEqual({ value: 3 });
  expect(minHeap.shift()).toEqual({ value: 4 });
  expect(minHeap.shift()).toEqual({ value: 5 });
  expect(minHeap.shift()).toEqual({ value: 6 });
  expect(minHeap.shift()).toEqual({ value: 7 });
  expect(minHeap.shift()).toEqual(null);
});

const swap = (array, posA, posB) => {
  const temp = array[posA];
  array[posA] = array[posB];
  array[posB] = temp;
};

/**
 * 与えられた配列を昇順に並べ替える
 *
 * @param {array} array ソートしたい配列
 */
function quicksort(array) {
  // [{minPos, maxPos},.....]
  let task = [];

  task.push({ minPos: 0, maxPos: array.length - 1 });

  while (task.length) {
    const { minPos, maxPos } = task.pop();

    // Base Case　これ以上の処理が必要ない場合は終了する
    if (minPos >= maxPos) continue;

    // 最後の要素をpivotにする
    let pivot = array[maxPos];

    // クイックソートでは、pivotよりも小さい値を左側から詰めていく。
    // そのために、詰めるポジションを保持しておく変数。
    let leftWall = minPos;

    for (i = minPos; i < maxPos; i++) {
      if (array[i] <= pivot) {
        // pivotより小さい数字を見つけたら左から詰めていく
        swap(array, leftWall, i);

        // 数字を詰めたら、次回に詰めるポジションを一つずらしておく
        leftWall += 1;
      }
    }

    // 最後に、pivotとleftWallを入れ替えれば一巡が完了する
    // この時点で、このpivotは正しい位置にいる（左側は小さく、右側は大きい）
    swap(array, leftWall, maxPos);

    // leftWall = pivotのポジション
    task.push({ minPos, maxPos: leftWall - 1 });
    task.push({ minPos: leftWall + 1, maxPos });
  }
}

module.exports = quicksort;

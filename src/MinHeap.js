const swap = (array, posA, posB) => {
  const temp = array[posA];
  array[posA] = array[posB];
  array[posB] = temp;
};

class MinHeap {
  constructor() {
    this.arr = [];
  }

  /**
   * ツリーにノードを追加する
   *
   * @param {{value: any}} node
   */
  insert(node) {
    this.arr.push(node);

    if (this.arr.length === 1) return;

    const reorder = currentPos => {
      const parentPos = Math.floor((currentPos - 1) / 2);

      if (this.arr[parentPos].value > node.value) {
        swap(this.arr, parentPos, currentPos);

        const newPos = parentPos;

        // Base Case
        if (newPos === 0) return;

        reorder(newPos);
      }
    };

    const currentPos = this.arr.length - 1;
    reorder(currentPos);
  }

  /**
   * ツリーのトップにある要素を取得したうえで、ツリーを再構成する
   */
  shift() {
    // 要素がない場合はnullを返す
    if (this.arr.length === 0) {
      return null;
    }

    const node = this.arr[0];

    // 残りが1要素しかない場合は配列を空にして終了
    if (this.arr.length === 1) {
      this.arr = [];
      return node;
    }

    // 最後の要素を先頭へ移動
    this.arr[0] = this.arr.pop();

    const reorder = currentPos => {
      const leftPos = (currentPos + 1) * 2 - 1;
      const rightPos = leftPos + 1;

      const leftValue = this.arr[leftPos] && this.arr[leftPos].value;
      const rightValue = this.arr[rightPos] && this.arr[rightPos].value;

      // Base Case 末端まで走査が完了した場合は終了
      if (!leftValue && !rightValue) return;

      let smallerChildPos;

      // leftvalueしかない場合
      if (!rightValue) {
        smallerChildPos = leftPos;
      } else {
        smallerChildPos = rightValue < leftValue ? rightPos : leftPos;
      }

      if (this.arr[currentPos].value > this.arr[smallerChildPos].value) {
        swap(this.arr, smallerChildPos, currentPos);

        const newPos = smallerChildPos;

        reorder(newPos);
      }
    };

    reorder(0);

    return node;
  }

  showTree() {
    console.log(this.arr);
  }
}

module.exports = MinHeap;

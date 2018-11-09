class PartialDataContainer {
  constructor({ getPage } = {}) {
    this.getPage = getPage || function() {};
    this.currentPage = 0;
    this.currentPos = 0;
  }

  async init() {
    this.data = await this.getPage(this.currentPage);
  }

  /**
   * this.dataの内容を、呼び出されるたびに先頭から順番に返す
   */
  getNextData() {
    const head = this.data[this.currentPos];

    // もうデータが残っていない場合(this.dataの最後まで走査済みの場合)はnullを返す
    if (this.currentPos >= this.data.length) {
      return null;
    }

    this.currentPos += 1;
    return head;
  }

  /**
   * 次ページのデータを取得してthis.dataにセットする
   */
  async getNextPage() {
    this.currentPos = 0;
    this.currentPage += 1;

    this.data = await this.getPage(this.currentPage);

    // もう次ページが存在しない場合はnullを返す
    if (!(this.data.length > 0)) return null;

    // 次ページを取得できた場合はtrueを返す
    return true;
  }
}

module.exports = PartialDataContainer;

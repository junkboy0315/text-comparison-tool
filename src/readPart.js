const LineByLineReader = require('line-by-line');

/**
 * 指定したファイルの指定した行範囲を読み込み、Arrayとして返す
 *
 * @param {string} filename 読み込むファイルのパス
 * @param {number} from 読み込み開始行番号
 * @param {number} to 読み込み終了行番号
 */
const readPart = (filename, from, to) => {
  return new Promise(resolve => {
    const readStream = new LineByLineReader(filename);

    let lineNum = 0;
    let lines = [];

    readStream.on('line', line => {
      lineNum += 1;

      // 開始行に達していない場合はなにもしない
      if (lineNum < from) return;

      // 終了行を超えた場合は処理を終了して結果を返す
      if (lineNum > to) {
        readStream.close();
        return resolve(lines);
      }

      lines.push(line);
    });

    readStream.on('end', () => {
      return resolve(lines);
    });
  });
};

module.exports = readPart;

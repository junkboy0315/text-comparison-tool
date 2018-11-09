const LineByLineReader = require('line-by-line');

/**
 * 指定したファイルの指定した行範囲を読み込み、Arrayとして返す
 *
 * @param {string} filename 読み込むファイルのパス
 * @param {number} from 読み込み開始行番号
 * @param {number} to 読み込み終了行番号
 */
const countLine = filename => {
  return new Promise(resolve => {
    const readStream = new LineByLineReader(filename);

    let lineNum = 0;

    readStream.on('line', line => {
      lineNum += 1;
    });

    readStream.on('end', () => {
      return resolve(lineNum);
    });
  });
};

module.exports = countLine;

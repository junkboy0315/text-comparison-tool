const fs = require('fs');

const strategy = {
  // 呼ばれるたびにランダムな数値を返す(0-9,999,999)
  numRandom: () => Math.round(Math.random() * 1000 * 1000 * 10),

  // 呼ばれるたびにランダムな文字列を返す
  numRandomStr: () => {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 200; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  },

  // 呼ばれるたびに1から漸増する値を返す
  numSorted: (function() {
    let i = 0;
    return function() {
      return (i += 1);
    };
  })(),
};

// ストラテジの種類ごとにダミーファイルを作成する
for (strategyName of Object.keys(strategy)) {
  const writeStream = fs.createWriteStream(
    `${__dirname}/${strategyName}.txt`,
    'utf8',
  );

  for (i = 0; i < 3000000; i++) {
    writeStream.write(`${strategy[strategyName]()}\n`);
  }

  writeStream.end();
}

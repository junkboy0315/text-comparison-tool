const fs = require('fs');
const readline = require('readline');

const quicksort = require('./src/quicksort');
const readPart = require('./src/readPart');
const PartialDataContainer = require('./src/PartialDataContainer');
const MinHeap = require('./src/MinHeap');

// メモリ上に読み込む最大行数
const MAX_PROCESS_LINE = 500000;
// 変換元ファイル
const SOURCE_FILE = './dummies/numRandomStr.txt';

const showMemoryUsage = () => {
  const used = process.memoryUsage();
  const messages = [];
  for (let key in used) {
    messages.push(
      `${key}: ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`,
    );
  }
  console.log(new Date(), messages.join(', '));
};

const createChunkFiles = () => {
  var lineReader = readline.createInterface({
    input: fs.createReadStream(SOURCE_FILE, 'utf8'),
  });

  let lineNum = 0;
  let chunkNum = 0;
  let writeStream;

  writeStream = fs.createWriteStream(`./tmp/dest-${chunkNum}.txt`, 'utf8');

  lineReader.on('line', function(line) {
    lineNum += 1;

    if (lineNum > MAX_PROCESS_LINE) {
      writeStream.end();
      lineNum = 1;
      chunkNum += 1;
      writeStream = fs.createWriteStream(`./tmp/dest-${chunkNum}.txt`, 'utf8');
    }

    writeStream.write(line + `\n`);
  });

  lineReader.on('end', function() {
    writeStream.end();
  });
};

const createSortedChunkFiles = () => {
  const chunkFilesCount = fs.readdirSync('./tmp').length;

  for (i = 0; i < chunkFilesCount; i += 1) {
    // lineReader.on('close')のコールバックにiの値を正しく渡すためにクロージャを使う
    (function(i) {
      const lines = [];
      const lineReader = readline.createInterface({
        input: fs.createReadStream(`./tmp/dest-${i}.txt`, 'utf8'),
      });

      lineReader.on('line', function(line) {
        lines.push(line);
      });

      lineReader.on('close', () => {
        quicksort(lines);
        fs.writeFileSync(`./tmp-sorted/dest-${i}.txt`, lines.join('\n'));
      });
    })(i);
  }
};

const createPartialChunks = async () => {
  const chunkFilesCount = fs.readdirSync('./tmp-sorted').length;

  // +1 は処理用の一時領域分
  const maxLine = Math.floor(MAX_PROCESS_LINE / chunkFilesCount);

  // チャンクファイルの一部分(PartialDataContainer)の配列
  // 長さはチャンクファイル数と同じ
  const partialChunks = [];

  for (i = 0; i < chunkFilesCount; i++) {
    await (async function(i) {
      const partialDataContainer = new PartialDataContainer({
        getPage: page => {
          return readPart(
            `${__dirname}/tmp-sorted/dest-${i}.txt`,
            maxLine * page + 1,
            maxLine * (page + 1),
          );
        },
      });
      await partialDataContainer.init();
      partialChunks.push(partialDataContainer);
    })(i);
  }

  return partialChunks;
};

const writeStream = fs.createWriteStream('../dest.txt', 'utf8');
const minHeap = new MinHeap();

const kwayMerge = async partialChunks => {
  // ひとまずすべてのチャンクファイルの先頭から値を一つずつ取得してHeapに追加
  partialChunks.forEach((partialChunk, index) => {
    const node = {
      value: partialChunk.getNextData(),
      chunkNo: index,
    };
    minHeap.insert(node);
  });

  while (true) {
    // 最小ノードを取得
    const node = minHeap.shift();

    // 最小ノードがない場合は、すべての処理が完了したことを意味するので、ループを終了する
    if (node === null) break;

    // 最小ノードの値をファイルに書き込む
    writeStream.write(node.value + `\n`);

    const nextNode = {
      value:
        partialChunks[node.chunkNo] &&
        partialChunks[node.chunkNo].getNextData(),
      chunkNo: node.chunkNo,
    };

    if (nextNode.value) {
      minHeap.insert(nextNode);
      continue;
    }

    // データがない場合は次ページの存在を確認する
    // 　- 次ページあり => 次のループへ
    // 　- 次ページなし => 終了
    const hasNextPage =
      partialChunks[node.chunkNo] &&
      (await partialChunks[node.chunkNo].getNextPage());

    console.log('ChunkNo: ', node.chunkNo, 'hasNextPage: ', hasNextPage);

    if (hasNextPage) {
      const nextNode = {
        value: partialChunks[node.chunkNo].getNextData(),
        chunkNo: node.chunkNo,
      };
      minHeap.insert(nextNode);
    }
  }

  writeStream.close();
};

(async () => {
  // setInterval(() => showMemoryUsage(), 1000);
  // createChunkFiles();
  // createSortedChunkFiles();
  const partialChunks = await createPartialChunks();
  kwayMerge(partialChunks);
})();

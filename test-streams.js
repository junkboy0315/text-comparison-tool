const fs = require('fs');
var zlib = require('zlib');

const readStream = fs.createReadStream('sample.txt', 'utf8');
const deflateStream = zlib.createDeflate();
const writeStream = fs.createWriteStream('../dest.txt', 'utf8');

readStream.on('data', chunk => {
  console.log('---read start---');
  console.log(chunk);
  console.log('---read end ---');
  chunk.split('\n').forEach(line => {
    const buf = Buffer.from(line);
    const base64 = buf.toString('base64');
    writeStream.write(base64 + '-----');
    // zlib.deflate(line, function(err, result) {
    //   if (err) {
    //     console.error(err);
    //     process.exit(1);
    //   } else {

    //     writeStream.write(result);
    //     writeStream.write('-----\n');
    //   }
    // });
  });
});

// deflateStream.on('data', chunk => {
//   console.log('---deflate start---');
//   console.log(chunk);
//   console.log('---deflate end---');
//   writeStream.write(chunk);
// });

// readStream.on('end', () => {
//   deflateStream.end();
// });

// deflateStream.on('end', () => {
//   writeStream.end();
// });

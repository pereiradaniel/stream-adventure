var crypto = require('crypto');
var tar = require('tar');
var zlib = require('zlib');
var concat = require('concat-stream');

var parser = new tar.Parse();
parser.on('entry', function(e) {
  if (e.type !== 'File') return;

  var h = crypto.createHash('md5', {
    encoding: 'hex'
  });
  e.pipe(h).pipe(concat(function(hash) {
    console.log(hash + ' ' + e.path);
  }));
});

var cipher = process.argv[2];
var pw = process.argv[3];
process.stdin
  .pipe(crypto.createDecipher(cipher, pw))
  .pipe(zlib.createGunzip())
  .pipe(parser);


// Creates this error:

/*
TAP version 13
# (anonymous)
ok 1 stream-adventure verify YOURFILE.js
not ok 2 should be equal
  ---
    operator: equal
    expected:
      '97911dcc607865d621029f6f927c7851 secretz/METADATA.TXT\n2cdcfa9f8bbefb82fb7a894964b5c199 secretz/SPYING.TXT\n'
    actual:
      ''
    at: ConcatStream.<anonymous> (/usr/local/lib/node_modules/stream-adventure/node_modules/concat-stream/index.js:36:43)
  ...
ok 3 successful exit code

1..3
# tests 3
# pass  2
# fail  1

*/

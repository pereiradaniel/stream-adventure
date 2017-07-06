var spawn = require('child_process').spawn;
var duplex= require('duplexer2');
module.exports = function(cmd,args){
  var stream = spawn(cmd, args);
  return duplex(stream.stdin, stream.stdout);
}

// Here's the reference solution:
/*
  var spawn = require('child_process').spawn;
  var duplexer = require('duplexer2');
  
  module.exports = function (cmd, args) {
      var ps = spawn(cmd, args);
      return duplexer(ps.stdin, ps.stdout);
  };
*/



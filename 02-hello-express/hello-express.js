var e = require('express');
var a = e();

a.get('/', function(req, res) {
  res.send('Hello, Steve!');
});

a.listen(8080);

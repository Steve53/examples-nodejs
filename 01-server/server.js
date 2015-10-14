http = require("http");

function onRequest (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Steve\n");
  response.end();
}

srv = http.createServer(onRequest);

srv.listen(8888);

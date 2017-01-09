var request = require('request');

request('https://www.googleapis.com/discovery/v1/apis',

  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(request.headers);
      console.log(response.headers)
    }
  }
)

// http://www.tiny-website.com/
// https://www.googleapis.com/discovery/v1/apis

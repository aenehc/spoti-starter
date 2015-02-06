var request       = require('superagent'),
    querystring   = require('querystring'),
    gui           = global.window.nwDispatcher.requireNwGui();


module.exports = {

  init: function () {

    console.log('init spotify API');

    request.get('http://localhost:8000/auth', function (err, res) {
      if (!err) {
        var authorizeURL = res.text;
        gui.Window.open(authorizeURL);
      }

    });

  }

};

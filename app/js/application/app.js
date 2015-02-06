var Spotify       = require('../libs/spotify.js'),
    BaseComponent = require('../views/baseRender.react.jsx');


module.exports = {

  init: function () {
    Spotify.init();
    BaseComponent.init();
  }

};

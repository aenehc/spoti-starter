var express           = require('express'),
    SpotifyWebApi     = require('spotify-web-api-node'),
    bodyParser        = require('body-parser'),
    app               = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



var clientId      = 'your client_id',
    redirectUri   = 'http://localhost:8000/callback',
    scopes        = ['playlist-modify-private',
                     'playlist-modify-public',
                     'streaming',
                     'user-follow-modify',
                     'user-library-modify',
                     'playlist-read-private',
                     'user-follow-read',
                     'user-library-read',
                     'user-read-email'];

var spotifyApi = new SpotifyWebApi({
  redirectUri : redirectUri,
  clientId    : clientId
});

var credentials = {
  clientId      : clientId,
  clientSecret  : 'your secret client_id',
  redirectUri   : redirectUri
};


// FIRST CALL TO /AUTHORIZE (KINDA)
app.get('/auth', function (req, res) {

  var authorizeURL = spotifyApi.createAuthorizeURL(scopes, null);
  res.send(authorizeURL);

});


// SECOND CALL TO /API/TOKEN
app.get('/callback', function (req, res) {

  var spotifyApi = new SpotifyWebApi(credentials),
      code       = req.query.code || null;

  spotifyApi.authorizationCodeGrant(code)
    .then(function(data) {
      console.log('The token expires in ' + data['expires_in']);
      console.log('The access token is ' + data['access_token']);
      console.log('The refresh token is ' + data['refresh_token']);

      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(data['access_token']);
      spotifyApi.setRefreshToken(data['refresh_token']);

      spotifyApi.getMe()
        .then(function(data) {
          console.log('Some information about the authenticated user', data);
        }, function(err) {
          console.log('Something went wrong!', err);
        });

    }, function(err) {
      console.log('Something went wrong!', err);
    });

});


app.get('/refresh', function (req, res) {

  var spotifyApi = new SpotifyWebApi(credentials);

  spotifyApi.refreshAccessToken()
  .then(function(data) {
    console.log('The access token has been refreshed!');
  }, function(err) {
    console.log('Could not refresh access token', err);
  });

});


app.listen(8000, function () {
  console.log('server started...');
});

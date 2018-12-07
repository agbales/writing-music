const express = require('express');
const path = require('path');
const app = express();
const helmet = require('helmet');
const compression = require('compression');
const request = require('request');

require('dotenv').config();

app.use(helmet());
app.use(compression());
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/spotifyToken', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  // console.log('SPOTIFY_CLIENT_ID', process.env.SPOTIFY_CLIENT_ID);
  // console.log('SPOTIFY_CLIENT_SECRET', process.env.SPOTIFY_CLIENT_SECRET);
  // console.log('Spotify authOptions (server)', authOptions);

  request.post(authOptions, function(error, response, body) {
    console.log('response body', body);
    if (!error && response.statusCode === 200) {
      res.json({ token: body.access_token });
    }
  });
});

app.listen(process.env.PORT || 3001);
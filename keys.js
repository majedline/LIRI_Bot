console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.bandsintown = {
  id: "codingbootcamp"
};

exports.omdb = {
  id: process.env.OMDB_KEY
};
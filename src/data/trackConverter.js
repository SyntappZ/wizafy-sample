const durationConverter = millis => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

const convertTracks = (data, image) => {
  
  const tracks = [];
  

  data.forEach(track => {
  
    track = track.track || track;
    
    if (track.id) {
      tracks.push({
        id: track.id,
        title: track.name.split("-")[0],
        artist: track.artists[0].name.split("-")[0],
        image: image ? image : track.album.images[1].url,
        duration: durationConverter(track.duration_ms),
        preview: track.preview_url,
        uri: track.uri,
        href: track.href,
        favorite: track.favorite,
        year: track.year
      });
    }
  });
  console.log(tracks)
  return tracks;
};

const convertDescription = str => str.replace(/<.+">|<\/a>/g, "");

export { convertTracks, convertDescription };

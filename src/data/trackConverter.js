const durationConverter = millis => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

const convertTracks = (data, url, image) => {
  const isAlbum = /albums/i.test(url);
  const tracks = [];
  data = isAlbum ? data.tracks : data;

  data.items.forEach(track => {
    const year = track.added_at ? track.added_at.split("-")[0] : null;

    track = track.track || track;
    
    if (track.id) {
      tracks.push({
        id: track.id,
        title: track.name.split("-")[0],
        artist: track.artists[0].name.split("-")[0],
        image: isAlbum ? image : track.album.images[1].url,
        duration: durationConverter(track.duration_ms),
        preview: track.preview_url,
        uri: track.uri,
        href: track.href,
        year: year
      });
    }
  });
  return tracks;
};

const convertDescription = str => str.replace(/<.+">|<\/a>/g, "");

export { convertTracks, convertDescription };

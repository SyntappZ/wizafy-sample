const durationConverter = millis => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

export const convertTracks = (data, isTrack, url, image) => {
 const isAlbum = (/albums/i).test(url);

   data = isAlbum ? data.tracks : data

  
 
  const tracks = data.items.map(track => {
    
    const year = track.added_at ? track.added_at.split("-")[0] : null;
    track = isTrack ? track.track : track;
    
    return {
      id: track.id,
      title: track.name.split("-")[0],
      artist: track.artists[0].name.split("-")[0],
      image: isAlbum ? image : track.album.images[1].url,
      duration: durationConverter(track.duration_ms),
      preview: track.preview_url,
      uri: track.uri,
      href: track.href,
      year: year
    };
  });
  return tracks;
};

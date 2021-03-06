import defaultImage from "../images/no-image.png";

const durationConverter = (millis) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

const convertTracks = (data, image) => {
  const tracks = [];

  data.forEach((track) => {
    track = track.track || track;

    const trackImage = track.album
      ? track.album.images.length > 0
        ? track.album.images[1].url || track.album.images[0].url
        : defaultImage
      : image;

    if (track.id) {
      tracks.push({
        id: track.id,
        title: track.name.split("-")[0],
        artist: track.artists[0].name.split("-")[0],
        image: trackImage,
        duration: durationConverter(track.duration_ms),
        preview: track.preview_url,
        uri: track.uri,
        href: track.href,
        favorite: track.favorite,
        year: track.year,
      });
    }
  });

  return tracks;
};

const convertDescription = (str) => str.replace(/<.+">|<\/a>/g, "");

export { convertTracks, convertDescription };

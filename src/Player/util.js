
// parse LRC
export function parseLRC(lrcText) {
  let lines = lrcText.split('\n');

  let lyrics = []; // { time: xxx, text: xxx }
  lines.forEach(function (line) {
    let timeTags = line.match(/\[\d*:[0-9.]*\]/g);
    if (timeTags) {
      let text = line.replace(/\[.*\]/, '').trim();
      timeTags.forEach(function (tag) {
        let timeArr = tag.slice(1, -1).split(':');
        let minute = parseInt(timeArr[0]);
        let second = parseFloat(timeArr[1]);
        let time = Math.round((minute * 60 + second) * 1000) / 1000;
        lyrics.push({ time, text });
      });
    }
  });

  lyrics.sort(function (a, b) {
    return a.time - b.time;
  });

  return lyrics;
}

// convert 123.02 to 02:03
export function getTimeStr(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return `${minutes}:${seconds}`;
}

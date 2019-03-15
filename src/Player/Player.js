import React, { Component } from 'react';
import { parseLRC } from './util';
import LyricBox from './LyricBox';
import ControlBar from './ControlBar';
import './Player.css';

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
  }

  state = {
    currentLine: 0,
    lrcContent: [],
    isPlaying: false,
    playedTime: 0, // seconds
    bufferedTime: 0,
    songInfo: {
      songUrl: 'http://song-test.com/ywcbs.mp3',
      albumUrl: 'http://song-test.com/ywcbs.jpg',
      lrcUrl: 'http://song-test.com/ywcbs.lrc',
      songTitle: '一万次悲伤',
      artist: '逃跑计划',
    }
  }

  loadLRC() {
    // loadLrc
    fetch(this.state.songInfo.lrcUrl)
      .then(res => res.text())
      .then(lrc => {
        this.setState({
          lrcContent: parseLRC(lrc),
        });
      });
  }

  componentWillMount() {
    this.loadLRC();
  }

  componentDidMount() {
    
  }

  refreshUI = () => {
    const audioRef = this.audioRef.current;
    let playedTime = audioRef.played.end(0);
    let bufferedTime = audioRef.buffered.end(0);
    // get currentLine
    let currentLine = 0;
    for (let index = 0; index < this.state.lrcContent.length; index++) {
      const { time } = this.state.lrcContent[index];
      if (time >= playedTime) {
        break;
      }
      currentLine = index;
    }
    this.setState({
      currentLine,
      playedTime,
      bufferedTime
    });
    // this.state
    if (this.state.isPlaying) {
      window.requestAnimationFrame(this.refreshUI);
    }
  }

  pause = () => {
    this.audioRef.current.pause();
    this.setState({
      isPlaying: false,
    });
  }

  play = () => {
    this.audioRef.current.play();
  }

  onPlaying = () => {
    this.setState({
      isPlaying: true,
    });
    window.requestAnimationFrame(this.refreshUI);
  }

  onStop = () => {
    this.setState({
      currentLine: 0,
      isPlaying: false,
    });
  }


  render() {
    const { songInfo } = this.state;
    return (
      <div className='player'>
        <div className='panel'>
          <AlbumCover
            imgUrl={songInfo.albumUrl}
            isPlaying={this.state.isPlaying}
            onPause={this.pause}
            onPlay={this.play} />
          <div className='right'>
            <SongInfo
              songTitle={songInfo.songTitle}
              artist={songInfo.artist} />
            <ControlBar
              playedTime={this.state.playedTime}
              bufferedTime={this.state.bufferedTime} />
          </div>
        </div>
        <LyricBox
          currentLine={this.state.currentLine}
          lrcContent={this.state.lrcContent} />
        <audio
          ref={this.audioRef}
          src={songInfo.songUrl}
          onPlaying={this.onPlaying}
          // onDurationChange={console.log}
          // onLoadedMetadata={console.log}
          onEnded={this.onStop}
          onCanPlayThrough={null}
          style={{ display: 'none' }}
          preload='auto' ></audio>
      </div>
    );
  }
}

function AlbumCover(props) {
  let playBtnClass = 'play-btn';
  playBtnClass += props.isPlaying ? ' pause' : ' playing';
  return (
    <div className='cover' style={{
      backgroundImage: `url(${props.imgUrl})`
    }}>
      <div
        className={playBtnClass}
        onClick={props.isPlaying ? props.onPause : props.onPlay}></div>
    </div>
  );
}

function SongInfo(props) {
  return (
    <div className='song-info'><span className='song-title'>{props.songTitle}</span> - <span className='artist'>{props.artist}</span></div>
  );
}

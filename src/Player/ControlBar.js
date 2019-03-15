import React, { Component } from 'react';
import { getTimeStr } from './util';

export default class ControlBar extends Component {
  render() {
    const { playedTime, bufferedTime } = this.props;
    return (
      <div className='control-bar'>
        <div className='progress-bar'>
          <div className='progress-click'></div>
          <div className='progress-played' style={{
            width: `${playedTime / bufferedTime * 100}%`
          }}>
            <div className='progress-thumb'></div>
          </div>
          <div className='progress-loaded'></div>
        </div>
        <div className='time'>{getTimeStr(playedTime)} / {getTimeStr(bufferedTime)}</div>
      </div>
    );
  }
}

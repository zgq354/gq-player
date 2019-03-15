import React, { Component } from 'react';

export default class LyricBox extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.currentLine === nextProps.currentLine && this.props.lrcContent === nextProps.lrcContent) {
      return false;
    }
    return true;
  }

  render() {
    // console.log('rendering lrcbox');
    const itemHeight = 28;
    return (
      <div className="lyric">
        <div className="lyric-wrapper">
          <ul
            className="lyric-list"
            style={{
              transform: `translateY(${-itemHeight * this.props.currentLine}px)`
            }}>
            {
              this.props.lrcContent.map((line, index) => {
                return (
                  <li
                    key={index}
                    className={index === this.props.currentLine ? 'current' : null}
                    >
                    {line.text}
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

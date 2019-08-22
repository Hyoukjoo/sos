import React from 'react';
import TimePicker from 'react-times';

// use material theme
import '../scss/css/material/default.css';
// or you can use classic theme
import '../scss/css/classic/default.css';

export default class SomeComponent extends React.Component {
  onTimeChange(options) {
    // do something
  }

  onFocusChange(focusStatue) {
    // do something
  }

  render() {
    return (
      <div style={{ width: '200px' }}>
        <TimePicker
          theme='classic'
          onFocusChange={this.onFocusChange.bind(this)}
          onTimeChange={this.onTimeChange.bind(this)}
        />
      </div>
    );
  }
}

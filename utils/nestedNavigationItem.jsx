import React from 'react';

export default React.createClass({
  render() {
    return (
      <span style={{display: "inline-block", marginLeft: "15"}}>
        {this.props.children}
      </span>
    );
  }
});

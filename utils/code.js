import React from 'react';

module.exports = React.createClass({
  render() {
    return (
      <pre>
        <code>
          {this.props.children}
        </code>
      </pre>
    )
  }
});

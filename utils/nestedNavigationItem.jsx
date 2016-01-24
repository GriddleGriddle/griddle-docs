import React from 'react';

export default React.createClass({
  render() {
    return (
      <span className="nestedNavigationItem">
        {this.props.children}
      </span>
    );
  }
});

import React, { PropTypes } from 'react';

module.exports = React.createClass({
  propTypes: {
    body: PropTypes.string
  },

  render() {
    return <div dangerouslySetInnerHTML={{__html: this.props.body}} />
  }
})

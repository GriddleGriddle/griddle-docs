import React, { Component, PropTypes } from 'react';
import Markdown from 'markdown-react-js';

export default class NewMarkdown extends Component {
  static propTypes = {
    children: React.PropTypes.string.isRequired
  }

  render() {
    return <Markdown text={this.props.children} />
  }
}
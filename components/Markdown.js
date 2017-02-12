import React, { Component, PropTypes } from 'react';
import Markdown from 'markdown-react-js';

export default class NewMarkdown extends Component {
  static propTypes = {
    children: React.PropTypes.string,
    text: React.PropTypes.string
  }

  render() {
    return <Markdown text={this.props.text || this.props.children} />
  }
}
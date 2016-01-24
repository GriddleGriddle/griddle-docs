import React from 'react';
import DocumentTitle from 'react-document-title';
import Markdown from 'utils/markdown';

import { DefaultModules } from 'griddle-render'
const { RowDefinition, ColumnDefinition } = DefaultModules;

import Griddle from 'griddle-react';
import * as plugins from '../../../../pluginDirectory';

function getPluginData() {
  let result = [];

  for(let key in plugins) {
    if(key !== 'default') {
      result.push({
        title: plugins[key].title,
        author: plugins[key].author,
        link: `https://github.com/${plugins[key].githubLink}`,
        markdown: require(`./pages/${plugins[key].documentationMarkdown}`)
      });
    }
  }

  return result;
}

const HtmlContainer = React.createClass({
  createMarkup() {
    return { __html: this.props.children };
  },

  render() {
    return (
      <span dangerouslySetInnerHTML={this.createMarkup()} />
    )
  }
});

const Card = React.createClass({
  render() {
    return (
      <div>
        <h4>{this.props.title}</h4>
        <small>{this.props.author}</small>
        <HtmlContainer>{this.props.markdown.body}</HtmlContainer>
      </div>
    );
  }
});

const Repeater = React.createClass({
  render() {
    return <div>{this.props.data.map(d => <Card {...d} />)}</div>
  }
});

module.exports = React.createClass({
  statics: {
    metadata: function() {
      return {
        order: 1,
        title: "Plugin Directory"
      }
    }
  },

  render() {
    return (
      <DocumentTitle title={`${module.exports.metadata().title} | ${this.props.config.siteTitle}`}>
        <div>
          <h1>{module.exports.metadata().title}</h1>
          <Griddle data={getPluginData()} components={{Table: Repeater}} />
        </div>
      </DocumentTitle>
    )
  }
})

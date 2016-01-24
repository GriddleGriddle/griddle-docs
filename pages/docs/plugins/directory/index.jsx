import React from 'react';
import DocumentTitle from 'react-document-title';
import Markdown from 'utils/markdown';

import { DefaultModules } from 'griddle-render'
const { RowDefinition, ColumnDefinition } = DefaultModules;

import Griddle from 'griddle-react';
import * as plugins from '../../../../pluginDirectory';
import NestedNavigationItem from '../../../../utils/nestedNavigationItem';

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
    const {author, link, markdown, title} = this.props;

    return (
      <div>
        <h4>
          <a href={link}>{title}</a>
        </h4>
        <small>{author}</small>
        <HtmlContainer>{markdown.body}</HtmlContainer>
        <a href={link}>
          View the project on GitHub
        </a>
      </div>
    );
  }
});

const Repeater = React.createClass({
  render() {
    return <div>{this.props.data.map(d => <Card {...d} />)}</div>
  }
});

const Empty = React.createClass({
  render() { return <span />}
})

module.exports = React.createClass({
  statics: {
    metadata: function() {
      return {
        order: 3.3,
        title: <NestedNavigationItem>Plugin Directory</NestedNavigationItem>
      }
    }
  },

  render() {
    return (
      <DocumentTitle title={`${module.exports.metadata().title} | ${this.props.config.siteTitle}`}>
        <div>
          <h1>{module.exports.metadata().title}</h1>
          <Griddle data={getPluginData()} components={{Table: Repeater, Pagination: Empty, SettingsToggle: Empty}} />
        </div>
      </DocumentTitle>
    )
  }
})

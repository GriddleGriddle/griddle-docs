import React from 'react';
import DocumentTitle from 'react-document-title';
import Markdown from 'utils/markdown';

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
    const a = getPluginData();
    return (
      <DocumentTitle title={`${module.exports.metadata().title} | ${this.props.config.siteTitle}`}>
        <div>
          <h1>{module.exports.metadata().title}</h1>
        </div>
      </DocumentTitle>
    )
  }
})

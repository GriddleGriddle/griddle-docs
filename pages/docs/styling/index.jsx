import React from 'react';
import DocumentTitle from 'react-document-title';
import Markdown from 'utils/markdown';

import Griddle from 'griddle-test';
import { DefaultModules } from 'griddle-render';
import { getBasicData } from 'utils/data';

import intro from './_intro.md';

module.exports = React.createClass({
  statics: {
    metadata: function() {
      return {
        order: 3,
        title: "Styling"
      }
    }
  },

  render() {
    const data = getBasicData();

    const settings = {
      useGriddleStyles: false
    }

    const style = {
      inlineStyles: {
        filter: { border: "5px solid #FF00FF"}
      }
    }

    const iconStyle = {
      icons: {
        sortAscending: '(asc)',
        sortDescending: '(desc)'
      }
    }


    return (
      <DocumentTitle title={`${module.exports.metadata().title} | ${this.props.config.siteTitle}`}>
        <div>
          <h1>{module.exports.metadata().title}</h1>
          <Markdown {...intro} />

          <Griddle data={data} settings={settings} />
          <Griddle data={data} style={style} />
          <Griddle data={data} style={iconStyle} />
        </div>
      </DocumentTitle>
    );
  }
})

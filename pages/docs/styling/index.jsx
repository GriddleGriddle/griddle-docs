import React from 'react';
import DocumentTitle from 'react-document-title';
import Markdown from 'utils/markdown';

import Griddle from 'griddle-test';
import { DefaultModules } from 'griddle-render';
import { getBasicData } from 'utils/data';

import intro from './_intro.md';
import disable from './_disable.md';
import override from './_override.md';
import icons from './_icons.md';

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
          <Markdown {...disable} />
          <Griddle data={data} settings={settings} />
          <Markdown {...override} />
          <Griddle data={data} style={style} />
          <Markdown {...icons} />
          <Griddle data={data} style={iconStyle} />
        </div>
      </DocumentTitle>
    );
  }
})

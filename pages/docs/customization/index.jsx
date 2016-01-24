import React from 'react';
import DocumentTitle from 'react-document-title';
import Markdown from 'utils/markdown';

import Griddle from 'griddle-react';
import { DefaultModules } from 'griddle-render';
import { getBasicData, getWeatherData } from 'utils/data';

import intro from './_intro.md';

module.exports = React.createClass({
  statics: {
    metadata: function() {
      return {
        order: 2,
        title: "Customization"
      }
    }
  },

  render() {
    const data = getBasicData();
    const weatherData = getWeatherData();

    const {RowDefinition, ColumnDefinition} = DefaultModules;

    return (
      <DocumentTitle title={`${module.exports.metadata().title} | ${this.props.config.siteTitle}`}>
        <div>
          <h1>{module.exports.metadata().title}</h1>
          <Markdown {...intro} />

        </div>
      </DocumentTitle>
    );
  }
})

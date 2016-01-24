import React from 'react';
import DocumentTitle from 'react-document-title';
import Markdown from 'utils/markdown';

import Griddle from 'griddle-react';
import GriddleSelectionPlugin from 'griddle-selection-plugin';

import { getBasicData } from 'utils/data';

import NestedNavigation from '../../../utils/nestedNavigationItem';

import usingPlugins from './_usingPlugins.md';

module.exports = React.createClass({
  statics: {
    metadata: function() {
      return {
        order: 3.1,
        title: <NestedNavigation>Using Plugins</NestedNavigation>
      }
    }
  },

  render() {
    const data = getBasicData();

    return (
      <DocumentTitle title={`${module.exports.metadata().title} | ${this.props.config.siteTitle}`}>
        <div>
          <h1>{module.exports.metadata().title}</h1>

          <Markdown {...usingPlugins} />

          <Griddle data={data}
            columns={['name', 'state']}
            plugins={[GriddleSelectionPlugin]}
          />


        </div>
      </DocumentTitle>
    );
  }
});

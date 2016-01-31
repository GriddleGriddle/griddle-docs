import React from 'react';
import DocumentTitle from 'react-document-title';
import Markdown from 'utils/markdown';

import Griddle from 'griddle-react';
import { getBasicData } from 'utils/data';
import disable from './_disable.md';
import NestedNavigation from '../../../utils/nestedNavigationItem';

module.exports = React.createClass({
  statics: {
    metadata: function() {
      return {
        order: 4.1,
        title: <NestedNavigation>Disable Griddle Styles</NestedNavigation>
      }
    }
  },

  render() {
    const data = getBasicData(0);
    const settings = {
      useGriddleStyles: false
    }

    return (
      <DocumentTitle title={`${module.exports.metadata().title} | ${this.props.config.siteTitle}`}>
        <div>
          <h1>{module.exports.metadata().title}</h1>
          <Markdown {...disable} />
          <Griddle data={data} settings={settings} />
        </div>
      </DocumentTitle>
    );
  }
})


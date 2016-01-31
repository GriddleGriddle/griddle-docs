import React from 'react';
import DocumentTitle from 'react-document-title';
import Markdown from 'utils/markdown';

import Griddle from 'griddle-react';
import { getBasicData } from 'utils/data';
import override from './_override.md';
import NestedNavigation from '../../../utils/nestedNavigationItem';

module.exports = React.createClass({
  statics: {
    metadata: function() {
      return {
        order: 4.2,
        title: <NestedNavigation>Inline Styles</NestedNavigation>
      }
    }
  },

  render() {
    const data = getBasicData(0);
    const style = {
      inlineStyles: {
        filter: { border: "5px solid #FF00FF"}
      }
    }

    return (
      <DocumentTitle title={`${module.exports.metadata().title} | ${this.props.config.siteTitle}`}>
        <div>
          <h1>{module.exports.metadata().title}</h1>

          <Markdown {...override} />
          <Griddle data={data} style={style} />
        </div>
      </DocumentTitle>
    );
  }
})


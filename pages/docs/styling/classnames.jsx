import React from 'react';
import DocumentTitle from 'react-document-title';
import Markdown from 'utils/markdown';

import Griddle from 'griddle-react';
import { DefaultModules } from 'griddle-render';
import { getBasicData } from 'utils/data';
import NestedNavigation from '../../../utils/nestedNavigationItem';

import classnames from './_classnames.md';

module.exports = React.createClass({
  statics: {
    metadata: function() {
      return {
        order: 4.3,
        title: <NestedNavigation>Classnames</NestedNavigation>
      }
    }
  },

  render() {
    const data = getBasicData();

    const style = {
      classNames: {
        table: 'awesome-table-class'
      }
    };

    return (
      <DocumentTitle title={`${module.exports.metadata().title} | ${this.props.config.siteTitle}`}>
        <div>
          <h1>{module.exports.metadata().title}</h1>
          <Markdown {...classnames} />

          <Griddle data={data} style={style} />
        </div>
      </DocumentTitle>
    );
  }
});

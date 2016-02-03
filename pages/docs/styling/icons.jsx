import React from 'react';
import DocumentTitle from 'react-document-title';
import Markdown from 'utils/markdown';

import Griddle from 'griddle-react';
import { getBasicData } from 'utils/data';
import icons from './_icons.md';
import NestedNavigation from '../../../utils/nestedNavigationItem';

const Ascending = React.createClass({
  render() {
    return <span style={{backgroundColor: "#FF00AA"}}>(asc)</span>
  }
});

const Descending = React.createClass({
  render() {
    return <span style={{backgroundColor: "#AA00FF"}}>(desc)</span>
  }
});


module.exports = React.createClass({
  statics: {
    metadata: function() {
      return {
        order: 4.3,
        title: <NestedNavigation>Icons</NestedNavigation>,
        pageTitle: 'Icons'
      }
    }
  },

  render() {
    const data = getBasicData(0);
    const iconStyle = {
      icons: {
        sortAscending: <Ascending />,
        sortDescending: <Descending />
      }
    }

    return (
      <DocumentTitle title={`${module.exports.metadata().pageTitle} | ${this.props.config.siteTitle}`}>
        <div>
          <h1>{module.exports.metadata().title}</h1>

          <Markdown {...icons} />
          <Griddle data={data} style={iconStyle} />
        </div>
      </DocumentTitle>
    );
  }
})


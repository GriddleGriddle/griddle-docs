import React from 'react';
import DocumentTitle from 'react-document-title';
import Markdown from 'utils/markdown';

import Griddle from 'griddle-react';
import { DefaultModules } from 'griddle-render';
const {RowDefinition, ColumnDefinition} = DefaultModules;

import NestedNavigation from '../../../utils/nestedNavigationItem';
import { getBasicData } from 'utils/data';

import customColumn1 from './_custom_column1.md';
import customColumn2 from './_custom_column2.md';

const LinkData = React.createClass({
  render() {
    return <a href="#">{this.props.data}</a>
  }
});


module.exports = React.createClass({
  statics: {
    metadata: function() {
      return {
        order: 2.1,
        title: <NestedNavigation>Custom Columns</NestedNavigation>
      }
    }
  },

  render() {
    const data = getBasicData();
    return (
      <DocumentTitle title={`${module.exports.metadata().title} | ${this.props.config.siteTitle}`}>
          <div>
            <h1>{module.exports.metadata().title}</h1>
            <Markdown {...customColumn1} />

            <Griddle data={data}>
              <RowDefinition keyColumn="id">
                <ColumnDefinition id="name" customComponent={LinkData} />
                <ColumnDefinition id="state" />
              </RowDefinition>
            </Griddle>
            <Markdown {...customColumn2} />
          </div>
      </DocumentTitle>
    )

  }
})



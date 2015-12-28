import React from 'react';
import DocumentTitle from 'react-document-title';
import { Container, Grid, Breakpoint, Span } from 'react-responsive-grid';
import { margins } from 'utils/layout';
import Code from 'utils/code';
import { getBasicData } from 'utils/data';
import Markdown from 'utils/markdown';

import helloWorld from './quickstart/_helloWorld.md';
import moreAdvanced1 from './quickstart/_moreAdvanced1.md';
import moreAdvanced2 from './quickstart/_moreAdvanced2.md';
import moreAdvanced3 from './quickstart/_moreAdvanced3.md';

import Griddle from 'griddle-test';
import { DefaultModules } from 'griddle-render';

module.exports = React.createClass({
  statics: {
    metadata: function() {
      return {
        order: 0,
        title: "Quickstart"
      };
    }
  },

  render() {
    const data = getBasicData();

    return (
      <DocumentTitle title={`${module.exports.metadata().title} | ${this.props.config.siteTitle}`}>
          <div>
            <h1>{module.exports.metadata().title}</h1>
            <Markdown {...helloWorld} />
            <Griddle data={data} />

            <Markdown {...moreAdvanced1} />
            <Griddle data={data} columns={['name', 'state']} />

            <Markdown {...moreAdvanced2} />
            <Griddle data={data}>
              <DefaultModules.RowDefinition keyColumn="id">
                <DefaultModules.ColumnDefinition id="name" order={2} />
                <DefaultModules.ColumnDefinition id="state" order={1} />
              </DefaultModules.RowDefinition>
            </Griddle>

            <Markdown {...moreAdvanced3} />
        </div>
      </DocumentTitle>
    )
  }
})




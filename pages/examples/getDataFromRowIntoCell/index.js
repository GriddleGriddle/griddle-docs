import React, { Component } from 'react';

import { config } from 'config';
import DocumentTitle from 'react-document-title';
import Markdown from 'components/Markdown';

import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';

exports.data = {
  title: 'Get data from Row into Cell',
  order: 4
}

const intro = `
Griddle supports getting data from Row into Cell.
`

export default class extends Component {
  render() {
    const page = this.props.route.page;

    const sortProperties = [
      { id: 'name', sortAscending: true }
    ];

    return (
      <DocumentTitle title={`${page.data.title} | ${config.siteTitle}`}>
        <div>
          <Markdown text={intro} />
        </div>
      </DocumentTitle>
    );
  }
}

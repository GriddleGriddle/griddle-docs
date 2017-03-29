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

First we need two helpers: row data selector and wrapper:
\`\`\`js
import { connect } from 'react-redux';

const rowDataSelector = (state, { griddleKey }) => {
  return state
    .get('data')
    .find(rowMap => rowMap.get('griddleKey') === griddleKey)
    .toJSON();
};

const enhancedWithRowData = connect((state, props) => {
  return {
    // rowData will be available into MyCustomComponent
    rowData: rowDataSelector(state, props)
  };
});
\`\`\`

MyCustomComponent:

\`\`\`js
function MyCustomComponent({ value, griddleKey, rowData }) {
  // rowData
}
\`\`\`

With helpers declared above ColumnDefinition customComponent has access to Row data:

\`\`\`js
return (
  <Griddle
    data={yourData}
    plugins={[plugins.LocalPlugin]}
  >
    <RowDefinition>
      <ColumnDefinition
        id="someKey"
        title="My Title"
        customComponent={enhancedWithRowData(MyCustomComponent)}
      />
    </RowDefinition>
  </Griddle>
);
\`\`\`
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

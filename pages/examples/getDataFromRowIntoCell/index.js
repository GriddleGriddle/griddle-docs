import React, { Component } from 'react';
import { connect } from 'react-redux';
import { config } from 'config';
import DocumentTitle from 'react-document-title';
import Markdown from 'components/Markdown';

import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import fakeData from 'utils/fakeData';

exports.data = {
  title: 'Get data from Row into Cell',
  order: 4
}

const intro = `
#### Griddle supports getting data from Row into Cell.

First we need two helpers: row data selector and connect-wrapper:
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
  return (
    <div className="MyCustomComponent">
      Person <strong>{value}</strong> from city: <em>{rowData.city}</em>
    </div>
  );
}
\`\`\`

With enhancedWithRowData helper customComponent will have access to Row data:

\`\`\`js
const data = [
  {
    "name": "Mayer Leonard",
    "city": "Kapowsin"
  },
  {
    "name": "Koch Becker",
    "city": "Johnsonburg"
  }
];

<Griddle
  data={data}
  plugins={[plugins.LocalPlugin]}
  components={{
    Layout: ({ Table }) => <Table />
  }}
  pageProperties={{
    pageSize: 2
  }}
  >
  <RowDefinition>
    <ColumnDefinition
      id="name"
      title="Persons"
      customComponent={enhancedWithRowData(MyCustomComponent)}
    />
  </RowDefinition>
</Griddle>
\`\`\`
`

const rowDataSelector = (state, { griddleKey }) => {
  return state
    .get('data')
    .find(rowMap => rowMap.get('griddleKey') === griddleKey)
    .toJSON();
};

const enhancedWithRowData = connect((state, props) => {
  return {
    rowData: rowDataSelector(state, props)
  };
});

function MyCustomComponent({ value, griddleKey, rowData }) {
  return (
    <div className="MyCustomComponent">
      Person <strong>{value}</strong> from city: <em>{rowData.city}</em>
    </div>
  );
}

export default class extends Component {
  render() {
    const page = this.props.route.page;

    return (
      <DocumentTitle title={`${page.data.title} | ${config.siteTitle}`}>
        <div>
          <Markdown text={intro} />

          <hr/>
          <p>Example:</p>

          <Griddle
            data={fakeData}
            plugins={[plugins.LocalPlugin]}
            components={{
              Layout: ({ Table }) => <Table />
            }}
            pageProperties={{
              pageSize: 2
            }}
          >
            <RowDefinition>
              <ColumnDefinition
                id="name"
                title="Persons"
                customComponent={enhancedWithRowData(MyCustomComponent)}
              />
            </RowDefinition>
          </Griddle>
        </div>
      </DocumentTitle>
    );
  }
}

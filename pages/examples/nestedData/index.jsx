import React, { Component } from 'react';

import { config } from 'config';
import DocumentTitle from 'react-document-title';
import Markdown from 'components/Markdown';

import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import fakeData from 'utils/fakeData';

exports.data = {
  title: 'Nested data',
  order: 4
}

const intro = `
Griddle supports nested data. Assuming we have a dataset that looks like:

\`\`\`
[
  {
    "id": 0,
    "name": "Mayer Leonard",
    "location": {
      "country": "United Kingdom",
      "city": "Kapowsin",
      "state": "Hawaii",
    },
    "company": "Ovolo",
    "favoriteNumber": 7
  },
  ...
]
\`\`\`

We can use state from location if we define Griddle like this:

\`\`\`
  <Griddle data={localData} plugins={[plugins.LocalPlugin]}>
    <RowDefinition>
      <ColumnDefinition id="name" />
      <ColumnDefinition id="location.state" title="State" />
    </RowDefinition>
  </Griddle>
\`\`\`

`;

const localData = [
  {
    "id": 0,
    "name": "Mayer Leonard",
    "location": {
      "country": "United Kingdom",
      "city": "Kapowsin",
      "state": "Hawaii",
    },
    "company": "Ovolo",
    "favoriteNumber": 7
  },
  {
    "id": 1,
    "name": "Koch Becker",
    "location": {
      "city": "Johnsonburg",
      "state": "New Jersey",
      "country": "Madagascar",
    },
    "company": "Eventage",
    "favoriteNumber": 2
  },
  {
    "id": 2,
    "name": "Lowery Hopkins",
    "location": {
      "city": "Blanco",
      "state": "Arizona",
      "country": "Ukraine",
    },
    "company": "Comtext",
    "favoriteNumber": 3
  },
  {
    "id": 3,
    "name": "Walters Mays",
    "location": {
      "city": "Glendale",
      "state": "Illinois",
      "country": "New Zealand",
    },
    "company": "Corporana",
    "favoriteNumber": 6
  },
  {
    "id": 4,
    "name": "Shaw Lowe",
    "location": {
      "city": "Coultervillle",
      "state": "Wyoming",
      "country": "Ecuador",
    },
    "company": "Isologica",
    "favoriteNumber": 2
  },
  {
    "id": 5,
    "name": "Ola Fernandez",
    "location": {
      "city": "Deltaville",
      "state": "Delaware",
      "country": "Virgin Islands (US)",
    },
    "company": "Pawnagra",
    "favoriteNumber": 7
  },
];
export default class extends Component {
  render() {
    const page = this.props.route.page;

    const sortProperties = [
      { id: 'name', sortAscending: true }
    ];

    return (
      <DocumentTitle title={`${page.data.title} | ${config.siteTitle}`}>
        <div>
          <Griddle data={localData} plugins={[plugins.LocalPlugin]} components={{ SettingsToggle: () => <span /> }}>
            <RowDefinition>
              <ColumnDefinition id="name" />
              <ColumnDefinition id="location.state" title="State" />
            </RowDefinition>
          </Griddle>
          <hr />
          <Markdown text={intro} />
        </div>
      </DocumentTitle>
    );
  }
}
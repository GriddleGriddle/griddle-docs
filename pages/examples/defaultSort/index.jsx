import React, { Component } from 'react';

import { config } from 'config';
import DocumentTitle from 'react-document-title';
import Markdown from 'components/Markdown';

import Griddle, { plugins } from 'griddle-react';
import fakeData from 'utils/fakeData';

exports.data = {
  title: 'With a default sort',
  order: 4
}

const intro = `
To supply a default sort in Griddle we need to define a \`sortProperties\` prop and pass into Griddle:

\`\`\`
const sortProperties = [
  { id: 'name', sortAscending: true }
];

...

<Griddle
  data={fakeData} 
  plugins={[plugins.LocalPlugin]}
  sortProperties={sortProperties}
/>
\`\`\`
`;

export default class extends Component {
  render() {
    const page = this.props.route.page;

    const sortProperties = [
      { id: 'name', sortAscending: true }
    ];

    return (
      <DocumentTitle title={`${page.data.title} | ${config.siteTitle}`}>
        <div>
          <Griddle
            data={fakeData} 
            components={{ SettingsToggle: () => <span /> }}
            plugins={[plugins.LocalPlugin]}
            sortProperties={sortProperties}
          />
          <hr />
          <Markdown text={intro} />
        </div>
      </DocumentTitle>
    );
  }
}
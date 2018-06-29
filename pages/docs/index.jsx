import React from 'react'
import DocumentTitle from 'react-document-title'
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';

import Markdown from 'components/Markdown';
import fakeData from 'utils/fakeData';

import { config } from 'config'

exports.data = {
  title: 'Getting started',
  order: 5
}

const gettingStarted = `
  Include Griddle in your project:

  \`npm install --save griddle-react@beta\`

  Add Griddle to your project:

  \`\`\`
  import React from 'react';
  import Griddle from 'griddle-react';
  \`\`\`
  (or \`var Griddle = require('griddle-react').default;\` if using commonjs. [See here for example usage](https://github.com/ryanlanciaux/griddle-gulp-test/blob/master/scripts/testComponent.js#L3))

  Define an array of data (ours looks a little like this):

  \`\`\`
  var data = [
    {
      "id": 0,
      "name": "Mayer Leonard",
      "city": "Kapowsin",
      "state": "Hawaii",
      "country": "United Kingdom",
      "company": "Ovolo",
      "favoriteNumber": 7
    },
    ...
  ];
  \`\`\`

  #### Control data locally ####

  We are going to assume that we have all the data in the front-end and want Griddle to control the filtering / sorting / pagination for us. We need to import the \`Local\` Plugin from Griddle to achieve this.

  \`\`\`
    import Griddle, { plugins } from 'griddle-react';
  \`\`\`

  #### Render your component ####

  \`\`\`
    ...
    <Griddle
      data={data}
      plugins={[plugins.LocalPlugin]}
    />
  \`\`\`
`

const gettingStarted2 = `
  You'll notice that filtering, sorting, and pagination work out of the box. But lets say you want to only render the \`name\`, \`state\`, and \`company\` columns and want to customize the column titles.

  We can achieve that with some of Griddle's basic customization options.
`;

const customization = `
  ## Basic Customization ##
  #### Import RowDefinition and ColumnDefinition ####

  \`\`\`
    import Griddle, { plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
  \`\`\`

  #### Create a custom component for linking from the state column ####

  Griddle has the concept of custom components for columns and column headings. We are going to gloss over this for now but please see [customization](customization/) for more on this. All the information we need to know is we will receive a value prop.

  \`\`\`
  const customLocationComponent = ({value}) => <a href={\`https://www.google.com/maps/place/$\{value\}/>\`} target="_blank">{value}</a>
  \`\`\`
  #### Use these configuration components in Griddle definition ####

  \`\`\`
    <Griddle
      data={data}
      plugins={[plugins.LocalPlugin]}
    >
      <RowDefinition>
        <ColumnDefinition id="name" title="Name" />
        <ColumnDefinition id="state" title="Location" order={1} width={400} />
        <ColumnDefinition id="company" title="Organization" />
      </RowDefinition>
    </Griddle>
  \`\`\`
`

const customization2 = `

  These customization options are pretty rudimentary but CustomComponents can do way way more than what we're doing here. These components can \`connect\` into Griddle's state and get a lot more information or hook into outside stores/API's etc. Even with all this, we've only scratched the surface of what we can do to customize Griddle. In the [customization section](customization/), we will learn more about how much customization we can apply to Griddle (spoilers: its a lot).
`

const customLocationComponent = ({value}) => <a href={`https://www.google.com/maps/place/${value}/>`} target="_blank">{value}</a>

const SomeReactCode = React.createClass({
  render () {
    const page = this.props.route.page

    return (
      <DocumentTitle title={`${page.data.title} | ${config.siteTitle}`}>
        <div>
          <h1>Getting Started</h1>
          <Markdown text={gettingStarted} />
          <Griddle
            data={fakeData}
            plugins={[plugins.LocalPlugin]}
            components={{ SettingsToggle: () => <span /> }}
            styleConfig={{ styles: { Pagination: { marginBottom: 20 }} }}
          />
          <Markdown text={gettingStarted2} />
          <hr />
          <Markdown text={customization} />
          <Griddle
            data={fakeData}
            plugins={[plugins.LocalPlugin]}
            components={{ SettingsToggle: () => <span /> }}
            styleConfig={{ styles: { Pagination: { marginBottom: 20 }} }}
          >
            <RowDefinition>
              <ColumnDefinition id="name" title="Employee Name" />
              <ColumnDefinition id="state" title="Location" order={1} width={400} customComponent={customLocationComponent} />
              <ColumnDefinition id="company" title="Organization" />
            </RowDefinition>
          </Griddle>
          <Markdown text={customization2} />
        </div>
       </DocumentTitle>
    )
  },
})

export default SomeReactCode

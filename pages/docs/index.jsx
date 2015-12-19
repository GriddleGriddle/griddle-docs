import React from 'react';
import DocumentTitle from 'react-document-title';
import { Container, Grid, Breakpoint, Span } from 'react-responsive-grid';
import { margins } from 'utils/layout';
import Code from 'utils/code';
import { getBasicData } from 'utils/data';

import Griddle, { DefaultModules } from 'griddle-test';

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
          <p>Griddle is in npm as griddle-react. Simply install Griddle and react from npm:</p>
          <Code>npm install react griddle-react</Code>

          <p>From there, require react and griddle modules and you should be ready to create your grid!</p>

          <Code>{
            `import React from 'react';
import Griddle from 'griddle-react';`}
          </Code>

          <p>Define an array of JSON objects -- for our examples we have
            something that resembles the following:</p>

          <Code>{
`var fakeData =  [
{
  "January": 35,
  "February": 20,
  "March": 27,
  "April": 32,
  "May": 23,
  "June": 42
},
...
];`}
          </Code>

          <p>From there render your Griddle component passing in the fake data as the data property.</p>

          <Code>{`<Griddle results={fakeData}/>`}</Code>

          <Griddle data={data} />

          <h2>More advanced example</h2>
          <p>
            For many applications, simple paging and sorting is not enough.
            Griddle is built with flexibility in mind. Assuming we want to keep the same data
            but only show Name and City, we could achieve this with the following:
          </p>

          <Code>
            {`<Griddle data={fakeData} columns={['name', 'state']} />`}
          </Code>

          <Griddle data={data} columns={['name', 'state']} />

          <p>
            It should be noted that this code above is a shorthand version of a more robust way of defining properties. We'll see in the customization and plugin sections
            why the longer form may be better for some scenarios but if you're only defining a couple of properties the columns prop is perfect. The longer version of defining
            properties is as follows:
          </p>

          <Code>
{`<Griddle data={data}>
  <RowDefinition keyColumn="id">
    <ColumnDefinition id="name" order={2} />
    ColumnDefinition id="state" order={1} />
  </RowDefinition>
</Griddle>

`}
          </Code>

          <Griddle data={data}>
            <DefaultModules.RowDefinition keyColumn="id">
              <DefaultModules.ColumnDefinition id="name" order={2} />
              <DefaultModules.ColumnDefinition id="state" order={1} />
            </DefaultModules.RowDefinition>
          </Griddle>

          <p>
            This example is providing very similar functionality to the shorthand version above, however, there are additional properties we can give to the columns as well such as "order" among
            other things. You may notice state is showing up before name now (matching the order) -- even if you check and uncheck the column's visibility. <a href="#">For more on these properties, check out the "Customization" section</a> (TODO: put in the actual link).
          </p>
        </div>
      </DocumentTitle>
    )
  }
})




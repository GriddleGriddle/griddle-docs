import React from 'react';
import Markdown from '../components/Markdown';

import Griddle, { RowDefinition, ColumnDefiniton, plugins } from 'griddle-react';
import fakeData from 'utils/fakeData';

import GriddleMap from 'components/GriddleMap';
import GriddleList from 'components/GriddleList';

const reimagined = `
  ## Reimagined with customization in mind ##

  The new Griddle 1.0 has been re-built with customization in mind. It ships with some basic conventions and functionality but gives you the ability to customize just about anything (components, methods, etc). To encourage customization reuse, Griddle now has plugin support!
`;

const pluginSection = `
  ## Plugins ##

  Plugins are packaged Griddle customizations that can be reused or shared. Want to group styles and behavior that are shared throughout your organization or have some great idea you want to share with the world through npm? Plugins are the way to achieve this!
`;

const whatsNew = `
  ## What's new ##

  1. [New module architecture](docs/architecture/)
  1. [First class plugin support](docs/plugins/)
  1. [Customize just about anything](docs/customization/)
`

const lists = `
  ## Griddle is not just a data grid ##

  By default, Griddle is a datagrid -- however, it's a bit more than a datagrid. Through its customizable and pluggable architecture, Griddle turns into a component for rendering lists of data.
`
const quickStart = `
  ## Quick start ##

  Include Griddle in your project:

  \`npm install --save griddle-react\`

  Add Griddle to your project:

  \`\`\`
  import React from 'react';
  import Griddle from 'griddle-react';
  \`\`\`
  (or \`var Griddle = require('griddle-react').default;\` if using commonjs. [See here for example usage](https://github.com/ryanlanciaux/griddle-gulp-test/blob/master/scripts/testComponent.js#L3))

  Define an array of data:

  \`\`\`
  var data = [
    { one: 'one', two: 'two', three: 'three' }
    { one: 'uno', two: 'dos', three: 'tres' }
    { one: 'ichi', two: 'ni', three: 'san' }
  ];
  \`\`\`

  Return Griddle in your render method:

  \`\`\`
    ...
    <Griddle data={data} />
  \`\`\`

  We're only scratching the surface of what we can do with Griddle.
`
const Center = ({children}) => (
  <div style={{width: '100%', textAlign: 'center' }}>{children}</div>
);

export default class extends React.Component {
  render() {

  const Layout = ({Table, Pagination, Filter, SettingsWrapper, className, style}) => (
    <div className={className} style={style}>
      <div style={{ float: 'left', width: '50%' }}>
        <Filter />
      </div>
      <Pagination />
      <Table />
    </div>
  );

  const NextButton = ({ hasNext, onClick, style, className, text }) => hasNext ? (
    <button type="button" onClick={onClick} style={style} className={className}>{text}</button>
  ) :
  null;


  const PreviousButton = ({ hasPrevious, onClick, style, className, text }) => hasPrevious ? (
    <button type="button" onClick={onClick} style={style} className={className}>{text}</button>
  ) :
  null;

  return (
    <div>
      <Center>
        <h1 className="banner">Griddle is an ultra customizable datagrid component for React.</h1>
      </Center>
      <Griddle
        data={fakeData}
        plugins={[plugins.LocalPlugin]}
        components={{
          Layout
        }}
        pageProperties={{
          pageSize: 5
        }}
        styleConfig={{
          styles: {
            Pagination: { textAlign: 'right' }
          }
        }}
      />
      <Markdown text={reimagined} />
      <Markdown text={pluginSection} />
      <Markdown text={whatsNew} />
      <Markdown text={lists} />
      <hr />
      <div>
        <h3 style={{margin: 0 }}>This is Griddle</h3>
        <small>(you can still filter using Griddle's filter component and state management -- e.g. search for 'simpson')</small>
      </div>
      <GriddleMap width={920} height={400} />
      <Center>
        <a className='styled' href="/Griddle/examples/asMap/">Learn how to configure Griddle to render as a map</a>
      </Center>
      <hr />
      <div>
        <h3 style={{margin: 0 }}>This is too!</h3>
      </div>
      <GriddleList />
      <Center>
        <a className='styled' href="/Griddle/examples/asList/">Learn how to configure Griddle to render as a list</a>
      </Center>

      <Markdown text={quickStart} />
      <Center>
        <a className='styled' href="docs/">Continue to documentation</a>
      </Center>
      <hr />

      <h3 style={{ marginBottom: 0 }}>Looking for version 0.x docs?</h3>
      <a className='styled' href='https://griddlegriddle.github.io/v0-docs/'>Version 0.x docs available here</a>

    </div>
  )
  }
}

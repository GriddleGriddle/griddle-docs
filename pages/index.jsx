import React from 'react';
import Markdown from '../components/Markdown';

import Griddle, { RowDefinition, ColumnDefiniton, plugins } from 'griddle-react';
import fakeData from 'utils/fakeData';


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

  1. [New module architecture]()
  1. [First class plugin support]()
  1. [Customize just about anything]()
`

const gettingStarted = `
  ## Getting started ##

  Include Griddle in your project:

  \`npm install --save griddle-react@beta\`

  Add Griddle to your project:

  \`\`\`
  import React from 'react';
  import Griddle from 'griddle-react';
  \`\`\`

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

  We're only scratching the surface of what we can do with Griddle. [Lets learn some more!]()
`

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
      <Markdown>
       {`# Griddle is an ultra customizable datagrid component for React. #
        `}
      </Markdown>
      <Griddle
        data={fakeData}
        plugins={[plugins.LocalPlugin]}
        components={{
          Layout
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
      <Markdown text={gettingStarted} />
    </div>
  )
  }
}
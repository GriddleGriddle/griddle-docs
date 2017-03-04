import React, { Component, PropTypes } from 'react';
import DocumentTitle from 'react-document-title'
import Markdown from 'components/Markdown';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import { connect } from 'react-redux';

import { config } from 'config';
import fakeData from 'utils/fakeData';

exports.data = {
  title: 'Plugin List',
  order: 5
}

const localDescription = `
  This plugin is used to allow Griddle to manage the state of the Grid locally. By default, Griddle is totally controlled with the given data -- adding this plugin to Griddle enables client-side pagination, filtering, sorting, etc.
`

const localInstallation = `
  This plugin currently ships with Griddle. Running \`npm install griddle-react --save\` installs the local plugin as well. This plugin can be included by \`import Griddle, { plugins }\` and then referencing \`plugins.localPlugin\`.
`

const positionDescription = `
  This plugin allows removes pagination and instead provides virtual scrolling support. Virtual scrolling will render a different set of visible rows when scrolling.
`

const positionInstallation = `
  This plugin currently ships with Griddle. Running \`npm install griddle-react --save\` installs the position plugin as well. This plugin can be included by \`import Griddle, { plugins }\` and then referencing \`plugins.positionPlugin\`.
`

const pluginList = [
  { 
    id: 'LocalPlugin',
    title: 'LocalPlugin',
    link: '',
    tldrReadme: localDescription,
    installation: localInstallation,
  },
  {
    id: 'PositionPlugin',
    title: 'PositionPlugin',
    link: '',
    tldrReadme: positionDescription,
    installation: positionInstallation,
  }
];


const CustomRowComponent = connect((state, props) => ({
  rowData: plugins.LocalPlugin.selectors.rowDataSelector(state, props)
}))(({ rowData }) => (
  <div style={{
    backgroundColor: "#FBFBFB",
    border: "1px solid #AAA",
    padding: 15,
    margin: "10px 0 10px 0",
  }}>
    <h1>{rowData.title}</h1>
    <Markdown text={rowData.tldrReadme} />
    <Markdown text={rowData.installation} />
    { rowData.link !== '' && <a href={rowData.link}>Learn more about this plugin</a> }
  </div>
));

// HoC for overriding Table component to just render the default TableBody component
// We could use this entirely if we wanted and connect and map over visible rows but 
// Using this + tableBody to take advantange of code that Griddle LocalPlugin already has
const CustomTableComponent = OriginalComponent => class CustomTableComponent extends Component {
  static contextTypes = {
    components: React.PropTypes.object
  }

  render() {
    return <this.context.components.TableBody />
  }
}

const CustomTableBody = ({ rowIds, Row, style, className }) => (
  <div style={style} className={className}>
    { rowIds && rowIds.map(r => <Row key={r} griddleKey={r} />) }
  </div>
);

class PluginList extends Component {
  render() {
    return (
      <Griddle
        data={pluginList}
        components={{
          Row: CustomRowComponent,
          TableContainer: CustomTableComponent,
          TableBody: CustomTableBody,
          SettingsToggle: (props) => null
        }}
      />
    );
  }
}

export default PluginList;
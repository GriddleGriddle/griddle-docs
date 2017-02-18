import React, { Component } from 'react';

import Griddle, { plugins } from 'griddle-react';
import fakeData from 'utils/fakeData';
import { connect } from 'react-redux';

const CustomRowComponent = connect((state, props) => ({
  rowData: plugins.LocalPlugin.selectors.rowDataSelector(state, props)
}))(({ rowData }) => (
  <div style={{
    backgroundColor: "#EEE",
    border: "1px solid #AAA",
    padding: 5,
    margin: "10px 0 10px 0",
  }}>
    <h1>{rowData.name}</h1>
    <ul>
    <li><strong>State</strong>: {rowData.state}</li>
    <li><strong>Company</strong>: {rowData.company}</li>
    </ul>
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

export default () => (
  <Griddle
    data={fakeData}
    pageProperties={{
      pageSize: 5
    }}
    plugins={[plugins.LocalPlugin]}
    components={{
      Row: CustomRowComponent,
      TableContainer: CustomTableComponent,
      TableBody: CustomTableBody,
      SettingsToggle: (props) => null
    }}
  />

)

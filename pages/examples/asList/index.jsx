import React, { Component } from 'react';

import { config } from 'config';
import DocumentTitle from 'react-document-title';
import Markdown from 'components/Markdown';

import GriddleList from 'components/GriddleList';

exports.data = {
  title: 'As a list of "cards"',
  order: 0
}

const intro = `
  ## Introduction ##

  Assuming that we want to display a list of cards but still take advantage of Griddle for local state management (with the local plugin) we can do so as follows:

  We are assuming that we are going to use the \`LocalPlugin\` so we're going to tie directly into one of the selectors it ships with to get the current row's data. There is a \`selectors\` item on
  context also that is a merged object of all the selectors + plugins selectors but that can be a bit too magical at times.

  ### Override Row ###

  \`\`\`
    import { connect } from 'react-redux';

    const CustomRowComponent = connect((state, props) => ({
      rowData: plugins.LocalPlugin.selectors.rowDataSelector(state, props)
    }))(({ rowData }) => (
      <div style={{
        backgroundColor: "#EDEDED",
        border: "1px solid #777",
        padding: 5,
        margin: 10,
      }}>
        <h1>{rowData.name}</h1>
        <ul>
        <li><strong>State</strong>: {rowData.state}</li>
        <li><strong>Company</strong>: {rowData.company}</li>
        </ul>
      </div>
    ));
  \`\`\`

  This will give us the rowData and we could directly plug this in on the components prop as \`Row\` but we will still get some of the containing table. We are going to override the \`TableContainer\` to only render
  Griddle's TableBody component and override the TableBody component so it's a \`div\` instead of a \`tbody\` element.

  ### Override TableContainer and TableBody ###

  \`\`\`
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
  \`\`\`

  We could do all the row mapping in just the new \`CustomTableComponent\` but overridng the \`TableBody\` view component allows us to take advantage of some other code built into Griddle
  for only rendering current visible rows (basically using \`TableBodyContainer\` and the selectors it interacts with).

  Container components are HoCs but we're not really using the \`OriginalComponent\` in this example.

  ### Set Components in Griddle ###

  \`\`\`
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
      }}
    />
  \`\`\`

Now we can take advantage of all of the functionality provided by core Griddle and the LocalPlugin with the addition of our added components. If this was functionality that we wanted to reuse, we could wrap these components up as a Plugin.
`;

export default class extends Component {
  render() {
    const page = this.props.route.page;

    return (
      <DocumentTitle title={`${page.data.title} | ${config.siteTitle}`}>
        <div>
          <GriddleList />
          <hr />
          <Markdown text={intro} />
        </div>
      </DocumentTitle>
    );
  }
}
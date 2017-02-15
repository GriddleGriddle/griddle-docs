import React, { Component, PropTypes } from 'react';
import DocumentTitle from 'react-document-title'
import Markdown from 'components/Markdown';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';

import { config } from 'config';
import fakeData from 'utils/fakeData';

exports.data = {
  title: 'Controlled Griddle',
  order: 6
}

const start = `
  # Customization #

  Rather than only relying on default behavior, Griddle allows you to have complete control over what's being displayed. To do this, Griddle allows you to pass in the data, paging information, and events that you can hook into so that it can respond to anything you throw at it.

  ## Page Properties ##

  The current page, amount of results, as well as how many results should be displayed can be controlled by passing in a \`pageProperty\` property.

  \`\`\`
    <Griddle
      ...
      pageProperties={{
        currentPage: 1,
        pageSize: 10,
        recordCount: 100,
      }}
    />
  \`\`\`

  ## Events ##

  Almost any action that happens within Griddle can be responded to by passing in an \`events\` configuration property.

  \`\`\`
  <Griddle
    ...
    events={{
      onFilter: (filterText) => {},
      onSort: (sortProperties) => {},
      onNext: () => {},
      onPrevious: () => {},
      onGetPage: (pageNumber) => {},
    }}
  />
  \`\`\`
`

const apiExample = `
  ## API Example ##
  Using the properties noted above, we're able to make our table load data from an API pretty easily.

  In this example, we'll be making a component that wraps Griddle that will load new data when paging through data. For example purposes, this is going to be a simple function that receives all relevant table state properties and updates the values passed into Griddle.
`

const fakeLoadDataFromAPI = (page, pageSize, callback) => {
  setTimeout(() => {
    callback({
      data: fakeData.slice(page, pageSize),
      page,
    });
  }, 500);
}

class APITable extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: fakeData.slice(0, 5),
      page: 1,
      pageSize: 5,
    };
  }

  render() {
    const { data, page, pageSize } = this.state;
    return (
      <Griddle
        data={data}
        pageProperties={{
          page,
          pageSize,
        }}
        events={{
          onNext: () => {},
          onPrevious: () => {},
          onGetPage: (pageNumber) => {},
        }}
        components={{
          SettingsToggle: () => <span />
        }}
      />
    );
  }

  updateTableState({ data, page }) {
    this.setState({ data, page });
  }

  _onNext = () => {
    const { page, pageSize } = this.state;
    fakeLoadDataFromAPI(page + 1, pageSize, this.updateTableState);
  }

  _onPrevious = () => {
    fakeLoadDataFromAPI(page - 1, pageSize, this.updateTableState);
  }

  _onGetPage = (pageNumber) => {
    fakeLoadDataFromAPI(pageNumber, pageSize, this.updateTableState);
  }
}



const NewLayout = ({ Table, Pagination, Filter, SettingsWrapper, style, className }) => (
  <div className={className} style={style}>
    <div style={{ float: 'left', width: '50%' }}>
      <Filter />
    </div>
    <Pagination />
    <Table />
  </div>
);

class Filter extends Component {
  static propTypes = {
    setFilter: PropTypes.func.isRequired
  }

  onChange = (e) => {
    this.props.setFilter(e.target.value);
  }

  render() {
    return (
      <select onChange={this.onChange}>
        <option value="">All</option>
        <option value="Michigan">Michigan</option>
        <option value="Ohio">Ohio</option>
        <option value="Indiana">Indiana</option>
      </select>
    );
  }
}

const CustomColumn = ({value}) => <span style={{ color: '#0000AA' }}>{value}</span>;
const CustomHeading = ({title}) => <span style={{ color: '#AA0000' }}>{title}</span>;

const Customization = React.createClass({
  render () {
    const page = this.props.route.page

    return (
      <DocumentTitle title={`${page.data.title} | ${config.siteTitle}`}>
        <div>
          <Markdown text={start} />

          <Griddle data={fakeData} plugins={[plugins.LocalPlugin]}>
            <RowDefinition>
              <ColumnDefinition id="name" customComponent={CustomColumn} />
              <ColumnDefinition id="state" customHeadingComponent={CustomHeading} />
              <ColumnDefinition id="company" />
            </RowDefinition>
          </Griddle>

          <Markdown text={componentCustomization} />

          <Griddle
            data={fakeData}
            plugins={[plugins.LocalPlugin]}
            pageProperties={{
              pageSize: 5
            }}
            components={{
              Filter,
              SettingsToggle: () => <span />
            }}
          />
          <Markdown text={customization2} />
          <Markdown text={containerCustomization} />
          <Markdown text={layout} />
          <Griddle
            data={fakeData}
            plugins={[plugins.LocalPlugin]}
            components={{
              Layout: NewLayout
            }}
            styleConfig={{
              styles: {
                Pagination: { textAlign: 'right' }
              }
            }}
          />
          <Markdown text={continuedAtPlugins} />
         </div>
      </DocumentTitle>
    );
  }
});

export default Customization;

import React, { Component, PropTypes } from 'react';
import DocumentTitle from 'react-document-title'
import Markdown from 'components/Markdown';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';

import { config } from 'config';
import fakeData from 'utils/fakeData';

exports.data = {
  title: 'Controlling Griddle',
  order: 6
}

const start = `
  # Controlling Griddle #

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

const componentCode = `
This can be accomplished with the following:
\`\`\`
const fakeLoadDataFromAPI = (currentPage, pageSize, callback) => {
  setTimeout(() => {
    callback({
      data: fakeData.slice((currentPage - 1) * pageSize, currentPage * pageSize),
      currentPage,
    });
  }, 500);
}

class APITable extends Component {
  constructor(props, context) {
    super(props, context);

    // Initialize to the first page of results.
    this.state = {
      data: fakeData.slice(0, 5),
      currentPage: 1,
      pageSize: 5,
      recordCount: fakeData.length
    };
  }

  render() {
    const { data, currentPage, pageSize, recordCount } = this.state;
    return (
      <Griddle
        data={data}
        pageProperties={{
          currentPage,
          pageSize,
          recordCount,
        }}
        events={{
          onNext: this._onNext,
          onPrevious: this._onPrevious,
          onGetPage: this._onGetPage,
        }}
        components={{
          Filter: () => <span />,
          SettingsToggle: () => <span />
        }}
      />
    );
  }

  updateTableState = ({ data, currentPage }) => {
    this.setState({ data, currentPage });
  }

  _onNext = () => {
    const { currentPage, pageSize } = this.state;
    fakeLoadDataFromAPI(currentPage + 1, pageSize, this.updateTableState);
  }

  _onPrevious = () => {
    const { currentPage, pageSize } = this.state;
    fakeLoadDataFromAPI(currentPage - 1, pageSize, this.updateTableState);
  }

  _onGetPage = (pageNumber) => {
    const { pageSize } = this.state;
    fakeLoadDataFromAPI(pageNumber, pageSize, this.updateTableState);
  }
}
\`\`\`
`

class APITable extends Component {
  constructor(props, context) {
    super(props, context);

    // Initialize to the first page of results.
    this.state = {
      data: fakeData.slice(0, 5),
      currentPage: 1,
      pageSize: 5,
      recordCount: fakeData.length
    };
  }

  render() {
    const { data, currentPage, pageSize, recordCount } = this.state;
    return (
      <Griddle
        data={data}
        pageProperties={{
          currentPage,
          pageSize,
          recordCount,
        }}
        events={{
          onNext: this._onNext,
          onPrevious: this._onPrevious,
          onGetPage: this._onGetPage,
        }}
        components={{
          Filter: () => <span />,
          SettingsToggle: () => <span />
        }}
      />
    );
  }

  updateTableState = ({ data, currentPage }) => {
    this.setState({ data, currentPage });
  }

  _onNext = () => {
    const { currentPage, pageSize } = this.state;
    fakeLoadDataFromAPI(currentPage + 1, pageSize, this.updateTableState);
  }

  _onPrevious = () => {
    const { currentPage, pageSize } = this.state;
    fakeLoadDataFromAPI(currentPage - 1, pageSize, this.updateTableState);
  }

  _onGetPage = (pageNumber) => {
    const { pageSize } = this.state;
    fakeLoadDataFromAPI(pageNumber, pageSize, this.updateTableState);
  }
}

const Controlled = React.createClass({
  render () {
    const page = this.props.route.page

    return (
      <DocumentTitle title={`${page.data.title} | ${config.siteTitle}`}>
        <div>
          <Markdown text={start} />
          <Markdown text={apiExample} />
          <APITable />
          <br />
          <Markdown text={componentCode} />
         </div>
      </DocumentTitle>
    );
  }
});

export default Controlled;

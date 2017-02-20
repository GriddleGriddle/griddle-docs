import React, { Component, PropTypes } from 'react';
import DocumentTitle from 'react-document-title'
import Markdown from 'components/Markdown';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';

import { config } from 'config';
import fakeData from 'utils/fakeData';

exports.data = {
  title: 'Customization',
  order: 5
}

const start = `
  # Customization #

  Customization is the most compelling use-case for Griddle. There are a number of datagrid libraries and many of them are quite good!
  With Griddle, we wanted to create a datagrid that is useful out of the box but doesn't get in your way if you need something different.
  To that end, just about everything in Griddle is able to be composed / overriden through customization options in the API.

  (Side note: While similar to customization, [styling is in its own section](/Griddle/docs/styles/))

  ## Custom columns ##

  In Griddle we can custom columns or column headings through the \`ColumnDefinitions\` object. Lets say we want to add a custom column
  where we make the text blue for name but make the heading text red on another column -- We would achieve this with CustomColumn / CustomColumnHeadings.

  \`\`\`
    const CustomColumn = ({value}) => <span style={{ color: #0000AA }}>{value}</span>;
    const CustomHeading = ({value}) => <span style={{ color: #AA0000 }}>{value}</span>;

    <Griddle data={fakeData}>
      <RowDefinition>
        <ColumnDefinition id="name" customComponent={CustomColumn} />>
        <ColumnDefinition id="state" customHeading={CustomHeading}/>
        <ColumnDefinition id="company" />
      </RowDefinition>
    </Griddle>
  \`\`\`
`

const componentCustomization = `
  ## Component Customization ##

  Griddle exists as a series of container and view components. Container components are specifically responsible for getting data from
  griddle's store, where as view components are responsible for displaying data ([see architecture](/Griddle/docs/architecture/) for more on this).
  If we wanted to change the Filter component to be a dropdown to look for only a couple of specified option we could do so through the
  customizing Griddle's components.

  Griddle receives a \`components\` prop where any component that is passed in with a matching name will override the default in Griddle.

  \`\`\`
  class Filter extends Component {
    onChange(e) {
      this.props.onChange(e.target.value);
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
  ...
  <Griddle
    ...
    components={{
      Filter
    }}
  />
  \`\`\`
`;

const customization2 = `
  This type of component overriding works with any of the components.
`

const containerCustomization = `
  ## Container customization ##

  Griddle containers can also be customized. Containers are higher order components that wrap a given 'OriginalComponent'.
  If we wanted to change how a view component received its data, we would do so by overriding the container component -- in fact,
  this is exactly how the plugin for managing data works. Lets take a look at one of the core containers versus one in the plugin.

  #### Core Component ####

  \`\`\`
  import {
    hasNextSelector,
    classNamesForComponentSelector,
    stylesForComponentSelector
  } from '../selectors/dataSelectors';

  const enhance = OriginalComponent => compose(
    getContext({
      events: PropTypes.object
    }),
    connect((state, props) => ({
      hasNext: hasNextSelector(state, props),
      className: classNamesForComponentSelector(state, 'NextButton'),
      style: stylesForComponentSelector(state, 'NextButton'),
    })),
    mapProps(({ events: { onNext }, ...props }) => ({
      onClick: onNext,
      text: 'Next'
      ...props }))
  )((props) => <OriginalComponent {...props} text= "Next" />)
  \`\`\`

  #### Local Component ####

  \`\`\`
    import {
      hasNextSelector,
      classNamesForComponentSelector,
      stylesForComponentSelector
    } from '../selectors/localSelectors';

    import { getNext } from '../../../actions';

    const enhance = OriginalComponent => connect(state => ({
      hasNext: hasNextSelector(state),
      className: classNamesForComponentSelector(state, 'NextButton'),
      style: stylesForComponentSelector(state, 'NextButton'),
    }),
      {
        getNext
      }
    )(props => <OriginalComponent {...props} onClick={props.getNext} text="Next" />);
  \`\`\`

  The main difference between the two components is where they are getting their data.
  The core container is using \`dataSelectors\` where the localContainer is getting data
  from \`localSelectors\` -- this ability to change out the container component while leaving
  the view as-is has been a powerful abstraction for customizing Griddle.
`

const layout = `
  ## Layout ##
  Using the component overriding discussed above, we can override Griddle's layout component
  to change how Griddle renders its internal components.

  The layout component receives \`Table\`, \`Pagination\`, \`Filter\`, \`SettingsWrapper\` as props.

  By default, this renders as follows:

  \`\`\`
  <div>
    <Filter />
    <SettingsWrapper />
    <Table />
    <Pagination />
  </div>
  \`\`\`

  If we wanted to change the pagination to be above the table (and drop table settings), we could achieve that by making our own \`Layout\` component:

  \`\`\`
  const NewLayout = ({ Table, Pagination, Filter, SettingsWrapper }) => (
    <div>
      <Filter />
      <Pagination />
      <Table />
    </div>
  );
  ...
  <Griddle
    ...
    components={{
      Layout: NewLayout
    }}
  />
  \`\`\`
`

const continuedAtPlugins = `
  While you can customize just about anything in Griddle using these mechanisms, a more powerful
  option exists for creating reusable customizations through plugins. [Learn more about plugins](/Griddle/docs/plugins/)
`

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

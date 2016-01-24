import React from 'react';
import DocumentTitle from 'react-document-title';
import Markdown from 'utils/markdown';
import ChartistGraph from 'react-chartist';

import Griddle from 'griddle-react';
import { DefaultModules } from 'griddle-render';
const {RowDefinition, ColumnDefinition} = DefaultModules;

import NestedNavigation from '../../../utils/nestedNavigationItem';
import { getWeatherData } from 'utils/data';

import advanced_override1 from './_advanced_override1.md';

function getLineChartData(data) {
  return {
    labels: ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: data.map(d => [d.january, d.february, d.march, d.april, d.may, d.june, d.july, d.august, d.september, d.october, d.november, d.december])
  }
}

const Empty = () => <span />

const Block = React.createClass({
  render() {
    return <div style={{ marginLeft: 10, marginRight: 5,  width: 10, height: 10, display: 'inline-block', backgroundColor: this.props.background}} />
  }
});

const Legend = React.createClass({
  render() {
    return (
      <div style={{display: "inline-block"}}>
        <div>
          <Block background="#d70206" />
          Hoth

          <Block background="#f4c63d" />
          Coruscant

          <Block background="#f05b4f" />
          Tatooine
        </div>
        <DefaultModules.Filter {...this.props} />
      </div>
    )
  }
});

const WeatherChart = React.createClass({
  render() {
    const data = getLineChartData(this.props.visibleData);
    return <ChartistGraph data={getLineChartData(this.props.data)} type={'Line'} />
  }
});


module.exports = React.createClass({
  statics: {
    metadata: function() {
      return {
        order: 2.3,
        title: <NestedNavigation>Advanced Component Overrides</NestedNavigation>
      }
    }
  },

  render() {
    const data = getWeatherData();
    return (
      <DocumentTitle title={`${module.exports.metadata().title} | ${this.props.config.siteTitle}`}>
        <div>
          <h1>{module.exports.metadata().title}</h1>
          <Markdown {...advanced_override1} />

          <Griddle data={data} components={{Table: WeatherChart, Filter: Legend, Pagination: Empty }}/>
        </div>
      </DocumentTitle>
    )

  }
})



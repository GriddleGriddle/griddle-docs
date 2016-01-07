import React from 'react';
import DocumentTitle from 'react-document-title';
import Markdown from 'utils/markdown';

import Griddle from 'griddle-react';
import { DefaultModules } from 'griddle-render';
import { getBasicData, getWeatherData } from 'utils/data';
import ChartistGraph from 'react-chartist';

import intro from './_intro.md';
import exampleSummary from './_exampleSummary.md';
import componentOverrideSummary from './_componentOverrideSummary.md';

const LinkData = React.createClass({
  render() {
    return <a href="#">{this.props.data}</a>
  }
});

const ApplyBackground = SettingsToggle => React.createClass({
  render() {
    return (
      <span style={{backgroundColor: "#D8B9E0" }}>
        <SettingsToggle {...this.props} />
      </span>
    );
  }
});

function getLineChartData(data) {
  return {
    labels: ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: data.map(d => [d.january, d.february, d.march, d.april, d.may, d.june, d.july, d.august, d.september, d.october, d.november, d.december])
  }
}

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

const SettingsWithBackground = ApplyBackground(DefaultModules.SettingsToggle);

module.exports = React.createClass({
  statics: {
    metadata: function() {
      return {
        order: 2,
        title: "Customization"
      }
    }
  },

  render() {
    const data = getBasicData();
    const weatherData = getWeatherData();

    const {RowDefinition, ColumnDefinition} = DefaultModules;

    return (
      <DocumentTitle title={`${module.exports.metadata().title} | ${this.props.config.siteTitle}`}>
        <div>
          <h1>{module.exports.metadata().title}</h1>
          <Markdown {...intro} />

          <Griddle data={data}>
            <RowDefinition keyColumn="id">
              <ColumnDefinition id="name" customComponent={LinkData} />
              <ColumnDefinition id="state" />
            </RowDefinition>
          </Griddle>

          <Markdown {...exampleSummary} />
          <Griddle data={data}
            columns={['name', 'state']}
            components={{SettingsToggle: SettingsWithBackground}}
          />

          <Markdown {...componentOverrideSummary} />

          <Griddle data={weatherData} components={{Table: WeatherChart, Filter: Legend }}/>
        </div>
      </DocumentTitle>
    );
  }
})

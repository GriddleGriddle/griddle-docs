import React from 'react';
import DocumentTitle from 'react-document-title';
import Markdown from 'utils/markdown';

import Griddle from 'griddle-test';
import { DefaultModules } from 'griddle-render';
import { getBasicData } from 'utils/data';


import intro from './_intro.md';
import example1Summary from './_example1Summary.md';

const LinkData = React.createClass({
  render() {
    return <a href="#">{this.props.data}</a>
  }
});

const ApplyBackground = SettingsToggle => React.createClass({
  render() {
    return (
      <span style={{backgroundColor: "#EDEDED", fontSize: 38}}>
        <SettingsToggle {...this.props} />
      </span>
    );
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

          <Markdown {...example1Summary} />
          <Griddle data={data}
            columns={['name', 'state']}
            components={{SettingsToggle: SettingsWithBackground}}
          />

        </div>
      </DocumentTitle>
    );
  }
})

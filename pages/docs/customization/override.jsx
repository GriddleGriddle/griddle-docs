import React from 'react';
import DocumentTitle from 'react-document-title';
import Markdown from 'utils/markdown';

import Griddle from 'griddle-react';
import { DefaultModules } from 'griddle-render';
const {RowDefinition, ColumnDefinition} = DefaultModules;

import NestedNavigation from '../../../utils/nestedNavigationItem';
import { getBasicData } from 'utils/data';

import override1 from './_override1.md';
import override2 from './_override2.md';


const ApplyBackground = SettingsToggle => React.createClass({
  render() {
    return (
      <span style={{backgroundColor: "#D8B9E0" }}>
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
        order: 2.2,
        title: <NestedNavigation>Component Overrides</NestedNavigation>,
        pageTitle: 'Component Overrides'
      }
    }
  },

  render() {
    const data = getBasicData();
    return (
      <DocumentTitle title={`${module.exports.metadata().pageTitle} | ${this.props.config.siteTitle}`}>
          <div>
            <h1>{module.exports.metadata().title}</h1>
            <Markdown {...override1} />

            <Griddle data={data}
              columns={['name', 'state']}
              components={{SettingsToggle: SettingsWithBackground}}
            />

            <Markdown {...override2} />
          </div>
      </DocumentTitle>
    )

  }
})



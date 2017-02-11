import React from 'react';
import Markdown from '../components/Markdown';

import Griddle, { RowDefinition, ColumnDefiniton, plugins } from 'griddle-react';
import fakeData from 'utils/fakeData';

export default class extends React.Component {
  render() {
    debugger;
    return (
      <div>
        <Griddle
          data={fakeData}
          plugins={[plugins.LocalPlugin]}
          components={{
            SettingsToggle: (props) => <span />
          }}
        />
        <Markdown>
          {`## This is a cool test ##

          * This test`}
        </Markdown>
      </div>
    )
  }
}
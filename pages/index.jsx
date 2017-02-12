import React from 'react';
import Markdown from '../components/Markdown';

import Griddle, { RowDefinition, ColumnDefiniton, plugins } from 'griddle-react';
import fakeData from 'utils/fakeData';

export default class extends React.Component {
  render() {

  const Layout = ({Table, Pagination, Filter, SettingsWrapper, className, style}) => (
    <div className={className} style={style}>
      <div style={{ float: 'left', width: '50%' }}>
        <Filter /> 
      </div>
      <Pagination />
      <Table />
    </div>
  );

  const NextButton = ({ hasNext, onClick, style, className, text }) => hasNext ? (
    <button type="button" onClick={onClick} style={style} className={className}>{text}</button>
  ) :
  null;


  const PreviousButton = ({ hasPrevious, onClick, style, className, text }) => hasPrevious ? (
    <button type="button" onClick={onClick} style={style} className={className}>{text}</button>
  ) :
  null;

  return (
    <div>
      <Griddle
        data={fakeData}
        plugins={[plugins.LocalPlugin]}
        components={{
          Layout
        }}
        styleConfig={{
          styles: {
            Pagination: { textAlign: 'right' }
          }
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
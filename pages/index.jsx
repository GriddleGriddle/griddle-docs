import React from 'react';
import DocumentTitle from 'react-document-title';
import { Container, Grid, Breakpoint, Span } from 'react-responsive-grid';
import { colors, activeColors } from 'utils/colors'
import { margins } from 'utils/layout';
import { getFullData } from 'utils/data';
import Griddle from 'griddle-react';
import { DefaultModules } from 'griddle-render';

import Code from 'utils/code';

import 'css/normalize.css';
import 'css/code.css';
import 'css/styles.css';

const Table = (props) => {
  return <div className="grid-container">
    <DefaultModules.Table {...props} />
  </div>
}

const Empty = () => <span />
const FilterContainer = (props) => {
  return <div style={{  width: '50%' }}>
    <DefaultModules.Filter {...props} />
  </div>
}

const NoResultsContainer = (props) => (
  <div className="noresults-container">
    <DefaultModules.NoResults {...props} />
  </div>
);

const style = {
  classNames: {
    pagination: 'pagination'
  }
}

module.exports = React.createClass({
  render() {
    const data = getFullData();

    return (
        <div>
          <div style={{background: colors.secondary, color: colors.white, borderBottom: `4px solid ${colors.secondaryBorder}` }}>
            <Container style={{maxWidth: 960}}>
              <h3 style={{color: colors.white, textAlign: 'center', fontSize: 36, paddingTop: 20, fontWeight: 300}}>Griddle is a grid component for use with <a href="http://facebook.github.io/react/">React</a></h3>
              <Griddle
                data={data}
                components={{SettingsToggle: Empty, Table: Table, Filter: FilterContainer, NoResults: NoResultsContainer }}
                style={style} />
              <div style={{textAlign: 'center', marginTop: 20 }}>
                <span style={{background: colors.tertiary, color: colors.secondary, padding: 10, borderRadius: 5, fontWeight: 'bold', marginBottom: 10, width: 370, display: 'inline-block' }}>
                  npm install --save griddle-react@alpha
                </span>
              </div>
            </Container>
          </div>
          <Container style={{maxWidth: 960}} className="three_column_info">
            <Grid columns={12}>
              <Span columns={4}>
                <h2>Configurable</h2>
                The recently reimagined Griddle is built with a great deal of customization in mind. If you like the default settings, awesome! If not, there are plenty of customization options. Griddle can now
                accept custom components to be used in place of the default Griddle components as well as <a href="docs/plugins">plugins!</a>
              </Span>
              <Span columns={4}>
                <h2>Functional</h2>
                Griddle ships with filtering, sorting, and paging out of the box and many additional features are available
                with <a href="docs/plugins/">plugins!</a> Have a feature you'd love to see added? Add it to
                <a href="https://github.com/GriddleGriddle/Griddle/wiki/Roadmap">the roadmap</a> (under Potential Updates) or
                better yet, <a href="docs/plugins/creatingPlugins/">create a plugin!</a>
              </Span>
              <Span columns={4} last>
                <h2>Fast</h2>
                Griddle is powered by React and its virtual DOM. By default, only the current page of the grid is rendered at any given time. Data can be loaded all at once or paged on the server. Whether you have several or hundreds of records, Griddle should render your data quickly.
              </Span>
            </Grid>
          </Container>
          <div style={{
            background: colors.tertiary,
            color: colors.secondary,
            marginTop: margins.main,
            padding: `${margins.main}px 0 ${margins.main}px 0`,
            borderTop: `2px solid ${colors.secondaryBorder}`,
            borderBottom: `2px solid ${colors.secondaryBorder}`
          }}>
            <Container style={{maxWidth: 960, minHeight: 800 }}>
              <h2 style={{color: colors.secondaryBorder}}>Quickstart</h2>
              <p>Griddle is in npm as griddle-react. Simply install Griddle from npm:</p>
              <Code>npm install griddle-react@alpha</Code>

              <p>From there, require react and griddle modules and you should be ready to create your grid!</p>
              <Code>{
                `import React from 'react';
import Griddle from 'griddle-react';`}
              </Code>
              <p>Define an array of JSON objects -- for our examples we have something that resembles the following:
</p>
              <Code>{
`var fakeData =  [
{
  "January": 35,
  "February": 20,
  "March": 27,
  "April": 32,
  "May": 23,
  "June": 42
},
...
];`}
              </Code>

              <p>From there render your Griddle component passing in the fake data as the data property.</p>
              <Code>{`<Griddle data={fakeData}/>`}
              </Code>
            </Container>
          </div>
          <Container className="three_column_info">
            <Grid columns={12}>
              <Span columns={12}>
                <h2 id="new-stuff">What's New</h2>
                <ol>
                  <li><a href="docs/architecture/">New, module architecture</a></li>
                  <li><a href="docs/plugins/">First class plugin support</a></li>
                  <li><a href="docs/customization/">Customize just about anything</a></li>
                </ol>
                <p>
                  We're excited to Griddle 1.0 in the not-to-distant future but we need your help to make that happen sooner!
                </p>

                <p>
                  To help, please <a href="https://waffle.io/GriddleGriddle/griddle">take a look at our issue tracker</a> for any issue marked as <strong>ready</strong> (or hop into the discussions on any of the other issues). Additionally,
                  we'd love to <a href="gitter.im/DynamicTyped/Griddle">chat in our gitter.im room</a>.
                </p>
              </Span>
            </Grid>
          </Container>
      </div>
    );
  }
});

import React from 'react';
import DocumentTitle from 'react-document-title';
import { Container, Grid, Breakpoint, Span } from 'react-responsive-grid';
import { colors, activeColors } from 'utils/colors'
import { margins } from 'utils/layout';
import { getBasicData } from 'utils/data';
import Griddle from 'griddle-test';
import Code from 'utils/code';

import 'css/normalize.css';
import 'css/code.css';

module.exports = React.createClass({
  render() {
    const data = getBasicData();

    return (
        <div>
          <div style={{background: colors.secondary, color: colors.white, borderBottom: `4px solid ${colors.secondaryBorder}` }}>
            <Container style={{maxWidth: 960}}>
              <h3 style={{color: colors.white}}>Griddle is a grid component for use with <a href="http://facebook.github.io/react/">React</a></h3>
              <Griddle data={data} />
              <button >Documentation</button>
              <button>Download</button>
              <h3>OR</h3>
              <span style={{background: colors.tertiary, color: colors.secondary, padding: 5 }}>
                npm install --save griddle-react (react-test for right now)
              </span>
            </Container>
          </div>
          <Container style={{maxWidth: 960}}>
            <Grid columns={12}>
              <Span columns={4}>Configurable</Span>
              <Span columns={4}>Functional</Span>
              <Span columns={4} last>Fast</Span>
            </Grid>
          </Container>
          <div style={{
            background: colors.tertiary,
            color: colors.secondary,
            marginTop: margins.main,
            padding: `${margins.main}px 0 ${margins.main}px 0`,
            borderTop: `2px solid ${colors.secondaryBorder}`
          }}>
            <Container style={{maxWidth: 960, minHeight: 800 }}>
              <h2 style={{color: colors.secondaryBorder}}>Quickstart</h2>
              <p>Griddle is in npm as griddle-react. Simply install Griddle and react from npm:</p>
              <Code>npm install react griddle-react</Code>

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
              <Code>{`<Griddle results={fakeData}/>`}
              </Code>
            </Container>
          </div>
      </div>
    );
  }
});

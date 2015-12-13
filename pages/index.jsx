import React from 'react';
import DocumentTitle from 'react-document-title';
import { Container, Grid, Breakpoint, Span } from 'react-responsive-grid';
import { colors, activeColors } from 'utils/colors'
import { margins } from 'utils/layout';
import Griddle from 'griddle-test';

module.exports = React.createClass({
  render() {
    const data = getData();

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
            padding: `${margins.main} 0 ${margins.main} 0`,
            borderTop: `2px solid ${colors.secondaryBorder}`
          }}>
            <Container style={{maxWidth: 960, minHeight: 800 }}>
              <h2 style={{color: colors.secondaryBorder}}>Quickstart</h2>
            </Container>
          </div>
      </div>
    );
  }
});

function getData() {
  return [
  {
    "name": "Mayer Leonard",
    "city": "Kapowsin",
    "state": "Hawaii",
    "country": "United Kingdom",
    "company": "Ovolo",
  },
  {
    "name": "Koch Becker",
    "city": "Johnsonburg",
    "state": "New Jersey",
    "country": "Madagascar",
    "company": "Eventage",
  },
  {
    "name": "Lowery Hopkins",
    "city": "Blanco",
    "state": "Arizona",
    "country": "Ukraine",
    "company": "Comtext",
  },
  {
    "name": "Walters Mays",
    "city": "Glendale",
    "state": "Illinois",
    "country": "New Zealand",
    "company": "Corporana",
  },
  {
    "name": "Shaw Lowe",
    "city": "Coultervillle",
    "state": "Wyoming",
    "country": "Ecuador",
    "company": "Isologica",
  }];
}

import React from 'react';
import DocumentTitle from 'react-document-title';
import { Container, Grid, Breakpoint, Span } from 'react-responsive-grid';
import { colors, activeColors } from 'utils/colors'
import Griddle from 'griddle-test';

module.exports = React.createClass({
  render() {
    const data = getData();
console.log(data);
    return (
      <div style={{background: colors.secondary, color: colors.white }}>
        <Container style={{maxWidth: 960}}>
          <h3 style={{color: colors.white}}>Griddle is a grid component for use with <a href="http://facebook.github.io/react/">React</a></h3>
          <Griddle data={data} />
        </Container>
      </div>
    );
  }
});

function getData() {
  return [
  {
    "id": 0,
    "name": "Mayer Leonard",
    "city": "Kapowsin",
    "state": "Hawaii",
    "country": "United Kingdom",
    "company": "Ovolo",
    "favoriteNumber": 7
  },
  {
    "id": 1,
    "name": "Koch Becker",
    "city": "Johnsonburg",
    "state": "New Jersey",
    "country": "Madagascar",
    "company": "Eventage",
    "favoriteNumber": 2
  },
  {
    "id": 2,
    "name": "Lowery Hopkins",
    "city": "Blanco",
    "state": "Arizona",
    "country": "Ukraine",
    "company": "Comtext",
    "favoriteNumber": 3
  },
  {
    "id": 3,
    "name": "Walters Mays",
    "city": "Glendale",
    "state": "Illinois",
    "country": "New Zealand",
    "company": "Corporana",
    "favoriteNumber": 6
  },
  {
    "id": 4,
    "name": "Shaw Lowe",
    "city": "Coultervillle",
    "state": "Wyoming",
    "country": "Ecuador",
    "company": "Isologica",
    "favoriteNumber": 2
  }];
}

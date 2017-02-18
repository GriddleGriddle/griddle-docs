import React, { Component } from 'react';

import { config } from 'config';
import DocumentTitle from 'react-document-title';
import Markdown from 'components/Markdown';

import GriddleMap from 'components/GriddleMap';
exports.data = {
  title: 'As a map',
  order: 3
}

const markdown = `
  ## Introduction ##

  This example assumes that we want to display data as a map instead of a table using Griddle. This uses Griddle's state management
  but overrides some components to render a Google map instead of a table. The data that we are using should have a latitude and longitude property and look a little like this:

  \`\`\`
  const data = [
    {
      "guid": "146aff73-984e-42a8-954c-536e9dcbd27c",
      "name": "Wooten Richards",
      "company": "VALPREAL",
      "email": "wootenrichards@valpreal.com",
      "registered": "2016-08-23T09:28:46 +04:00",
      "latitude": 25.51231,
      "longitude": -110.878208
    },
    ...
  ];
  \`\`\`

  ### Install map component ###

  First off, we need to install \`google-map-react\` and import it into our page.

  \`\`\`
  npm i --save google-map-react
  \`\`\`

  \`\`\`
  import GoogleMapReact from 'google-map-react';
  \`\`\`

  ### Override Griddle components ###

  #### Override TableBody ####

  We want the Griddle's TableBody component to be doing most of the work. We should override it to connect to our local data store (we're going to continue to use the local data plugin since we want to take advantage of the built in filtering):

  \`\`\`
    import { connect } from 'react-redux';

    const TableBody = connect((state, props) => ({
      visibleData: plugins.LocalPlugin.selectors.visibleDataSelector(state)
    }))(({ rowIds, Row, visibleData }) => (
      <GoogleMapReact
        defaultCenter={{lat: 42.28, lng: -83.74}}
        defaultZoom={4}
      >
        { visibleData && visibleData.toJSON().map(r => <Row key={r.name} griddleKey={r.name} lat={r.latitude} lng={r.longitude} {...r} />) }
      </GoogleMapReact>
    ));
  \`\`\`

  #### Override Table ####

  Next we want to override the TableContainer component to only render the TableBody -- we could do this from either Table or TableContainer:

  \`\`\`
    const CustomTableComponent = OriginalComponent => class CustomTableComponent extends Component {
      static contextTypes = {
        components: React.PropTypes.object
      }

      render() {
          return (
            <div style={{ height: 800, width: 800}}>
              <this.context.components.TableBody />
            </div>
          );
      }
    }
  \`\`\`

  #### Override Row ####

  Then override the Row component to show as a map marker that shows additional data when hovered:

  \`\`\`
    class MarkerBlip extends Component {
      constructor(props) {
        super(props);
        this.state = { showInfo: false };
      }

      onMouseEnter = () => {
        this.setState({showInfo: true});
      }

      onMouseLeave = () => {
        this.setState({showInfo: false})
      }

      render() {
        return (
          <div>
            <div
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
              style={{
                borderRadius: 50,
                backgroundColor: "#512DA8",
                width:25,
                height: 25,
              }}
            />
            { this.state.showInfo &&
              <div
                style={{
                  backgroundColor: "#EDEDED",
                  border: "1px solid #777",
                  width: 150,
                  height: 70,
                  padding: 10,
                  position: 'relative',
                  zIndex: 9999
                }}
              >
                <h4 style={{margin: 0}}>{this.props.name}</h4>
                <small>{this.props.company}</small>
              </div>
            }
          </div>
        )
      }
    }
  \`\`\`

  #### Add Griddle ####
  We're now ready to setup Griddle in our page.

  \`\`\`
    <Griddle
      data={fakeData}
      plugings={[plugins.LocalPlugin]}
      pageProperties={{
        pageSize: 50000
      }}
      components={{
        TableContainer: CustomTableComponent,
        TableBody,
        Row: MarkerBlip,
      }}
    />
  \`\`\`

  Filtering still works as expected (e.g. type 'bird' into the filter) and the state management from the Local plugin.
`

// via http://www.json-generator.com/

export default class extends Component {
  render() {
    const page = this.props.route.page;

    return (
      <DocumentTitle title={`${page.data.title} | ${config.siteTitle}`}>
        <div>
          <GriddleMap width={800} height={800} />
          <hr />
          <Markdown text={markdown} />
        </div>
      </DocumentTitle>
    )
  }
}
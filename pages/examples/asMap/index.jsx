import React, { Component } from 'react';

import { config } from 'config';
import DocumentTitle from 'react-document-title';
import Markdown from 'components/Markdown';

import Griddle, { plugins } from 'griddle-react';

import GoogleMapReact from 'google-map-react';

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
const fakeData = [
  {
    "guid": "edcdc34d-8d23-4eaf-ab85-00ce38be87e8",
    "name": "Pierce Stephens",
    "company": "SULTRAX",
    "email": "piercestephens@sultrax.com",
    "registered": "2016-08-11T06:03:25 +04:00",
    "latitude": 37.537562,
    "longitude": -97.604118
  },
  {
    "guid": "d540bdb7-aede-46b9-b29b-83943156f580",
    "name": "Doyle Baldwin",
    "company": "MEGALL",
    "email": "doylebaldwin@megall.com",
    "registered": "2014-09-20T11:54:19 +04:00",
    "latitude": 43.434853,
    "longitude": -95.941926
  },
  {
    "guid": "7366f9e2-931c-4df2-8a99-87627aae2383",
    "name": "Lynch Bryan",
    "company": "ANOCHA",
    "email": "lynchbryan@anocha.com",
    "registered": "2014-07-16T12:30:52 +04:00",
    "latitude": 39.953888,
    "longitude": -93.223392
  },
  {
    "guid": "48f53b73-f19f-46fd-b12e-acbdbe01b8dd",
    "name": "Ernestine Lancaster",
    "company": "TYPHONICA",
    "email": "ernestinelancaster@typhonica.com",
    "registered": "2015-10-29T12:46:21 +04:00",
    "latitude": 44.37355,
    "longitude": -114.315574
  },
  {
    "guid": "49a14a2a-b783-4250-ba5b-cc230d52a382",
    "name": "Donaldson Rollins",
    "company": "AMRIL",
    "email": "donaldsonrollins@amril.com",
    "registered": "2017-01-30T06:03:33 +05:00",
    "latitude": 28.122594,
    "longitude": -102.663293
  },
  {
    "guid": "2e563122-5ecd-4eec-8fcf-ac0a0c1627bc",
    "name": "Opal Bradford",
    "company": "QUANTASIS",
    "email": "opalbradford@quantasis.com",
    "registered": "2016-01-30T06:56:36 +05:00",
    "latitude": 32.712338,
    "longitude": -84.648663
  },
  {
    "guid": "4677d3bf-47d9-4399-b806-5277d1a2970d",
    "name": "Pratt Noble",
    "company": "PASTURIA",
    "email": "prattnoble@pasturia.com",
    "registered": "2014-05-20T02:01:35 +04:00",
    "latitude": 35.454234,
    "longitude": -105.743661
  },
  {
    "guid": "6a10cea5-f150-4c4b-acb7-a78a245a4f92",
    "name": "Inez Salas",
    "company": "HOUSEDOWN",
    "email": "inezsalas@housedown.com",
    "registered": "2014-09-16T04:45:52 +04:00",
    "latitude": 43.76837,
    "longitude": -103.468994
  },
  {
    "guid": "67eb9658-7958-4a4d-b14d-5dc24224075a",
    "name": "Deirdre Charles",
    "company": "BOVIS",
    "email": "deirdrecharles@bovis.com",
    "registered": "2015-04-01T03:18:29 +04:00",
    "latitude": 28.092733,
    "longitude": -100.192932
  },
  {
    "guid": "146aff73-984e-42a8-954c-536e9dcbd27c",
    "name": "Wooten Richards",
    "company": "VALPREAL",
    "email": "wootenrichards@valpreal.com",
    "registered": "2016-08-23T09:28:46 +04:00",
    "latitude": 25.51231,
    "longitude": -110.878208
  },
  {
    "guid": "7966552c-0bf7-46af-93f2-9e48957a00f7",
    "name": "Watson Griffin",
    "company": "QUALITERN",
    "email": "watsongriffin@qualitern.com",
    "registered": "2017-01-23T03:29:56 +05:00",
    "latitude": 25.395997,
    "longitude": -93.701255
  },
  {
    "guid": "5d1e2308-921b-4c6d-8ce3-39dc947583b9",
    "name": "Bird Wilson",
    "company": "BYTREX",
    "email": "birdwilson@bytrex.com",
    "registered": "2015-06-16T02:34:29 +04:00",
    "latitude": 36.274349,
    "longitude": -114.091121
  },
  {
    "guid": "418d3a5e-384f-48e7-b861-4c3ff5f98fbc",
    "name": "Young West",
    "company": "EPLOSION",
    "email": "youngwest@eplosion.com",
    "registered": "2016-12-19T09:39:35 +05:00",
    "latitude": 25.320484,
    "longitude": -101.228362
  },
  {
    "guid": "334aa1f3-6e93-4631-9ac8-35d39837c12a",
    "name": "Katharine Abbott",
    "company": "INTERFIND",
    "email": "katharineabbott@interfind.com",
    "registered": "2015-11-19T04:25:19 +05:00",
    "latitude": 34.229338,
    "longitude": -80.14007
  },
  {
    "guid": "eff5f194-e851-44b2-8263-4dbda8252aa2",
    "name": "Schmidt Vang",
    "company": "GEEKKO",
    "email": "schmidtvang@geekko.com",
    "registered": "2016-03-07T08:33:59 +05:00",
    "latitude": 26.959958,
    "longitude": -83.051185
  },
  {
    "guid": "fdf2c8ea-3f0b-4cb3-b248-70a3c71d2db5",
    "name": "Tran Ayers",
    "company": "RODEOMAD",
    "email": "tranayers@rodeomad.com",
    "registered": "2016-04-11T07:15:32 +04:00",
    "latitude": 27.217991,
    "longitude": -114.114903
  },
  {
    "guid": "267be627-b077-440e-b316-6377053ab91b",
    "name": "Maude Sullivan",
    "company": "DIGIGENE",
    "email": "maudesullivan@digigene.com",
    "registered": "2014-10-08T02:03:03 +04:00",
    "latitude": 34.700569,
    "longitude": -105.341881
  },
  {
    "guid": "3fbebd82-e988-4aed-a632-77f8d5777a06",
    "name": "Rosario Johns",
    "company": "CENTURIA",
    "email": "rosariojohns@centuria.com",
    "registered": "2015-08-06T03:01:06 +04:00",
    "latitude": 34.825956,
    "longitude": -112.249899
  },
  {
    "guid": "344b7a0b-6eaf-4762-8999-f838b3ef0c7d",
    "name": "Richard Trujillo",
    "company": "NEBULEAN",
    "email": "richardtrujillo@nebulean.com",
    "registered": "2015-07-18T07:46:36 +04:00",
    "latitude": 33.358987,
    "longitude": -83.092834
  },
  {
    "guid": "63d14ca4-6343-407f-8047-2d69f876c3b4",
    "name": "Valarie Ashley",
    "company": "ZAYA",
    "email": "valarieashley@zaya.com",
    "registered": "2016-06-21T06:21:10 +04:00",
    "latitude": 38.89634,
    "longitude": -92.941234
  },
  {
    "guid": "be640ec3-99e3-49f3-ad0e-87a3f204ee22",
    "name": "Allen Norris",
    "company": "INSECTUS",
    "email": "allennorris@insectus.com",
    "registered": "2015-03-31T02:18:00 +04:00",
    "latitude": 43.662924,
    "longitude": -94.086183
  },
  {
    "guid": "ad6fa718-bdb6-402e-b3f6-71e782683bfd",
    "name": "Gwen Simpson",
    "company": "ZORK",
    "email": "gwensimpson@zork.com",
    "registered": "2016-08-04T05:03:57 +04:00",
    "latitude": 43.736728,
    "longitude": -94.809577
  },
  {
    "guid": "af798e15-a755-4091-9a5e-1154b4c7694b",
    "name": "Ballard Sykes",
    "company": "ASSISTIA",
    "email": "ballardsykes@assistia.com",
    "registered": "2015-04-02T09:20:13 +04:00",
    "latitude": -69.71896,
    "longitude": 103.217452
  },
  {
    "guid": "94924598-547b-4899-a87f-f766bb7ca8c5",
    "name": "Leticia Valdez",
    "company": "ACCUSAGE",
    "email": "leticiavaldez@accusage.com",
    "registered": "2016-04-09T07:23:18 +04:00",
    "latitude": 26.243057,
    "longitude": 54.540778
  },
  {
    "guid": "ad36c377-7ed5-4c37-a16e-a563dc61f93a",
    "name": "Shannon Haney",
    "company": "NETPLAX",
    "email": "shannonhaney@netplax.com",
    "registered": "2015-11-12T05:07:01 +05:00",
    "latitude": -58.665383,
    "longitude": 61.4595
  },
  {
    "guid": "75a369c6-3e4c-45bc-ad4d-87e571bfa2af",
    "name": "Scott Morales",
    "company": "TURNABOUT",
    "email": "scottmorales@turnabout.com",
    "registered": "2016-03-07T02:43:32 +05:00",
    "latitude": -10.996902,
    "longitude": 7.76112
  },
  {
    "guid": "2fe29492-8618-4cee-8587-759fb537c1ee",
    "name": "Roxanne Martinez",
    "company": "SAVVY",
    "email": "roxannemartinez@savvy.com",
    "registered": "2015-08-15T03:47:33 +04:00",
    "latitude": -45.420848,
    "longitude": -36.444984
  },
  {
    "guid": "55423d53-0ebd-403c-981f-a632d323b66f",
    "name": "Gaines Faulkner",
    "company": "VERAQ",
    "email": "gainesfaulkner@veraq.com",
    "registered": "2014-07-04T09:10:51 +04:00",
    "latitude": 27.643864,
    "longitude": -108.331683
  },
  {
    "guid": "d1f93091-fd07-4cc1-b5d8-1a7f3f4fbc8e",
    "name": "Sarah Langley",
    "company": "OATFARM",
    "email": "sarahlangley@oatfarm.com",
    "registered": "2015-06-30T01:55:50 +04:00",
    "latitude": 33.445636,
    "longitude": 110.96546
  },
  {
    "guid": "8f996042-e4b5-4841-97c9-c37c08f71f7d",
    "name": "Glenna Davis",
    "company": "EURON",
    "email": "glennadavis@euron.com",
    "registered": "2015-09-03T08:49:23 +04:00",
    "latitude": -77.623981,
    "longitude": 70.142453
  },
  {
    "guid": "7d1c4948-45bb-45f3-89d5-f736266f9a1b",
    "name": "Nora Underwood",
    "company": "ENTROPIX",
    "email": "noraunderwood@entropix.com",
    "registered": "2014-02-02T12:12:16 +05:00",
    "latitude": -48.873739,
    "longitude": -51.536381
  },
  {
    "guid": "70866bcd-5441-42b1-b172-b3866bfbad10",
    "name": "Melinda Robles",
    "company": "APPLIDECK",
    "email": "melindarobles@applideck.com",
    "registered": "2016-06-09T10:51:48 +04:00",
    "latitude": -29.629282,
    "longitude": -115.257757
  },
  {
    "guid": "b2f7ce84-49fe-45ae-9c73-795b73354715",
    "name": "Navarro Patterson",
    "company": "BIOLIVE",
    "email": "navarropatterson@biolive.com",
    "registered": "2015-07-19T10:44:44 +04:00",
    "latitude": 21.410484,
    "longitude": 21.048756
  },
  {
    "guid": "4c08c34a-a527-4a98-b77c-2479815b68c6",
    "name": "Grace Thomas",
    "company": "IMPERIUM",
    "email": "gracethomas@imperium.com",
    "registered": "2016-05-15T05:20:18 +04:00",
    "latitude": -5.025654,
    "longitude": -147.087339
  },
  {
    "guid": "2c31e5b9-6ca7-40e5-afa8-03135b6b235f",
    "name": "Hutchinson Jacobson",
    "company": "COWTOWN",
    "email": "hutchinsonjacobson@cowtown.com",
    "registered": "2016-11-16T07:08:00 +05:00",
    "latitude": -82.978434,
    "longitude": 114.158476
  },
  {
    "guid": "9cd97a51-85a6-486a-b925-a58f056348ed",
    "name": "Simone Chang",
    "company": "QUARMONY",
    "email": "simonechang@quarmony.com",
    "registered": "2016-03-05T12:52:08 +05:00",
    "latitude": 52.59519,
    "longitude": 34.998386
  },
  {
    "guid": "7e1f3fa8-eb20-40cb-8477-1348dd867e2e",
    "name": "Liz Mcdaniel",
    "company": "ENAUT",
    "email": "lizmcdaniel@enaut.com",
    "registered": "2017-01-30T01:39:50 +05:00",
    "latitude": 19.154236,
    "longitude": -146.694412
  },
  {
    "guid": "50dc20c0-2fd3-459d-89f4-1ac26704ecf5",
    "name": "Kathryn Head",
    "company": "HOUSEDOWN",
    "email": "kathrynhead@housedown.com",
    "registered": "2014-05-02T12:18:05 +04:00",
    "latitude": -70.751229,
    "longitude": -8.103125
  },
  {
    "guid": "54b0a035-e166-4f9b-88c2-451c7a2a06f9",
    "name": "Wiggins Wilson",
    "company": "GLOBOIL",
    "email": "wigginswilson@globoil.com",
    "registered": "2015-02-16T02:14:08 +05:00",
    "latitude": -72.869794,
    "longitude": -43.551238
  },
  {
    "guid": "8fbdccac-e531-486f-909e-ad6458570bb8",
    "name": "Knapp Henderson",
    "company": "DENTREX",
    "email": "knapphenderson@dentrex.com",
    "registered": "2015-04-26T02:32:46 +04:00",
    "latitude": -82.610331,
    "longitude": 10.1658
  },
  {
    "guid": "ef21de28-c45e-459c-926b-6eef764d2665",
    "name": "Tami West",
    "company": "GEEKFARM",
    "email": "tamiwest@geekfarm.com",
    "registered": "2016-12-12T05:07:03 +05:00",
    "latitude": -10.78629,
    "longitude": -43.676455
  },
  {
    "guid": "d6f6668e-664c-466e-b7e5-7c0a3fc0d0fb",
    "name": "Alicia Abbott",
    "company": "KATAKANA",
    "email": "aliciaabbott@katakana.com",
    "registered": "2016-12-12T07:02:59 +05:00",
    "latitude": 2.756574,
    "longitude": 69.334583
  },
  {
    "guid": "d7cf84ca-88cb-4983-9a31-aab7b99abf5f",
    "name": "Suzette Smith",
    "company": "GINK",
    "email": "suzettesmith@gink.com",
    "registered": "2015-04-12T02:33:47 +04:00",
    "latitude": 50.85819,
    "longitude": -39.782566
  },
  {
    "guid": "2fd69dc7-2510-4874-a8a9-645f5c7d95ba",
    "name": "Medina Wells",
    "company": "INSECTUS",
    "email": "medinawells@insectus.com",
    "registered": "2014-01-17T03:33:36 +05:00",
    "latitude": 65.621824,
    "longitude": -171.562498
  },
  {
    "guid": "b035672c-2d72-46f0-ba5d-ba5d66c8966f",
    "name": "Leon Harmon",
    "company": "BLEEKO",
    "email": "leonharmon@bleeko.com",
    "registered": "2016-06-25T08:06:28 +04:00",
    "latitude": -27.451288,
    "longitude": 17.101335
  },
  {
    "guid": "a0d5ebf6-a889-4281-8e1c-53f51461619d",
    "name": "Watson Lowe",
    "company": "NORALI",
    "email": "watsonlowe@norali.com",
    "registered": "2016-11-25T03:22:28 +05:00",
    "latitude": 41.018347,
    "longitude": 67.492453
  },
  {
    "guid": "4de2bc6d-9d96-4008-92f5-856c0fdda294",
    "name": "Stanley Lowery",
    "company": "QOT",
    "email": "stanleylowery@qot.com",
    "registered": "2016-04-10T07:26:24 +04:00",
    "latitude": -67.843375,
    "longitude": 94.63303
  },
  {
    "guid": "76b98d30-28e8-422d-aef1-ad7405eab85f",
    "name": "Martinez Blake",
    "company": "KRAG",
    "email": "martinezblake@krag.com",
    "registered": "2014-06-24T09:31:39 +04:00",
    "latitude": -15.658237,
    "longitude": 3.806944
  },
  {
    "guid": "b2d5011b-e9ef-44c3-8306-b0d169f19f63",
    "name": "Kim Chandler",
    "company": "DIGIPRINT",
    "email": "kimchandler@digiprint.com",
    "registered": "2016-04-27T04:32:21 +04:00",
    "latitude": 61.371577,
    "longitude": -85.342088
  },
  {
    "guid": "ec3ffc8f-1857-48b4-8c1a-dcf3164a53df",
    "name": "Cheri Wyatt",
    "company": "IMAGEFLOW",
    "email": "cheriwyatt@imageflow.com",
    "registered": "2015-01-28T03:54:20 +05:00",
    "latitude": 6.826551,
    "longitude": -3.911317
  },
  {
    "guid": "58fabf9b-8be2-483a-bc56-e99224e2ced6",
    "name": "Myers Norman",
    "company": "SPORTAN",
    "email": "myersnorman@sportan.com",
    "registered": "2014-06-21T08:56:36 +04:00",
    "latitude": 85.036731,
    "longitude": 173.932663
  },
  {
    "guid": "7658afb2-03bd-4c32-800e-0b038a6336a9",
    "name": "Wolf Sweet",
    "company": "VORTEXACO",
    "email": "wolfsweet@vortexaco.com",
    "registered": "2016-04-04T09:01:02 +04:00",
    "latitude": -34.947047,
    "longitude": -61.779761
  },
  {
    "guid": "09837a08-283a-4e10-872c-0f46a38be602",
    "name": "Horn Vasquez",
    "company": "HINWAY",
    "email": "hornvasquez@hinway.com",
    "registered": "2015-09-30T10:55:01 +04:00",
    "latitude": -8.312137,
    "longitude": -23.124439
  },
  {
    "guid": "4703f22b-1230-450a-8c08-d91c7b59ed68",
    "name": "Gamble Wallace",
    "company": "ZIDANT",
    "email": "gamblewallace@zidant.com",
    "registered": "2015-02-12T07:23:55 +05:00",
    "latitude": 36.94861,
    "longitude": -32.726259
  },
  {
    "guid": "0a0ee18f-f20a-46cd-8f78-df561987f849",
    "name": "Castaneda Brooks",
    "company": "TURNLING",
    "email": "castanedabrooks@turnling.com",
    "registered": "2015-01-10T07:57:11 +05:00",
    "latitude": 66.746941,
    "longitude": -166.635241
  },
  {
    "guid": "b5455ba2-5077-4a27-b079-2e2dfe0f63b2",
    "name": "Jo Tyson",
    "company": "GINKOGENE",
    "email": "jotyson@ginkogene.com",
    "registered": "2016-11-25T04:12:55 +05:00",
    "latitude": 4.35556,
    "longitude": -28.675097
  },
  {
    "guid": "aa202d41-2e53-4f47-b976-52629702c15a",
    "name": "Powers Riggs",
    "company": "BOINK",
    "email": "powersriggs@boink.com",
    "registered": "2016-10-20T07:43:10 +04:00",
    "latitude": 44.390825,
    "longitude": -11.717741
  },
  {
    "guid": "8bdd2920-304e-4622-beaa-d5dd388f18d4",
    "name": "Newman Christian",
    "company": "NIXELT",
    "email": "newmanchristian@nixelt.com",
    "registered": "2016-09-04T11:39:40 +04:00",
    "latitude": -21.557096,
    "longitude": 173.849826
  },
  {
    "guid": "fa3164f4-1ba5-4293-8746-950ddd947be3",
    "name": "Melva Morgan",
    "company": "TALENDULA",
    "email": "melvamorgan@talendula.com",
    "registered": "2014-08-10T07:11:59 +04:00",
    "latitude": -82.067161,
    "longitude": 150.494588
  },
  {
    "guid": "1b0604f3-09fa-4efc-ab58-c75ca15fb2d7",
    "name": "Krista Ferrell",
    "company": "VERAQ",
    "email": "kristaferrell@veraq.com",
    "registered": "2016-03-23T04:37:44 +04:00",
    "latitude": -3.458637,
    "longitude": -30.264701
  },
  {
    "guid": "1a79638c-de8a-45d4-a71c-24848ca4452f",
    "name": "Mercado Carrillo",
    "company": "CUBICIDE",
    "email": "mercadocarrillo@cubicide.com",
    "registered": "2016-01-30T10:41:31 +05:00",
    "latitude": 27.596235,
    "longitude": 36.73672
  },
  {
    "guid": "d827e9ac-1c00-42f4-8c22-ad43c367fa1b",
    "name": "Dolly Stokes",
    "company": "TRI@TRIBALOG",
    "email": "dollystokes@tri@tribalog.com",
    "registered": "2015-08-02T04:56:10 +04:00",
    "latitude": -48.390633,
    "longitude": -178.063519
  },
  {
    "guid": "c3b68c65-9525-4b88-b9d7-79eede19f08e",
    "name": "Fletcher Daniel",
    "company": "FILODYNE",
    "email": "fletcherdaniel@filodyne.com",
    "registered": "2014-10-26T05:07:46 +04:00",
    "latitude": -42.719524,
    "longitude": 25.974021
  },
  {
    "guid": "7d12884c-e4b4-4c17-8620-4f25ca054b5b",
    "name": "Deanne Rice",
    "company": "GROK",
    "email": "deannerice@grok.com",
    "registered": "2015-06-25T07:07:25 +04:00",
    "latitude": -57.789136,
    "longitude": -82.02534
  }
];

import { connect } from 'react-redux';

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
    );
  }
}

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

export default class extends Component {
  render() {
    const page = this.props.route.page;

    return (
      <DocumentTitle title={`${page.data.title} | ${config.siteTitle}`}>
        <div>
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
              SettingsToggle: () => <span />,
              Pagination: () => <span />
            }}
          />
          <hr />
          <Markdown text={markdown} />
        </div>
      </DocumentTitle>
    );
  }
}
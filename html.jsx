import React from 'react';
import DocumentTitle from 'react-document-title';

import { link } from 'gatsby-helpers';
import typography from './utils/typography';
const { TypographyStyle } = typography;
import { colors, activeColors } from 'utils/colors'

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      body: ""
    };
  },

  render: function() {
    var title
    title = DocumentTitle.rewind();
    if (this.props.title) {
      title = this.props.title;
    }

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <meta name='viewport' content='user-scalable=no width=device-width, initial-scale=1.0 maximum-scale=1.0'/>
          <title>{title}</title>
          <link rel="shortcut icon" href={this.props.favicon}/>
          <link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css" />
          <link href="//fonts.googleapis.com/css?family=Raleway:400,300,600" rel="stylesheet" type="text/css" />
          <TypographyStyle/>
        </head>
        <body className="landing-page">
          <div id="react-mount" dangerouslySetInnerHTML={{__html: this.props.body}} />
          <script src={link("/bundle.js")}/>
          <script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js" />
        </body>
      </html>
    );
  }
});

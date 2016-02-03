import React from 'react';
import { RouteHandler, Link, State } from 'react-router';
import { Container, Grid, Breakpoint, Span } from 'react-responsive-grid';
import includes from 'underscore.string/include';
import { link } from 'gatsby-helpers';
import { colors, activeColors } from 'utils/colors'

import typography from 'utils/typography';

// Style code
import 'css/github.css';
import 'css/tableReset.css';


const { rhythm, fontSizeToPx } = typography;

module.exports = React.createClass({
  mixins: [State],
  render: function() {
    const routes = this.getRoutes().map(function(route) {
      return route.path;
    });
    const docsActive = (routes.indexOf(link("/docs/")) >= 0);

    return (
      <div>
        { !docsActive ? <div style={{
          color: colors.lightGrey,
        }}>
          <Container>
            <Grid columns={12}>
              <Span columns={12}>
                <strong>Hi there!</strong> - This is the documentation for the pre-release version of Griddle. Please feel free to use this version but beware that changes may occur. Take a look at <a href="#new-stuff">what's new</a>
              </Span>
            </Grid>
          </Container>
        </div> : null}
        <div
          style={{
            background: colors.bg,
            color: colors.fg,
            height: 85,
            borderBottom: `1px solid ${colors.border}`
          }}
        >
          <Container
            style={{
              paddingTop: `${rhythm(1/2)}`,
              paddingBottom: `${rhythm(1/2)}`
            }}
          >
            <Grid
              columns={12}
              style={{
                padding: `0`
              }}
            >
              <Span
                columns={4}
                style={{
                  height: 24 // Ugly hack. How better to constrain height of div?
                }}
              >
                <Link
                  to={link('/')}
                  style={{
                    textDecoration: 'none',
                    color: colors.fg,
                    fontSize: fontSizeToPx("25.5px").fontSize
                  }}
                >
                  <img src="/griddle.png" />
                </Link>
              </Span>
              <Span columns={8} last={true}>
                <div>
                <a
                  style={{
                    float: 'right',
                    color: colors.fg,
                    textDecoration: 'none',
                    marginLeft: rhythm(1/2),
                    lineHeight: '24px'
                  }}
                  href="https://github.com/griddlegriddle/griddle"
                >
                  GitHub
                </a>
                <Link
                  to={link('/docs/')}
                  style={{
                    borderBottom: docsActive ? `3px solid ${activeColors.bg}` : null,
                    color: docsActive ? activeColors.fg : colors.fg,
                    float: 'right',
                    textDecoration: 'none',
                    lineHeight: '24px'
                  }}
                >
                  Documentation
                </Link>
                </div>
                <div style={{position: 'relative'}}>
                  <iframe src="https://ghbtns.com/github-btn.html?user=griddlegriddle&repo=griddle&type=star&count=true" frameborder="0" scrolling="0" width="100px" height="30px" style={{margin: 0, border: 0, position: 'absolute', right: -10, top: 35, opacity: 0.2}}></iframe>
                </div>
              </Span>
            </Grid>
          </Container>
        </div>
        <Container
          style={{
            maxWidth: "100%",
            paddingTop: 0
          }}
        >
          <RouteHandler {...this.props}/>
          <div style={{ background: colors.darkerGrey, color: colors.white, border: `2px solid ${colors.lightGrey}`, paddingTop: 15 }}>
            <Container style={{maxWidth: 960}}>
              <Grid columns={12}>
                <Span columns={12} style={{height: 40, margin: 0}}>
                  <img src="/griddle.png" style={{width: 76, height: 35, float: "left", marginRight: 5 }} alt="Griddle"/>
                  is a project by the Griddle core team and the <a href="https://github.com/GriddleGriddle/Griddle/graphs/contributors">community of awesome contributors</a>.
                </Span>
                <Span columns={12} className="opacity">
                  <small>Example data has been generated with <a href="http://json-generator.com">json-generator.com</a>. Any data that resembles real people, places, companies, etc. is coincidence.</small>
                </Span>
                <Span columns={12} className="opacity">
                  <small>Epic pancake logo by <a href="https://www.behance.net/ryanstraube">Ryan Straube</a></small>
                </Span>
                <Span columns={12}>
                  <small>&copy; 2016 | Griddle</small>
                </Span>
              </Grid>
            </Container>
          </div>
        </Container>
      </div>
    );
  }
});

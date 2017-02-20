import React from 'react'
import { Link } from 'react-router'
import { Container, Grid, Span } from 'react-responsive-grid'
import { prefixLink } from 'gatsby-helpers'
import includes from 'underscore.string/include'
import { colors, activeColors } from 'utils/colors'

import typography from 'utils/typography'
import { config } from 'config'

// Import styles.
import 'css/main.css'
import 'css/github.css'

const { rhythm, adjustFontSizeTo } = typography

module.exports = React.createClass({
  propTypes () {
    return {
      children: React.PropTypes.object,
    }
  },
  render () {
    const docsActive = includes(this.props.location.pathname, '/docs/')
    const examplesActive = includes(this.props.location.pathname, '/examples/')

    return (
      <div>
        <div
          style={{
            background: colors.bg,
            color: colors.fg,
            marginBottom: rhythm(1.5),
          }}
        >
          <Container
            style={{
              maxWidth: 960,
              paddingLeft: rhythm(3/4),
            }}
          >
            <Grid
              columns={12}
              style={{
                padding: `${rhythm(3/4)} 0`,
              }}
            >
              <Span
                columns={4}
                style={{
                  height: 64, // Ugly hack. How better to constrain height of div?
                }}
              >
                <Link
                  to={prefixLink('/')}
                  style={{
                    textDecoration: 'none',
                    color: colors.fg,
                    fontSize: adjustFontSizeTo('25.5px').fontSize,
                  }}
                >
                  <img src="/Griddle/griddle.png" alt="Griddle" />
                </Link>
              </Span>
              <Span columns={8} last>
                <a
                  style={{
                    float: 'right',
                    color: colors.fg,
                    textDecoration: 'none',
                    marginLeft: rhythm(1/2),
                  }}
                  href="https://github.com/griddlegriddle/griddle"
                >
                  Github
                </a>
                <Link
                  to={prefixLink('/docs/')}
                  style={{
                    background: colors.bg,
                    color: docsActive ? activeColors.fg : colors.fg,
                    float: 'right',
                    textDecoration: 'none',
                    paddingLeft: rhythm(1/2),
                    paddingRight: rhythm(1/2),
                    paddingBottom: rhythm(3/4),
                    marginBottom: rhythm(-1),
                    paddingTop: rhythm(1),
                    marginTop: rhythm(-1),
                  }}
                >
                  Documentation
                </Link>
                <div style={{position: 'relative'}}>
                  <iframe src="https://ghbtns.com/github-btn.html?user=griddlegriddle&repo=griddle&type=star&count=true" frameborder="0" scrolling="0" width="100px" height="30px" style={{margin: 0, border: 0, position: 'absolute', right: -10, top: 35, opacity: 0.4}}></iframe>
                </div>
              </Span>
            </Grid>
          </Container>
        </div>
        <Container
          style={{
            maxWidth: 960,
            padding: `${rhythm(1)} ${rhythm(3/4)}`,
            paddingTop: 0,
          }}
        >
          {this.props.children}
        </Container>
      </div>
    )
  },
})

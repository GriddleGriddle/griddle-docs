import React from 'react'
import { Link } from 'react-router'
import Breakpoint from 'components/Breakpoint'
import find from 'lodash/find'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'

import typography from 'utils/typography'
const { rhythm } = typography

module.exports = React.createClass({
  propTypes () {
    return {
      route: React.PropTypes.object,
    }
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },
  handleTopicChange (e) {
    return this.context.router.push(e.target.value)
  },

  getChildPages(pages) {
    return pages.map((p) => {
      const page = find(this.props.route.pages, (_p) => _p.path === p)
      return {
        title: page.data.title,
        path: page.path,
      }
    })
  },

  getChildPageOptions(childPages) {
    return childPages.map((child) =>
      <option
        key={prefixLink(child.path)}
        value={prefixLink(child.path)}
      >
        {child.title}
      </option>

    );
  },

  getDocPages(childPages) {
    return childPages.map((child) => {
      const isActive = prefixLink(child.path) === this.props.location.pathname
      return (
        <li
          key={child.path}
          style={{
            marginBottom: rhythm(1/2),
          }}
        >
          <Link
            to={prefixLink(child.path)}
            style={{
              textDecoration: 'none',
            }}
          >
            {isActive ? <strong>{child.title}</strong> : child.title}
          </Link>
        </li>
      )
    });
  },

  getLeftSection(title, docPages) {
    return (
      <span>
        <h2>{title}</h2>
        <ul
          style={{
            listStyle: 'none',
            marginLeft: 0,
            marginTop: rhythm(1/2),
          }}
        >
          {docPages}
        </ul>
      </span>
    );
  },
  render () {
    const childPages = this.getChildPages(config.docPages);
    const docOptions = this.getChildPageOptions(childPages);
    const docPages = this.getDocPages(childPages);
    
    const examples = this.getChildPages(config.examplePages);
    const exampleOptions = this.getChildPageOptions(examples);
    const examplePages = this.getDocPages(examples);

    return (
      <div>
        <Breakpoint
          mobile
        >
          <div
            style={{
              overflowY: 'auto',
              paddingRight: `calc(${rhythm(1/2)} - 1px)`,
              position: 'absolute',
              width: `calc(${rhythm(8)} - 1px)`,
              borderRight: '1px solid lightgrey',
            }}
          >
            { this.getLeftSection("Documentation", docPages) }
            { this.getLeftSection("Examples", examplePages) }
          </div>
          <div
            style={{
              padding: `0 ${rhythm(1)}`,
              paddingLeft: `calc(${rhythm(8)} + ${rhythm(1)})`,
            }}
          >
            {this.props.children}
          </div>
        </Breakpoint>
        <Breakpoint>
          <strong>Topics:</strong>
          {' '}
          <select
            defaultValue={this.props.location.pathname}
            onChange={this.handleTopicChange}
          >
            {docOptions}
          </select>
          <br />
          <br />
          {this.props.children}
        </Breakpoint>
      </div>
    )
  },
})

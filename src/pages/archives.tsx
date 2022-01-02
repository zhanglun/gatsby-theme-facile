import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ArchivePage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const postGroup = data.allMarkdownRemark.group
  const siteMenu = data.site.siteMetadata?.menu || []
  const description = data.site.siteMetadata?.description || ""

  if (postGroup.length === 0) {
    return (
      <Layout
        location={location}
        title={siteTitle}
        menu={siteMenu}
        description={description}
      >
        <Seo title="All posts" />
        <p>
          No category found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout
      location={location}
      title={siteTitle}
      menu={siteMenu}
      description={description}
    >
      <Seo title="All posts" />
      {postGroup.map(archive => {
        return (
          <div className="archive-item">
            <div className="archive-item-head">
              <div className="archive-year">{archive.fieldValue}</div>
            </div>
            <ul className="archive-item-list">
              {archive.nodes.map(node => {
                return <li><Link to={node.fields.slug}>{node.frontmatter.title}</Link></li>
              })}
            </ul>
          </div>
        )
      })}
    </Layout>
  )
}

export default ArchivePage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        menu {
          id
          name
          url
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { status: { eq: "publish" } } }
    ) {
      group(field: fields___year) {
        fieldValue
        totalCount
        nodes {
          frontmatter {
            date
            title
            tags
            status
            categories
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

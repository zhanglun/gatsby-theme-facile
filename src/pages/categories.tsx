import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { ArticleList } from "../components/Article/ArticleList"

const CategoryPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const categoryGroup = data.allMarkdownRemark.group
  const siteMenu = data.site.siteMetadata?.menu || []
  const description = data.site.siteMetadata?.description || ""

  if (categoryGroup.length === 0) {
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
      {categoryGroup.map(category => {
        return (
          <Link
            to={`/categories/${category.fieldValue}`}
            key={category.fieldValue}
          >
            {category.fieldValue} {category.totalCount}
          </Link>
        )
      })}
    </Layout>
  )
}

export default CategoryPage

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
    allMarkdownRemark {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`

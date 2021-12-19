import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const CategoryTempalte = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const siteMenu = data.site.siteMetadata?.menu || []
  const description = data.site.siteMetadata?.description || ""
  const { category, count } = pageContext;

  console.log(pageContext);

  return (
    <Layout
      location={location}
      title={siteTitle}
      menu={siteMenu}
      description={description}
    >
      <Seo title="All posts" />
      <h1>{category} <small>{count}</small></h1>
    </Layout>
  )
}

export default CategoryTempalte

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
  }
`

import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Header } from "./Header"
import { Banner } from "./Banner"

const Layout = ({ location, title, children, menu }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          menu {
            id
            name
            url
          }
        }
      }
    }
  `)

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Header
        title={data.site.siteMetadata.title}
        menu={data.site.siteMetadata.menu}
      />
      <Banner />
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout

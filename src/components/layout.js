import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Header } from "./Header"
import { Banner } from "./Banner"

const Layout = ({ location, children, title, menu, description }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  
  console.log('menu', menu);

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Header
        title={title}
        menu={menu}
      />
      <Banner description={description} />
      <section className="main">{children}</section>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout

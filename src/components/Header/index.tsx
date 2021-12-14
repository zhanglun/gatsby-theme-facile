import React from "react"
import { Link } from "gatsby"
import "./index.css";

export const Header = props => {
  console.log("props", props)
  const { title, menu } = props

  const renderMenu = () => {
    return menu.map(item => {
      return (
        <Link className="nav-item" to={item.url} key={item.id}>
          {item.name}
        </Link>
      )
    })
  }

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-title">{title}</div>
        <nav className="header-nav">{renderMenu()}</nav>
      </div>
    </header>
  )
}

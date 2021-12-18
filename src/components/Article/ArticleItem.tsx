import React from "react"
import { Link } from "gatsby"

export const ArticleItem = ({ post }) => {
  const title = post.frontmatter.title || post.fields.slug
  const frontmatter = post.frontmatter || {}

  console.log('post===>',post)

  return (
    <li key={post.fields.slug}>
      <article
        className="article-list-item"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          {frontmatter.categories && (
            <div className="article-category-list">
              {frontmatter.categories.map((category, idx) => {
                return (
                  <span className="article-category" key={idx}>
                    {category}
                  </span>
                )
              })}
            </div>
          )}
          <h2>
            <Link to={post.fields.slug} itemProp="url" className="article-item-title hover-underline">
              <span itemProp="headline">{title}</span>
            </Link>
          </h2>
          <small>{post.frontmatter.date}</small>
        </header>
        <section>
          <p
            dangerouslySetInnerHTML={{
              __html: post.frontmatter.description || post.excerpt,
            }}
            itemProp="description"
          />
        </section>
        <footer>
          <Link to={post.fields.slug} itemProp="url" className="read-more">
            READ MORE
          </Link>
        </footer>
      </article>
    </li>
  )
}

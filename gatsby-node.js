const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const blogList = path.resolve("./src/templates/blog-list.js")

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        postsRemark: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
        categoryGroup: allMarkdownRemark {
          group(field: frontmatter___categories) {
            fieldValue
            totalCount
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.postsRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  // create blog list pages
  const postsPerPage = 5
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/page/${i + 1}`,
      component: blogList,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // 创建分类页面
  const categoryTemplate = path.resolve("./src/templates/categories.js")
  const categories = result.data.categoryGroup.group

  categories.forEach(category => {
    createPage({
      path: `/categories/${category.fieldValue}`,
      component: categoryTemplate,
      context: {
        category: category.fieldValue,
        count: category.totalCount,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    let value = `/blogs${createFilePath({
      node,
      getNode,
    })}`

    console.log('value', value)
    
    // // if from notion，combine Date with title
    // if (!value) {
    //   console.log(node.formatter);
    //   value = `${new Date(node.formatter.date).format('YYYY-MM-DD')}-${node.formatter.title}`
    // }

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    interface Tag {
      id: String
      name: String
      color: String
    }
  `)

  const typeDefs = [
    "type MarkdownRemark implements Node { frontmatter: Frontmatter, fields: Fields }",
    schema.buildObjectType({
      name: 'Fields',
      fields: {
        slug: {
          type: "String!",
        }
      }
    }), 
    schema.buildObjectType({
      name: "Frontmatter",
      fields: {
        title: {
          type: "String!",
        },
        description: {
          type: "String!",
        },
        date: {
          type: "Date",
          extensions: {
            dateformat: {},
          },
        },
        tags: {
          type: "[Tag!]!",
          resolve(source, args, context, info) {
            // For a more generic solution, you could pick the field value from
            // `source[info.fieldName]`
            const { tags } = source
            if (source.tags == null || (Array.isArray(tags) && !tags.length)) {
              return ["uncategorized"]
            }
            return tags
          },
        },
        categories: {
          type: "[String!]",
          resolve(source, args, context, info) {
            // For a more generic solution, you could pick the field value from
            // `source[info.fieldName]`
            const { categories } = source
            if (source.categories == null || (Array.isArray(categories) && !categories.length)) {
              return ["uncategorized"]
            }
            return categories
          },
        },
      },
    }),
  ];

  createTypes(typeDefs)
}

module.exports = {
  siteMetadata: {
    title: 'Facile blog',
    author: {
      name: 'zhanglun',
      summary: '感受生活',
    },
    description: 'This is the description',
    siteUrl: 'https://zhanglun.github.io',
    social: {
      twitter: 'zhanglun1410',
    },
    menu: [
      {
        id: 'home',
        name: '首页',
        url: '/',
      },
      {
        id: 'blog',
        name: '博文',
        url: '/blogs',
      },
      {
        id: 'category',
        name: '分类',
        url: '/categories',
      },
      {
        id: 'archive',
        name: '归档',
        url: '/archives',
      },
      {
        id: 'lab',
        name: '实验室',
        url: '/labs',
      },
      {
        id: 'about',
        name: '关于我',
        url: '/about',
      },
    ],
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/posts`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        gfm: true,
        plugins: [
          {
            resolve: 'gatsby-remark-classes',
            options: {
              classMap: {
                'heading[depth=1]': 'heading title',
                'heading[depth=2]': 'heading subtitle',
                heading: 'heading',
                paragraph: 'para',
                link: 'link-underline',
                blockquote: 'quote',
              },
            },
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              maintainCase: true,
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              rapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-highlight-code',
            options: {
              lineNumbers: true,
              theme: 'one-dark',
            },
          },
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-50406624-2',
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => allMarkdownRemark.nodes.map((node) => ({
              ...node.frontmatter,
              description: node.excerpt,
              date: node.frontmatter.date,
              url: site.siteMetadata.siteUrl + node.fields.slug,
              guid: site.siteMetadata.siteUrl + node.fields.slug,
              custom_elements: [{ 'content:encoded': node.html }],
            })),
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt(truncate: true, pruneLength: 140)
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Facile blog',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Facile blog',
        short_name: '张小伦',
        description: '欢迎来到Facile blog一个记录生活，分享心得的博客',
        start_url: '/',
        background_color: '#ffffff',
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: 'minimal-ui',
        icon: 'src/images/icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-react-helmet',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};

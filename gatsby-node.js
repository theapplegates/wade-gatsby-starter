const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)
const slugify = require("slugify")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogList = path.resolve(`./src/templates/blog-list.js`)
  const portfolioList = path.resolve(`./src/templates/portfolio-list.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            frontmatter {
              slug
              template
              title
              featuredImage {
                childImageSharp {
									gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH, formats: [AVIF, WEBP, AUTO])
                }
              }
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Index page
  const homepage = result.data.allMarkdownRemark.edges
    .filter(edge => edge.node.frontmatter.template.length > 0)
    .filter(product => product.node.frontmatter.template == "index-page")

  homepage.forEach(home => {
    const id = home.node.id
    createPage({
      path: home.node.frontmatter.slug,
      component: path.resolve(
        `src/templates/${String(home.node.frontmatter.template)}.js`
      ),
      // additional data can be passed via context
      context: {
        id,
      },
    })
  })

  // About page
  const aboutpage = result.data.allMarkdownRemark.edges
    .filter(edge => edge.node.frontmatter.template.length > 0)
    .filter(product => product.node.frontmatter.template == "about-page")

  aboutpage.forEach(about => {
    const id = about.node.id
    createPage({
      path: about.node.frontmatter.slug,
      component: path.resolve(
        `src/templates/${String(about.node.frontmatter.template)}.js`
      ),
      // additional data can be passed via context
      context: {
        id,
      },
    })
  })

  // Blogs
  // Create markdown pages
  let blogPostsCount = 0
  const posts = result.data.allMarkdownRemark.edges
    .filter(edge => edge.node.frontmatter.template.length > 0)
    .filter(product => product.node.frontmatter.template == "blog-post")

  posts.forEach((post, index) => {
    const id = post.node.id
    const postTitle = post.node.frontmatter.title
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    const prefix = `/blog/`
    const slug = slugify(postTitle)

    createPage({
      path: prefix + slug,
      component: path.resolve(
        `src/templates/${String(post.node.frontmatter.template)}.js`
      ),
      // additional data can be passed via context
      context: {
        id,
        previous,
        next,
      },
    })
    // Count blog posts.
    if (post.node.frontmatter.template === "blog-post") {
      blogPostsCount++
    }
  })
  // Create blog-list pages
  const postsPerPage = 10
  const numPages = Math.ceil(blogPostsCount / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: blogList,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // Portfolio
  // Create markdown pages
  let portfolioPageCount = 0
  const portfolios = result.data.allMarkdownRemark.edges
    .filter(edge => edge.node.frontmatter.template.length > 0)
    .filter(product => product.node.frontmatter.template == "portfolio-page")

  portfolios.forEach((portfolio, index) => {
    const id = portfolio.node.id
    const portfolioTitle = portfolio.node.frontmatter.title
    const previous =
      index === portfolios.length - 1 ? null : portfolios[index + 1].node
    const next = index === 0 ? null : portfolios[index - 1].node
    const prefix = `/portfolio/`
    const slug = slugify(portfolioTitle)

    createPage({
      path: prefix + slug,
      component: path.resolve(
        `src/templates/${String(portfolio.node.frontmatter.template)}.js`
      ),
      // additional data can be passed via context
      context: {
        id,
        previous,
        next,
      },
    })
    // Count portfolio posts.
    if (portfolio.node.frontmatter.template === "portfolio-page") {
      portfolioPageCount++
    }
  })
  // Create portfolio-list pages
  const portfolioPerPage = 7
  const numbersPages = Math.ceil(portfolioPageCount / portfolioPerPage)

  Array.from({ length: numbersPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/portfolio` : `/portfolio/${i + 1}`,
      component: portfolioList,
      context: {
        limit: portfolioPerPage,
        skip: i * portfolioPerPage,
        numbersPages,
        currentPage: i + 1,
      },
    })
  })

  // Tags
  // Create markdown pages
  let tagPageCount = 0
  const tags = result.data.allMarkdownRemark.edges.filter(
    product => product.node.frontmatter.template == "tags-page"
  )

  tags.forEach((tag, index) => {
    const id = tag.node.id
    const tagTitle = tag.node.frontmatter.title
    const previous = index === tags.length - 1 ? null : tags[index + 1].node
    const next = index === 0 ? null : tags[index - 1].node
    const prefix = `/tag/`
    const slug = slugify(tagTitle)

    createPage({
      path: prefix + slug,
      component: path.resolve(
        `src/templates/${String(tag.node.frontmatter.template)}.js`
      ),
      // additional data can be passed via context
      context: {
        id,
        tagTitle,
        previous,
        next,
      },
    })
    // Count tag posts.
    if (tag.node.frontmatter.template === "tags-page") {
      tagPageCount++
    }
  })

  // Categories
  // Create markdown pages
  let categoryPageCount = 0
  const categories = result.data.allMarkdownRemark.edges
    .filter(edge => edge.node.frontmatter.template.length > 0)
    .filter(product => product.node.frontmatter.template == "categories-page")

  categories.forEach((category, index) => {
    const id = category.node.id
    const categoryTitle = category.node.frontmatter.title
    const previous =
      index === categories.length - 1 ? null : categories[index + 1].node
    const next = index === 0 ? null : categories[index - 1].node
    const prefix = `/category/`
    const slug = slugify(categoryTitle)

    createPage({
      path: prefix + slug,
      component: path.resolve(
        `src/templates/${String(category.node.frontmatter.template)}.js`
      ),
      // additional data can be passed via context
      context: {
        id,
        categoryTitle,
        previous,
        next,
      },
    })
    // Count category posts.
    if (category.node.frontmatter.template === "categories-page") {
      categoryPageCount++
    }
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

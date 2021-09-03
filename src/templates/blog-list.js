/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import BlogCard from "../components/blog-card"
import Seo from "../components/seo"
import blogData from "../util/blog.json"

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "blog-post" } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
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
`
const Pagination = props => (
  <div sx={blogStyles.listPagination}>
    <ul>
      {!props.isFirst && (
        <li>
          <Link to={props.prevPage} rel="prev">
            &larr; Previous
          </Link>
        </li>
      )}
      {Array.from({ length: props.numPages }, (_, i) => (
        <li key={`pagination-number${i + 1}`}>
          <Link
            to={`${props.blogSlug}${i === 0 ? "" : i + 1}`}
            className={props.currentPage === i + 1 ? "is-active num" : "num"}
          >
            {i + 1}
          </Link>
        </li>
      ))}
      {!props.isLast && (
        <li>
          <Link to={props.nextPage} rel="next">
            Next &rarr;
          </Link>
        </li>
      )}
    </ul>
  </div>
)

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const { currentPage, numPages } = this.props.pageContext
    const blogSlug = "/blog/"
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage =
      currentPage - 1 === 1 ? blogSlug : blogSlug + (currentPage - 1).toString()
    const nextPage = blogSlug + (currentPage + 1).toString()

    const posts = data.allMarkdownRemark.edges
      .filter(edge => !!edge.node.frontmatter.date)
      .map(edge => <BlogCard key={edge.node.id} data={edge.node} />)
    let props = {
      isFirst,
      prevPage,
      numPages,
      blogSlug,
      currentPage,
      isLast,
      nextPage,
    }

    return (
      <Layout sx={blogStyles.blogContainer}>
        <Seo
          title={"Blog — Page " + currentPage + " of " + numPages}
          description={"Blog page " + currentPage + " of " + numPages}
        />
        <div sx={blogStyles.blogListContainer}>
          <div sx={{ variant: "variants.pageHead" }}>
            <h1>{blogData.title}</h1>
            <p>{blogData.description}</p>
          </div>
          <div sx={blogStyles.blogList}>{posts}</div>
        </div>
        {numPages > 1 && <Pagination {...props} />}
      </Layout>
    )
  }
}

export default BlogIndex

const blogStyles = {
  blogContainer: {
    variant: "variants.section",
    minHeight: "70vh",
  },
  blogListContainer: {
    variant: "variants.container",
  },
  blogList: {
    display: "grid",
    justifyContent: "center",
    gridTemplateColumns: ["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)"],
    gap: "6px",
    mb: 7,
    "> article": {
      "&:nth-of-type(2)": {
        borderTopRightRadius: "30px",
        overflow: "hidden",
      },
      "&:nth-of-type(9)": {
        borderBottomLeftRadius: "30px",
        overflow: "hidden",
      },
      "&:nth-of-type(10)": {
        borderBottomRightRadius: "30px",
        overflow: "hidden",
      },
    },
  },
  listPagination: {
    variant: "variants.pageListPagination",
  },
}

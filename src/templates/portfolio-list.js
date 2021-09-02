/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import PortfolioCard from "../components/portfolio-card"
import Seo from "../components/seo"
import portfolioData from "../util/portfolio.json"

export const portfolioListQuery = graphql`
  query portfolioListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "portfolio-page" } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            description
            featuredImage {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
      }
    }
  }
`
const Pagination = props => (
  <div sx={portfolioStyles.listPagination}>
    <ul>
      {!props.isFirst && (
        <li>
          <Link to={props.prevPage} rel="prev">
            &larr; Previous
          </Link>
        </li>
      )}
      {Array.from({ length: props.numbersPages }, (_, i) => (
        <li key={`pagination-number${i + 1}`}>
          <Link
            to={`${props.portfolioSlug}${i === 0 ? "" : i + 1}`}
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

class PortfolioIndex extends React.Component {
  render() {
    const { data } = this.props
    const { currentPage, numbersPages } = this.props.pageContext
    const portfolioSlug = "/portfolio/"
    const isFirst = currentPage === 1
    const isLast = currentPage === numbersPages
    const prevPage =
      currentPage - 1 === 1
        ? portfolioSlug
        : portfolioSlug + (currentPage - 1).toString()
    const nextPage = portfolioSlug + (currentPage + 1).toString()

    const Portfolio = data.allMarkdownRemark.edges
      .filter(edge => !!edge.node.frontmatter.date)
      .map(edge => <PortfolioCard key={edge.node.id} data={edge.node} />)
    let props = {
      isFirst,
      prevPage,
      numbersPages,
      portfolioSlug,
      currentPage,
      isLast,
      nextPage,
    }

    return (
      <Layout sx={portfolioStyles.portfolioContainer}>
        <Seo
          title={"Portfolio — Page " + currentPage + " of " + numbersPages}
          description={"Portfolio page " + currentPage + " of " + numbersPages}
        />
        <div sx={portfolioStyles.portfolioListContainer}>
          <div sx={{ variant: "variants.pageHead" }}>
            <h1>{portfolioData.title}</h1>
            <p>{portfolioData.description}</p>
          </div>
          <div sx={portfolioStyles.portfolioList}>{Portfolio}</div>
        </div>
        {numbersPages > 1 && <Pagination {...props} />}
      </Layout>
    )
  }
}

export default PortfolioIndex

const portfolioStyles = {
  portfolioContainer: {
    variant: "variants.section",
    minHeight: "70vh",
  },
  portfolioListContainer: {
    variant: "variants.container",
  },
  listPagination: {
    variant: "variants.pageListPagination",
  },
  portfolioList: {
    display: "grid",
    gridTemplateColumns: [
      "repeat(1, 1fr)",
      "repeat(2, 1fr)",
      "repeat(2, 1fr)",
      "repeat(3, 1fr)",
    ],
    gap: "6px",
    "> div": {
      height: "400px",
      overflow: "hidden",
      ".button": {
        display: "none",
      },
      "&:nth-of-type(1)": {
        gridColumn: ["1", "1/3"],
      },
      "&:nth-of-type(2)": {
        borderTopRightRadius: "30px",
      },
      "&:nth-of-type(6)": {
        borderBottomLeftRadius: "30px",
      },
      "&:nth-of-type(7)": {
        gridColumn: ["1", "2/4"],
        borderBottomRightRadius: "30px",
      },
    },
  },
}

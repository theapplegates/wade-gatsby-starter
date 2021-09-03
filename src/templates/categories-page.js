/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import BlogCard from "../components/blog-card"

export const pageQuery = graphql`
  query categoriesQuery($id: String!, $categoryTitle: String) {
    allMarkdownRemark(
      filter: { frontmatter: { categories: { eq: $categoryTitle } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
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
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 148)
      frontmatter {
        slug
        title
      }
    }
  }
`

const categories = ({ data }) => {
  const { markdownRemark, allMarkdownRemark } = data // data.markdownRemark holds your category data
  const { frontmatter, html } = markdownRemark

  const eachCategoryCard = allMarkdownRemark.edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <BlogCard key={edge.node.id} data={edge.node} />)

  return (
    <Layout>
      <Seo title={frontmatter.title} article={true} />
      <div sx={categoryStyles.categoryPageContainer}>
        <div sx={categoryStyles.categoryContainer}>
          <header>
            {frontmatter.title ? (
              <section sx={{ variant: "variants.pageHead" }}>
                <h1>{frontmatter.title}</h1>
                {eachCategoryCard.length > 1 ? (
                  <p>{eachCategoryCard.length} Blogs</p>
                ) : (
                  <p>{eachCategoryCard.length} Blog</p>
                )}
              </section>
            ) : (
              "No Categories"
            )}
            <div sx={categoryStyles.eachCategoryCard}>{eachCategoryCard}</div>
          </header>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </Layout>
  )
}

export default categories

const categoryStyles = {
  categoryPageContainer: {
    variant: "variants.section",
  },
  categoryContainer: {
    variant: "variants.container",
    minHeight: "70vh",
  },
  eachCategoryCard: {
    display: "grid",
    gridTemplateColumns: ["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)"],
    gap: "6px",
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
  pageHead: {
    variant: "variants.pageHead",
  },
}

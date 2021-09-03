/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import BlogCard from "../components/blog-card"

export const pageQuery = graphql`
  query tagsQuery($id: String!, $tagTitle: String) {
    allMarkdownRemark(filter: { frontmatter: { tags: { eq: $tagTitle } } }) {
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
      frontmatter {
        title
        slug
      }
    }
  }
`

const Tags = ({ data }) => {
  const { markdownRemark, allMarkdownRemark } = data // data.markdownRemark holds your tags data
  const { frontmatter, html } = markdownRemark

  const eachTagCard = allMarkdownRemark.edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <BlogCard key={edge.node.id} data={edge.node} />)

  return (
    <Layout>
      <Seo title={frontmatter.title} article={true} />
      <div sx={tagsStyles.tagPageContainer}>
        <div sx={tagsStyles.tagContainer}>
          <header>
            {frontmatter.title ? (
              <section sx={{ variant: "variants.pageHead" }}>
                <h1>{frontmatter.title}</h1>
                {eachTagCard.length > 1 ? (
                  <p>{eachTagCard.length} Blogs</p>
                ) : (
                  <p>{eachTagCard.length} Blog</p>
                )}
              </section>
            ) : (
              "No Tags"
            )}
            <div sx={tagsStyles.eachTagCard}>{eachTagCard}</div>
          </header>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </Layout>
  )
}

export default Tags

const tagsStyles = {
  tagPageContainer: {
    variant: "variants.section",
  },
  tagContainer: {
    variant: "variants.container",
    minHeight: "70vh",
  },
  eachTagCard: {
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

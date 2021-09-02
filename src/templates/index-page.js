/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import BlogListHome from "../components/blog-list-home"
import PortfolioHome from "../components/portfolio-list-home"
import Testimonials from "../components/testimonials"
import Customers from "../components/customers"
import Seo from "../components/seo"

export const pageQuery = graphql`
  query HomeQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        name {
          firstName
          lastName
        }
        description
        cta {
          text
          url
        }
        customers {
          customersVisibility
          title
          description
          customerImages {
            customerName
            customerImage {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
              relativePath
              publicURL
            }
          }
        }
        testimonialsContainer {
          testimonialVisibility
          testimonials {
            description
            name
            jobRole
          }
        }
      }
    }
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            featuredImage {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
      }
    }
    portfolios: allMarkdownRemark(
      limit: 5
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "portfolio-page" } } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
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

const HomePage = ({ data }) => {
  const { markdownRemark, posts, portfolios } = data // data.markdownRemark holds your page data
  const { frontmatter } = markdownRemark

  const customerInfo = frontmatter.customers
  const testimonials = frontmatter.testimonialsContainer.testimonials
  return (
    <Layout>
      <Seo
        title={frontmatter.name.firstName + frontmatter.name.lastName}
        description={frontmatter.description}
      />
      <div sx={indexStyles.homeBanner}>
        <div sx={indexStyles.homeData}>
          <h1 sx={indexStyles.title}>
            {frontmatter.name.firstName}
            <span sx={{ color: "SecondaryColor" }}>
              {" "}
              {frontmatter.name.lastName}
            </span>
          </h1>
          <p sx={indexStyles.description}>
            {frontmatter.description}
            {frontmatter.cta.url && frontmatter.cta.text ? (
              <Link to={frontmatter.cta.url}>
                {frontmatter.cta.text} &rarr;
              </Link>
            ) : (
              ""
            )}
          </p>
        </div>
      </div>
      <PortfolioHome data={portfolios} />
      {frontmatter.customers.customersVisibility === "YES" ? (
        <Customers data={customerInfo} />
      ) : (
        ""
      )}
      <BlogListHome data={posts} />
      {frontmatter.testimonialsContainer.testimonialVisibility === "YES" ? (
        <Testimonials data={testimonials} />
      ) : (
        ""
      )}
    </Layout>
  )
}

export default HomePage

const indexStyles = {
  homeBanner: {
    variant: "variants.container",
  },
  homeData: {
    variant: "variants.section",
  },
  title: {
    color: "primaryColor",
    fontSize: ["48px !important", "64px !important", "96px !important"],
    m: 0,
    wordBreak: "break-word",
  },
  description: {
    maxWidth: ["60ch"],
    fontSize: 3,
    color: "textColor",
    m: 0,
    a: {
      pl: 2,
      pr: 1,
      color: "primaryColor",
      fontWeight: "700",
      transition: "0.5s",
      "&:hover": {
        color: "SecondaryColor",
      },
    },
  },
}

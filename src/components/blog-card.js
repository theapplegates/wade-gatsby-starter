/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import slugify from "slugify"
import { darken, lighten } from "@theme-ui/color"

const postPrefix = `/blog/`
const BlogCard = ({ data }) => (
  <article sx={blogStyles.postCard}>
    <Link to={postPrefix + slugify(`${data.frontmatter.title}`)}>
      {data.frontmatter.featuredImage ? (
        <div sx={blogStyles.postImage}>
          <GatsbyImage
            image={
              data.frontmatter.featuredImage.childImageSharp.gatsbyImageData
            }
            alt={data.frontmatter.title + " - Featured image"}
            sx={blogStyles.featuredImage}
          />
        </div>
      ) : (
        ""
      )}
      {data.frontmatter.title ? (
        <div sx={blogStyles.postContent}>
          <h3 sx={blogStyles.title}>{data.frontmatter.title}</h3>
          <div>
            <time sx={blogStyles.date}>{data.timeToRead} minute read</time>
          </div>
        </div>
      ) : (
        ""
      )}
    </Link>
  </article>
)
export default BlogCard

const blogStyles = {
  postCard: {
    bg: "blogBgColor",
    "&:hover": {
      bg: darken("blogBgColor", 0.05),
    },
  },
  featuredImage: {
    maxWidth: "100% !important",
    width: "100% !important",
    height: "400px",
    ".gatsby-image-wrapper [data-main-image]": {
      transform: "inherit",
    },
  },
  postContent: {
    px: 3,
  },
  title: {
    mt: 3,
    mb: 0,
    fontWeight: "heading",
    fontSize: 4,
    color: "blogTitleColor",
    "&:hover": {
      color: darken("blogTitleColor", 0.05),
    },
  },
  date: {
    display: "block",
    mb: 3,
    color: lighten("blogTitleColor", 0.02),
  },
}

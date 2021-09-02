/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { darken } from "@theme-ui/color"
import BlogCard from "./blog-card"
import blogData from "../util/blog.json"

export default function BlogListHome(props) {
  const data = props.data
  const posts = data.edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <BlogCard key={edge.node.id} data={edge.node} />)
  return <PostMaker data={posts} />
}

const PostMaker = ({ data }) => (
  <div sx={blogStyles.blogListHome}>
    <section sx={blogStyles.blogContainer}>
      <div sx={blogStyles.blogList}>
        <div sx={blogStyles.blogData}>
          <div sx={{ position: "sticky", top: "30px" }}>
            <span sx={{ variant: "variants.homePageSpan" }}>
              <strong>—</strong> {blogData.blogTitle}
            </span>
            <h3 sx={blogStyles.description}>{blogData.description}</h3>
            {data.length > 3 ? (
              <Link to="/blog">
                <button sx={blogStyles.button}>{blogData.cta}</button>
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
        <div sx={blogStyles.blogPosts}>{data.slice(0, 3)}</div>
      </div>
    </section>
  </div>
)

const blogStyles = {
  blogListHome: {
    maxWidth: "100%",
    variant: "variants.section",
  },
  blogContainer: {
    variant: "variants.container",
  },
  blogList: {
    display: "grid",
    gridTemplateColumns: ["1fr", "1fr", "1fr 2fr"],
    gap: 7,
  },
  description: {
    color: "primaryColor",
    fontSize: 5,
    m: 0,
    fontWeight: "initial !important",
  },
  button: {
    mt: 3,
    p: "15px 30px",
    display: "inline-block",
    textTransform: "uppercase",
    bg: "buttonColor",
    border: "none",
    cursor: "pointer",
    borderBottomRightRadius: "16px",
    fontWeight: "700",
    color: "buttonTextColor",
    transition: "background .3s ease",
    "&:hover": {
      bg: darken("buttonColor", 0.2),
    },
  },
  blogPosts: {
    display: "grid",
    gridTemplateColumns: ["1fr", "1fr 1fr"],
    gap: "6px",
    "> article": {
      "&:nth-of-type(1)": {
        gridColumn: ["1", "1/3"],
        borderTopRightRadius: "30px",
        overflow: "hidden",
      },
      "&:nth-of-type(2)": {
        borderBottomLeftRadius: "30px",
        overflow: "hidden",
      },
      "&:nth-of-type(3)": {
        borderBottomRightRadius: "30px",
        overflow: "hidden",
      },
    },
  },
}

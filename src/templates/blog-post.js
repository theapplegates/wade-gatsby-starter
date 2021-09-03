/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link, graphql } from "gatsby"
import { getSrc, GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import slugify from "slugify"
import Converkit from "../components/convertkit"
import Disqus from "../components/disqus"
import Integration from "../util/integrations.json"
import SiteMeta from "../util/site.json"
import { lighten } from "@theme-ui/color"

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share"

export const pageQuery = graphql`
  query BlogPostQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 148)
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        categories
        featuredImage {
          childImageSharp {
						gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH, formats: [AVIF, WEBP, AUTO])
          }
        }
      }
    }
  }
`

const blogPrefix = `/blog/`
const Pagination = props => (
  <div sx={blogStyles.postPagination}>
    <ul>
      {props.previous && props.previous.frontmatter.template === "blog-post" && (
        <li>
          <Link
            to={blogPrefix + slugify(`${props.previous.frontmatter.title}`)}
            rel="prev"
          >
            <p>&larr; Previous</p>
            <span className="page-title">
              {props.previous.frontmatter.title}
            </span>
            {props.previous.frontmatter.featuredImage ? (
              <img
                src={getSrc(props.previous.frontmatter.featuredImage)}
                alt={"Goto > " + props.previous.frontmatter.title}
              />
            ) : (
              ""
            )}
          </Link>
        </li>
      )}
      {props.next && props.next.frontmatter.template === "blog-post" && (
        <li>
          <Link
            to={blogPrefix + slugify(`${props.next.frontmatter.title}`)}
            rel="prev"
          >
            <p>Next &rarr;</p>
            <span className="page-title">{props.next.frontmatter.title}</span>
            {props.next.frontmatter.featuredImage ? (
              <img
                src={getSrc(props.next.frontmatter.featuredImage)}
                alt={"Goto > " + props.next.frontmatter.title}
              />
            ) : (
              ""
            )}
          </Link>
        </li>
      )}
    </ul>
  </div>
)

const Post = ({ data, pageContext }) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, timeToRead } = markdownRemark

  const pageURL =
    SiteMeta.meta.siteUrl + blogPrefix + slugify(`${frontmatter.title}`)
  // share icons in blog post
  const shareIcons = (
    <div sx={blogStyles.shareIcons}>
      <strong sx={blogStyles.shareText}>Share </strong>
      <div>
      <FacebookShareButton url={pageURL}>
        <FacebookIcon size={32} borderRadius="6" iconFillColor="#888" bgStyle={{fill: "#00000000"}}/>
      </FacebookShareButton>

      <TwitterShareButton url={pageURL}>
        <TwitterIcon size={32} borderRadius="6" iconFillColor="#888" bgStyle={{fill: "#00000000"}} />
      </TwitterShareButton>

      <LinkedinShareButton url={pageURL}>
        <LinkedinIcon size={32} borderRadius="6" iconFillColor="#888" bgStyle={{fill: "#00000000"}} />
      </LinkedinShareButton>

      <TelegramShareButton url={pageURL}>
        <TelegramIcon size={32} borderRadius="6" iconFillColor="#888" bgStyle={{fill: "#00000000"}} />
      </TelegramShareButton>

      <WhatsappShareButton url={pageURL}>
        <WhatsappIcon size={32} borderRadius="6" iconFillColor="#888" bgStyle={{fill: "#00000000"}} />
      </WhatsappShareButton>

      <EmailShareButton url={pageURL}>
        <EmailIcon size={32} borderRadius="6" iconFillColor="#888" bgStyle={{fill: "#00000000"}} />
      </EmailShareButton>
      </div>
    </div>
  )

  // category in blog post
  const category = frontmatter.categories ? frontmatter.categories : ""

  // tag's in blog post
  const tagLabel = frontmatter.tags
    ? frontmatter.tags.map((tag, index) => {
        return (
          <div key={"tag" + index}>
            {tag === "none" ? (
              ""
            ) : (
              <Link to={`/tag/` + slugify(`${tag}`)} sx={blogStyles.tagStyle}>
                {tag}
              </Link>
            )}
          </div>
        )
      })
    : ""

  const Image = frontmatter.featuredImage
    ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
    : ""
  const { previous, next } = pageContext
  let props = {
    previous,
    next,
  }
  const blogSlug = slugify(`${frontmatter.title}`)
  const Breadcrumb = () => (
    <div sx={blogStyles.breadcrumbList}>
      <ol itemScope itemType="https://schema.org/BreadcrumbList">
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link itemProp="item" to="/blog">
            <span itemProp="name">Blog</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        <span sx={{ color: "textColor" }}>›</span>
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link
            itemScope
            itemType="https://schema.org/WebPage"
            itemProp="item"
            itemID={"/blog/" + blogSlug}
            to={"/blog/" + blogSlug}
          >
            <span itemProp="name">{frontmatter.title}</span>
          </Link>
          <meta itemProp="position" content="2" />
        </li>
      </ol>
    </div>
  )
  return (
    <Layout>
      <Seo
        title={frontmatter.title}
        description={frontmatter.description}
        article={true}
      />
      <div sx={blogStyles.blogPageContainer}>
        <div sx={blogStyles.blogContainer}>
          {frontmatter.title ? (
            <div>
              <header>
                <section sx={{ variant: "variants.pageHead" }}>
                  <h1>{frontmatter.title}</h1>
                  <div sx={blogStyles.blogHead}>
                    <date>{frontmatter.date}</date>
                    {category === "0" ? "" : <span>&nbsp;&bull;&nbsp;</span>}
                    {category === "0" ? (
                      ""
                    ) : (
                      <Link
                        to={`/category/` + slugify(`${category}`)}
                        sx={blogStyles.categoryTitle}
                      >
                        {category}
                      </Link>
                    )}{" "}
                    &nbsp;&bull;&nbsp;
                    <span>{timeToRead} minute read</span>
                  </div>
                </section>
                {Image ? (
                  <GatsbyImage
                    image={Image}
                    alt={frontmatter.title + " - Featured image"}
                    className="featured-image"
                    sx={blogStyles.featuredImage}
                  />
                ) : (
                  ""
                )}
              </header>
              <div sx={blogStyles.blogBody}>
                <div>{shareIcons}</div>
                <div
                  sx={blogStyles.blogPostContent}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </div>
              <div sx={blogStyles.blogContent}>
                <div sx={blogStyles.blogDetails}>
                  {tagLabel ? (
                    <div sx={blogStyles.tagsDiv}>{tagLabel}</div>
                  ) : (
                    ""
                  )}
                  {Integration.convertkit.convertkitVisibility === "YES" ? (
                    <Converkit />
                  ) : (
                    ""
                  )}
                  {Integration.disqus.disqusVisibility === "YES" ? (
                    <Disqus
                      id={markdownRemark.id}
                      title={frontmatter.title}
                      url={pageURL}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {(previous || next) && <Pagination {...props} />}
            </div>
          ) : (
            ""
          )}
        </div>
        <Breadcrumb />
      </div>
    </Layout>
  )
}

export default Post

const blogStyles = {
  blogPageContainer: {
    variant: "variants.section",
  },
  blogContainer: {
    variant: "variants.container",
    minHeight: "70vh",
  },
  featuredImage: {
    m: "0 auto",
    mb: 6,
    maxHeight: "400px",
  },
  blogHead: {
    pt: 3,
    color: lighten("textColor", 0.1),
  },
  categoryTitle: {
    fontSize: 2,
    color: "tagColor",
  },
  blogBody: {
    display: ["block", "grid"],
    gridTemplateColumns: ["1fr", "1fr", "60px 1fr", "60px 1fr"],
    lineHeight: "1.5",
    width: ["100%", "100%", "800px"],
    m: "0 auto",
    color: "textColor",
    gap: 5,
  },
  blogContent: {
    maxWidth: "68ch",
    margin: "0 auto",
    overflow: "hidden",
    variant: "variants.markdown",
  },

  //share icons
  shareIcons: {
    display: ["block", "block", "block", "grid"],
    justifyItems: "inherit",
    position: "sticky",
    top: "100px",
    zIndex: "1111",
    mt: [0, 0, 0, 6],
    button: {
      mb: 2,
      mx: ["1", "1", "1", "0"],
      opacity: "0.7",
      "&:hover": {
        opacity: "1",
      },
    },
  },
  shareText: {
    display: "block",
    textTransform: "uppercase",
    fontSize: 1,
    fontWeight: "700",
    opacity: 0.6,
    mb: 2,
    ml: ["14px", "14px", "14px", "0px"]
  },
  blogPostContent: {
    variant: "variants.markdown",
  },
  blogDetails: {
    m: " 0 auto",
    maxWidth: "75ch",
  },
  //tags
  tagsDiv: {
    display: ["block", "flex"],
    pt: 7,
  },
  tagStyle: {
    display: "inline-block",
    fontSize: 2,
    p: "6px 12px",
    borderRadius: "4px",
    border: "1px solid",
    mr: "12px",
    mb: "12px",
    transition: "all .3s linear",
    borderColor: "borderColor",
    color: "tagColor !important",
  },

  //blogs
  similarBlogs: {
    py: 7,
    h3: {
      mt: 0,
      fontSize: 4,
    },
  },
  blogs: {
    display: "grid",
    gridTemplateColumns: ["1fr 1fr"],
    gap: "30px",
  },
  breadcrumbList: {
    variant: "variants.breadcrumb",
  },
  postPagination: {
    variant: "variants.pagination",
  },
}

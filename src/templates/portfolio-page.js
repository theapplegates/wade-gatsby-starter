/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getSrc } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import slugify from "slugify"
import ReactMarkdown from "react-markdown"
import "react-responsive-carousel/lib/styles/carousel.min.css"

export const pageQuery = graphql`
  query PortfolioQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 148)
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
        listView {
          alignCardShow
          alignCards {
            cardAlign
            alignCardDecription
            alignCardImage {
              childImageSharp {
								gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH, formats: [AVIF, WEBP, AUTO])
              }
            }
          }
        }
        cardsView {
          CardShow
          cards {
            alignCardImgCaption
            cardImages {
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

const portfolioPrefix = `/portfolio/`

const Pagination = props => (
  <div sx={portfolioStyles.postPagination}>
    <ul>
      {props.previous &&
        props.previous.frontmatter.template === "portfolio-page" && (
          <li>
            <Link
              to={
                portfolioPrefix + slugify(`${props.previous.frontmatter.title}`)
              }
              rel="prev"
            >
              <p>
                <span className="icon">&larr;</span> Previous
              </p>
              <span className="page-title">
                {props.previous.frontmatter.title}
              </span>
            </Link>
          </li>
        )}
      {props.next && props.next.frontmatter.template === "portfolio-page" && (
        <li>
          <Link
            to={portfolioPrefix + slugify(`${props.next.frontmatter.title}`)}
            rel="prev"
          >
            <p>
              Next <span className="icon">&rarr;</span>
            </p>
            <span className="page-title">{props.next.frontmatter.title}</span>
          </Link>
        </li>
      )}
    </ul>
  </div>
)

const Portfolio = ({ data, pageContext }) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const { previous, next } = pageContext

  const hasImage = getSrc(frontmatter.featuredImage).includes("spacer.png")
    ? false
    : true
  const PortfolioImage = hasImage
    ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
    : ""
  const portfolioImg = (
    <GatsbyImage
      image={PortfolioImage}
      alt={frontmatter.title + " - Featured image"}
    />
  )

  // Portfolio Align Cards
  const Aligncard = frontmatter.listView.alignCards
    ? frontmatter.listView.alignCards.map((align, index) => {
        const hasImage = getSrc(align.alignCardImage).includes("spacer.png")
          ? false
          : true
        const alignImage = hasImage
          ? align.alignCardImage.childImageSharp.gatsbyImageData
          : ""
        const info = (
          <div sx={portfolioStyles.portfolioContent}>
            {align.alignCardDecription ? (
              <ReactMarkdown source={align.alignCardDecription} />
            ) : (
              ""
            )}
          </div>
        )
        const alignImages = (
          <GatsbyImage
            image={alignImage}
            alt=" - Align card image"
            sx={portfolioStyles.featuredImage}
          />
        )
        return (
          <div key={"align" + index}>
            {align.cardAlign === "left" ? (
              <div sx={portfolioStyles.portfolioCard}>
                {alignImages}
                {info}
              </div>
            ) : (
              ""
            )}
            {align.cardAlign === "right" ? (
              <div sx={portfolioStyles.portfolioCard}>
                <div sx={portfolioStyles.orderOne}>{info}</div>
                <div sx={portfolioStyles.orderTwo}>{alignImages}</div>
              </div>
            ) : (
              ""
            )}
            {align.cardAlign === "center" ? (
              <div sx={portfolioStyles.portfolioCardCenter}>
                {alignImages}
                <div className="portfolioContentCenter">{info}</div>
              </div>
            ) : (
              ""
            )}
          </div>
        )
      })
    : ""

  // Portfolio Cards
  const cards = frontmatter.cardsView.cards
    ? frontmatter.cardsView.cards.map((info, index) => {
        const hasImage = getSrc(info.cardImages).includes("spacer.png")
          ? false
          : true
        const cardsImage = hasImage
          ? info.cardImages.childImageSharp.gatsbyImageData
          : ""
        return (
          <div sx={portfolioStyles.portfolioCards} key={"cards" + index}>
            {info.cardImages === "../../../static/assets/spacer.png" ? (
              ""
            ) : (
              <GatsbyImage
                image={cardsImage}
                alt=" - Card image"
                sx={{
                  borderRadius: "12px",
                  border: "1px solid",
                  borderColor: "borderColor",
                  overflow: "hidden",
                }}
              />
            )}
            {info.alignCardImgCaption ? (
              <p sx={portfolioStyles.cardsInfo}>{info.alignCardImgCaption}</p>
            ) : (
              ""
            )}
          </div>
        )
      })
    : ""

  let props = {
    previous,
    next,
  }
  const portfolioSlug = slugify(`${frontmatter.title}`)
  const Breadcrumb = () => (
    <div
      sx={{
        variant: "variants.breadcrumb",
      }}
    >
      <ol
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        sx={portfolioStyles.containerOl}
      >
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link itemProp="item" to="/portfolio">
            <span itemProp="name">Portfolio</span>
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
            itemID={"/portfolio/" + portfolioSlug}
            to={"/portfolio/" + portfolioSlug}
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
      <div sx={portfolioStyles.portfolioPageContainer}>
        <article sx={portfolioStyles.portfolioContainer}>
          <div>
            <header>
              {frontmatter.title ? (
                <section sx={{ variant: "variants.pageHead" }}>
                  {frontmatter.title ? <h1>{frontmatter.title}</h1> : ""}
                  {frontmatter.description ? (
                    <p>{frontmatter.description}</p>
                  ) : (
                    ""
                  )}
                </section>
              ) : (
                ""
              )}
              <div sx={portfolioStyles.portfolioImage}>{portfolioImg}</div>
            </header>
          </div>
          <div
            sx={portfolioStyles.potfolioBody}
            dangerouslySetInnerHTML={{ __html: html }}
          />
          {frontmatter.listView.alignCardShow === true ? "" : Aligncard}
          {frontmatter.cardsView.CardShow === true ? (
            ""
          ) : (
            <div sx={portfolioStyles.portfolioListCards}>{cards}</div>
          )}
          {(previous || next) && <Pagination {...props} />}
        </article>
        <Breadcrumb />
      </div>
    </Layout>
  )
}

export default Portfolio

const portfolioStyles = {
  portfolioPageContainer: {
    variant: "variants.section",
  },
  portfolioContainer: {
    variant: "variants.container",
    minHeight: "70vh",
    color: "textColor",
  },
  potfolioBody: {
    variant: "variants.markdown",
    maxWidth: "75ch",
    m: "0 auto",
    mb: 7,
  },
  portfolioImage: {
    maxHeight: "400px",
    maxWidth: "100%",
    border: "1px solid",
    mb: 6,
    borderColor: "borderColor",
    overflow: "hidden",
    ".gatsby-image-wrapper": {
      maxWidth: "100% !important",
      maxHeight: "100% !important",
      width: "100%",
    },
  },

  // Align Cards
  portfolioCard: {
    maxWidth: "100%",
    width: "100%",
    display: "grid",
    gridTemplateColumns: ["1fr", "1fr", "1fr  1fr"],
    alignItems: "self-start",
    justifyContent: "center",
    gap: ["30px", "30px", "60px"],
    my: [2, 2, 7],
    ".gatsby-image-wrapper": {
      maxWidth: "100% !important",
      maxHeight: "400px !important",
    },
  },
  orderOne: {
    order: ["2", "2", "1"],
  },
  orderTwo: {
    order: ["1", "1", "2"],
  },
  portfolioCardCenter: {
    ".gatsby-image-wrapper": {
      maxWidth: "100% !important",
      maxHeight: "400px !important",
    },
    ".portfolioContentCenter": {
      m: "0 auto",
      mt: 5,
      maxWidth: "75ch",
    },
  },
  featuredImage: {
    maxWidth: "100%",
    width: "100%",
    display: "block",
    m: "0",
    borderRadius: "12px",
    border: "1px solid",
    overflow: "hidden",
    borderColor: "borderColor",
  },
  portfolioContent: {
    display: "block",
    h2: {
      mt: 0,
      fontSize: 5,
      fontWeight: "800",
      color: "primaryColor",
      fontFamily: "body",
    },
    p: {
      mt: 0,
      pb: 3,
      lineHeight: "1.8",
      color: "textColor",
      fontWeight: "300",
      fontSize: "18px",
    },
    "ul > li ": {
      fontSize: "18px",
    },
  },

  //Cards
  portfolioListCards: {
    display: "grid",
    gridTemplateColumns: [
      "repeat(1, 1fr)",
      "repeat(2, 1fr)",
      "repeat(2, 1fr)",
      "repeat(3, 1fr)",
    ],
    gap: "30px",
    py: 4,
  },
  cardsInfo: {
    fontSize: "18px",
    color: "textColor",
  },
  breadcrumbList: {
    variant: "variants.breadcrumb",
  },
  postPagination: {
    variant: "variants.pagination",
  },
}

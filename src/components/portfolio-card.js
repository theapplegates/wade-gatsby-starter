/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { getSrc, GatsbyImage } from "gatsby-plugin-image"
import slugify from "slugify"

const portfolio = `/portfolio/`
const PortfolioCard = ({ data }) => {
  const PortfolioInfo = (
    <div sx={portfolioStyles.PortfolioInfo}>
      {data.frontmatter.title ? (
        <h3 sx={portfolioStyles.portfolioTitle}>{data.frontmatter.title}</h3>
      ) : (
        ""
      )}
    </div>
  )

  // Portfolio Image
  const hasImage = getSrc(data.frontmatter.featuredImage).includes("spacer.png")
    ? false
    : true
  const PortfolioImage = hasImage
    ? data.frontmatter.featuredImage.childImageSharp.gatsbyImageData
    : ""

  return (
    <div sx={portfolioStyles.portfolios}>
      <Link to={portfolio + slugify(`${data.frontmatter.title}`)}>
        <GatsbyImage
          image={PortfolioImage}
          alt={data.frontmatter.title + " - Featured image"}
          sx={portfolioStyles.featuredImage}
        />
        <div className="info">{PortfolioInfo}</div>
      </Link>
    </div>
  )
}

export default PortfolioCard

const portfolioStyles = {
  featuredImage: {
    maxWidth: "100% !important",
    width: "100% !important",
    height: "100%",
  },
  portfolios: {
    filter: "grayscale(1)",
    position: "relative",
    ".info": {
      display: "block",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      transition: "opacity .3s ease",
      "> div": {
        p: "20px",
        position: "absolute",
        bottom: 0,
      },
    },
    "&:hover": {
      filter: "grayscale(0)",
      ".info": {
        transition: "opacity .3s ease",
        bg: "rgba(0, 0, 0, 0.2)",
        opacity: 1,
      },
    },
  },
  portfolioTitle: {
    m: 0,
    fontSize: 3,
    color: "portfolioTitleColor",
  },
}

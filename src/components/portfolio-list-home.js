/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { darken } from "@theme-ui/color"
import PortfolioCard from "../components/portfolio-card"
import portfolioData from "../util/portfolio.json"

export default function PortfolioListHome(props) {
  const data = props.data
  const portfolio = data.edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PortfolioCard key={edge.node.id} data={edge.node} />)
  return <PostMaker data={portfolio} />
}

const PostMaker = ({ data }) => (
  <div sx={portfolioStyles.portfolioContainer}>
    <section sx={portfolioStyles.portfolioCards}>
      <div sx={portfolioStyles.portfolioSection}>
        <span sx={{ variant: "variants.homePageSpan" }}>
          <strong>—</strong> {portfolioData.homeTitle}
        </span>
        <div sx={portfolioStyles.grids}>
          {data.slice(0, 4)}
          {data.length > 4 ? (
            <div>
              {data.slice(4, 5)}
              <Link href="/portfolio" sx={{ display: "inherit" }}>
                <button className="button">{portfolioData.cta}</button>
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  </div>
)

const portfolioStyles = {
  portfolioContainer: {
    variant: "variants.section",
  },
  portfolioCards: {
    variant: "variants.container",
  },
  grids: {
    display: "grid",
    gridTemplateColumns: ["1fr", "1fr 1fr", "1fr 1fr 1fr"],
    gridGap: "6px",
    "> div": {
      overflow: "hidden",
      height: "400px",
      "&:nth-of-type(1)": {
        gridColumn: ["1", "1/3"],
      },
      "&:nth-of-type(2)": {
        borderTopRightRadius: "30px",
      },
      "&:nth-of-type(3)": {
        borderBottomLeftRadius: "30px",
      },
      "&:nth-of-type(5)": {
        display: "grid",
        gridAutoRows: "1fr 60px",
        gridGap: "6px",
        ".button": {
          display: "grid",
          justifyContent: "center",
          alignContent: "center",
          textTransform: "uppercase",
          bg: "buttonColor",
          border: "none",
          cursor: "pointer",
          borderBottomRightRadius: "30px",
          fontWeight: "700",
          color: "buttonTextColor",
          transition: "background .3s ease",
          "&:hover": {
            bg: darken("buttonColor", 0.2),
          },
        },
      },
    },
  },
}

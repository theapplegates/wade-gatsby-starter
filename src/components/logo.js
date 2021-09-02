/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import site from "../util/site.json"

const siteTitle = site.meta.title
const Logo = sx => (
  <div sx={styles.siteLogo}>
    <Link to="/">{siteTitle}</Link>
  </div>
)

export default Logo

const styles = {
  siteLogo: {
    fontSize: 2,
    textTransform: "uppercase",
    a: {
      color: "primaryColor",
      fontWeight: "bold",
    },
  },
}

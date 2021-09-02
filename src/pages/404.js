/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { RiArrowLeftSLine, RiBugLine, RiSkullLine } from "react-icons/ri"

import Seo from "../components/seo"
import Layout from "../components/layout"

const NotFound = () => (
  <Layout sx={errorStyles.notFoundPage}>
    <Seo title="Page not found" />
    <div sx={errorStyles.wrapper}>
      <header>
        <RiSkullLine sx={errorStyles.icon} />
        <h1>Oops page not found</h1>
        <p>
          Have you wondered into the unknow. Let us help you, Please take a look
          at below options
        </p>
      </header>
      <Link to="/" sx={{ variant: "variants.button.primary", mt: 2 }}>
        <RiArrowLeftSLine sx={{ mr: 2 }} />
        Back to Homepage
      </Link>
      <Link to="/contact" sx={{ variant: "variants.button.secondary" }}>
        Report this <RiBugLine sx={{ ml: 2 }} />
      </Link>
    </div>
  </Layout>
)

export default NotFound

const errorStyles = {
  notFoundPage: {
    pt: "130px",
    minHeight: "80vh",
  },
  wrapper: {
    variant: "variants.container",
    textAlign: "center",
  },
  icon: {
    fontSize: "128px",
    color: "brand",
  },
}

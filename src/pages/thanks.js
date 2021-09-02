/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { RiArrowLeftSLine, RiCheckboxCircleLine } from "react-icons/ri"

import Seo from "../components/seo"
import Layout from "../components/layout"

const Thanks = () => (
  <Layout sx={thanksStyles.thanksPage}>
    <Seo title="Thank you" />
    <div sx={thanksStyles.wrapper}>
      <RiCheckboxCircleLine sx={thanksStyles.icon} />
      <h1>Got your message</h1>
      <p>Thank you for getting in touch us. We will get back to you shortly.</p>
      <Link to="/" sx={{ variant: "variants.button.primary", mt: 2 }}>
        <RiArrowLeftSLine sx={{ mr: 2 }} />
        Lets go back to Homepage
      </Link>
    </div>
  </Layout>
)

export default Thanks

const thanksStyles = {
  thanksPage: {
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

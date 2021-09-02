/** @jsx jsx */
import { jsx } from "theme-ui"
import footerData from "../util/footer.json"
import { Link } from "gatsby"
import siteLayout from "../util/siteLayout.json"

const socialMedia = footerData.socialIcons.map((icons, index) => {
  return (
    <Link to={icons.url} target="_blank" key={"SIcon" + index}>
      {icons.icon}
    </Link>
  )
})

const Footer = () => {
  return (
    <footer id="contact" sx={footerStyles.footerContainer}>
      <div sx={footerStyles.footer}>
        <h2 sx={footerStyles.title}>{footerData.title}</h2>
        <a href={"mailto:" + footerData.email}>
          <p sx={footerStyles.email}>{footerData.email}</p>
        </a>
        <div sx={footerStyles.icons}>{socialMedia}</div>
      </div>
    </footer>
  )
}

export default Footer

const footerStyles = {
  footerContainer: {
    // backgroundImage: "linear-gradient(to bottom, #fff, #F5F1FF)",
    py: 6,
  },
  footer: {
    maxWidth: siteLayout.footerLayout,
    m: "0 auto",
    pl: ["20px", "20px", "40px", "40px", "80px"],
  },
  title: {
    lineHeight: "130%",
    color: "textColor",
    mt: 0,
  },
  email: {
    m: 0,
    fontSize: ["5", "7", "8"],
    lineHeight: "130%",
    color: "primaryColor",
  },
  icons: {
    a: {
      pr: 2,
      color: "textColor",
      textTransform: "uppercase",
      fontSize: "14px",
      "&:after": {
        content: "'•'",
        pl: 1,
      },
      "&:last-child": {
        "&:after": {
          content: "''",
        },
      },
      "&:hover": {
        color: "SecondaryColor",
      },
    },
  },
}

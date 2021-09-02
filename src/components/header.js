/** @jsx jsx */
import { jsx } from "theme-ui"
import Logo from "./logo"
import Navigation from "./navigation"
import Theme from "./theme"
import Sitedata from "../util/site.json"
import siteLayout from "../util/siteLayout.json"

const Header = () => {
  return (
    <header sx={headerStyles.siteHeader}>
      <div sx={headerStyles.container}>
        <Logo />
        <div sx={headerStyles.navIcons}>
          <div sx={headerStyles.navMenu}>
            <Navigation />
          </div>
        </div>
        <div sx={headerStyles.navMenuBigScreen}>
          <Navigation />
          {Sitedata.meta.darkModeVisibility === "YES" ? <Theme /> : ""}
        </div>
      </div>
    </header>
  )
}

export default Header

const headerStyles = {
  siteHeader: {
    zIndex: "11111",
  },
  navMenuBigScreen: {
    display: ["none", "none", "none", "flex"],
  },
  navMenu: {
    display: ["block", "block", "block", "none"],
    ".site-menu": {
      display: "none",
    },
  },
  container: {
    maxWidth: siteLayout.headerLayout,
    m: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    pl: ["20px", "20px", "40px", "40px", "80px"],
    pr: ["0", "0", "40px", "40px", "80px"],
  },
  navIcons: {
    display: ["flex", "flex", "flex", "none"],
    float: ["right", "right", "inherit"],
  },
  shareIcon: {
    display: ["block", "block", "block", "none"],
    ".search-container": {
      mr: "0px !important",
    },
  },
  theme: {
    display: ["none", "none", "none", "flex"],
  },
}

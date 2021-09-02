/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Link } from "gatsby"
import { RiMenu3Line, RiCloseLine } from "react-icons/ri"

import MenuJSON from "../util/headerMenu.json"
import Theme from "../components/theme"
import Sitedata from "../util/site.json"
import { darken, lighten } from "@theme-ui/color"

const MenuItems = MenuJSON.menu
const ListLink = props => {
  const { to, children, subMenu } = props
  return (
    <li className={props.className}>
      <Link to={to}>{children}</Link>
      {subMenu && subMenu.length !== 0 && (
        <div>
          <span className="upperArrow"></span>
          <ul className="site-subMenu">
            <SubMenuItems data={subMenu} />
          </ul>
        </div>
      )}
    </li>
  )
}

const SubMenuItems = props => {
  const { data } = props
  const menuItems = data
  const subMenuList = menuItems.map((menuItem, index) => {
    return (
      <ListLink key={"submenu-" + index.toString()} to={menuItem.url}>
        {menuItem.title}
      </ListLink>
    )
  })
  return <>{subMenuList}</>
}

const listMenuItems = MenuItems.map((menuItem, index) => {
  return (
    <ListLink
      key={"menu-" + index.toString()}
      to={menuItem.url}
      subMenu={menuItem.submenu}
    >
      {menuItem.title}
    </ListLink>
  )
})

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showMenu: false }
    this.handleToggleClick = this.handleToggleClick.bind(this)
  }

  handleToggleClick() {
    this.setState(state => ({
      showMenu: !state.showMenu,
    }))
  }

  render() {
    return (
      <nav sx={navStyles.navcontainer}>
        <button
          onClick={this.handleToggleClick}
          className={
            this.state.showMenu ? "menu-trigger is-active" : "menu-trigger"
          }
        >
          <div className="icon-menu-line">
            <RiMenu3Line />
          </div>
          <div className="icon-menu-close">
            <RiCloseLine />
          </div>
        </button>
        <ul className="site-menu">
          {listMenuItems}
          <div className="theme">
            {Sitedata.meta.darkModeVisibility === "YES" ? <Theme /> : ""}
          </div>
        </ul>
      </nav>
    )
  }
}

export default Navigation

const navStyles = {
  navcontainer: {
    position: "relative",
    ".site-menu": {
      m: 0,
      p: 0,
      listStyle: "none",
      bg: "transparent",
      "> li": {
        display: "inline-block",
        position: "relative",
        "&:hover": {
          "> a": {
            color: "SecondaryColor",
            position: "relative",
            zIndex: 1000,
          },
          ".site-subMenu": {
            display: "block",
            position: "absolute",
            zIndex: 999,
          },
          ".upperArrow": {
            "::before": {
              content: "''",
              position: "absolute",
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderBottom: "10px solid",
              borderBottomColor: "menuBgColor",
              opacity: "0.9",
              borderRight: "10px solid transparent",
              left: "50%",
              transform: "translateX(-50%)",
              marginTop: "-10px",
              display: ["none", "none", "none", "block"],
            },
          },
        },
      },
      "> li a": {
        display: "block",
        py: "0",
        fontSize: 2,
      },
      "> li > a": {
        px: 3,
        lineHeight: "80px",
        color: "primaryColor",
        "&:hover": {
          color: "SecondaryColor",
        },
        "&[aria-current='page']": {
          color: "SecondaryColor",
        },
      },
      ".site-subMenu": {
        display: ["none"],
        m: 0,
        p: 0,
        listStyle: "none",
        width: "300px",
        bg: "menuBgColor",
        borderRadius: "0 0 6px 6px",
        boxShadow:
          "0px 0px 50px 0px rgba(0,0,0,.2), 0px 0px 1px 0px rgba(0,0,0,.1)",
        overflow: "hidden",
        fontSize: 2,
        transform: "50%",
        position: "relative",
        right: 0,
        "> li": {
          display: "block",
          "> a": {
            fontSize: 2,
            py: 3,
            px: 3,
            color: "primaryColor",
            "&:hover": {
              color: "SecondaryColor",
            },
          },
        },
      },
    },
    ".theme": {
      display: "none",
      bg: darken("primaryBgColor", 0.05),
    },
    ".menu-trigger": {
      display: ["flex", "flex", "flex", "none"],
      fontSize: [4, 5],
      width: "inherit",
      height: ["60px", "80px"],
      background: "none",
      border: "none",
      color: "SecondaryColor",
      py: 3,
      px: "20px",
      cursor: "pointer",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      position: "relative",
      mr: "0",
      "&:focus": {
        color: "SecondaryColor",
        bg: "primaryBgColor",
      },
      "&.is-active": {
        color: "SecondaryColor",
        bg: "primaryBgColor",
        "+ .site-menu": {
          display: ["block"],
          position: ["absolute", "absolute", "absolute", "relative"],
          bg: "primaryBgColor",
          minWidth: ["100vw", "320px"],
          maxWidth: "100%",
          maxHeight: [
            "calc(100vh - 200px)",
            "calc(100vh - 200px)",
            "inherit",
            "inherit",
          ],
          zIndex: 999,
          overflow: "hidden",
          overflowY: ["scroll", "scroll", "hidden", "inherit"],
          borderRadius: "0 0 6px 6px",
          boxShadow:
            "0px 0px 50px 0px rgba(0,0,0,.2), 0px 0px 1px 0px rgba(0,0,0,.1)",
          animation: "animation 0.3s",
          transition: "linear transform .3s",
          transformOrigin: "top right",
          transform: "scale(1)",
          opacity: 1,
          top: ["60px", "80px"],
          right: 0,
          pt: 4,
          "@keyframes animation": {
            "0%": {
              opacity: 0,
              transform: "scale(0)",
            },
            "50%": {
              transform: "scale(1)",
            },
            "100%": {
              opacity: 1,
              transform: "scale(1)",
            },
          },
          "> li": {
            display: ["block", "block", "block", "inline-block"],
            position: "relative",
            "&:hover": {
              ".site-subMenu": {
                display: "block",
                position: ["relative", null, null, "absolute"],
                left: "0",
              },
            },
            "> a": {
              lineHeight: "44px",
            },
          },
          ".site-subMenu": {
            display: ["block", "block", "block", "none"],
            position: "relative",
            borderRadius: ["0"],
            boxShadow: "none",
            mx: 0,
            width: "inherit",
            a: {
              lineHeight: "44px",
              pl: 4,
              py: 0,
              "&::before": {
                content: "'—'",
                color: lighten("primaryColor", 0.2),
                mr: 3,
              },
            },
          },
          ".theme": {
            mt: 4,
            display: "block",
          },
        },
        ".icon-menu-line": {
          display: ["none"],
        },
        ".icon-menu-close": {
          display: ["flex"],
        },
      },
      ".icon-menu-line": {
        display: ["flex"],
      },
      ".icon-menu-close": {
        display: ["none"],
      },
    },
  },
}

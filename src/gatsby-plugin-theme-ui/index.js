import defaultColors from "../util/default-colors.json"
import darkColors from "../util/dark-theme-colors.json"
import siteLayout from "../util/siteLayout.json"
import siteFont from "../util/siteFont.json"
import { darken, lighten } from "@theme-ui/color"

const theme = {
  breakpoints: ["40em", "56em", "64em", "90em", "120em"],
  space: [0, 4, 8, 16, 24, 32, 48, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fonts: {
    body: `${siteFont.body}, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif`,
    heading: `${siteFont.heading}, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif`,
    monospace: `${siteFont.monospace}, Consolas, Monaco, Liberation Mono, Lucida Console, monospace`,
  },
  fontWeights: {
    light: 300,
    body: 400,
    heading: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.2,
  },
  colors: {
    ...defaultColors,
    modes: {
      dark: {
        ...darkColors,
      },
    },
  },
  variants: {
    container: {
      maxWidth: siteLayout.containerLayout,
      m: "0 auto",
      px: ["20px", "20px", "40px", "40px", "80px"],
      py: "0",
    },
    homePageSpan: {
      fontWeight: "500 !important",
      textTransform: "uppercase",
      color: "SecondaryColor",
      mt: 0,
      mb: 3,
      display: "block",
      fontSize: 1,
      strong: {
        fontWeight: "900",
      },
    },
    markdown: {
      maxWidth: ["1280px"],
      "h1, h2, h3, h4, h5, h6": {
        color: "primaryColor",
      },
      "p code": {
        fontSize: "18px",
        backgroundColor: "primaryBgColor",
        color: lighten("textColor", 0.02),
        textShadow: "none",
      },
      pre: {
        borderRadius: "12px",
      },
      img: {
        display: "block",
      },
      ".gatsby-resp-image-figure": {
        my: 6,
        mx: 0,
        ".gatsby-resp-image-wrapper": {
          maxWidth: "none !important",
        },
      },
      blockquote: {
        borderLeft: "3px solid",
        borderColor: "borderColor",
        px: 4,
        mx: 0,
        p: {
          fontSize: [3, 3, 4],
          fontWeight: "light",
        },
      },
      "blockquote, pre": {
        my: 5,
      },
      figure: {
        mx: 0,
        my: 3,
        figcaption: {
          mt: 1,
          fontSize: 0,
          textAlign: "ceter",
          color: lighten("textColor", 0.02),
        },
      },
      "p, li": {
        fontSize: 3,
        color: "textColor",
      },
      a: {
        color: "textColor",
        "&:hover": {
          color: darken("textColor", 0.05),
        },
      },
    },
    pageListPagination: {
      my: 8,
      textAlign: "center",
      ul: {
        m: 0,
        p: 0,
        display: "flex",
        justifyContent: "center",
        gap: 3,
        "li ": {
          listStyle: "none",
          margin: "0 5px",
          a: {
            display: "inline-block",
            fontWeight: "bold",
            lineHeight: "1",
            fontSize: "20px",
            color: "primaryColor",
            "&:hover": {
              color: "SecondaryColor",
            },
            "&.is-active": {
              color: "SecondaryColor",
            },
          },
        },
      },
    },
    pagination: {
      my: 8,
      textAlign: "center",
      borderTop: "1px solid",
      borderColor: "borderColor",
      ul: {
        m: 0,
        p: 0,
        display: ["block", "flex"],
        justifyContent: "space-between",
        "li ": {
          listStyle: "none",
          a: {
            display: "inline-block",
            fontWeight: "bold",
            lineHeight: "1",
            fontSize: "16px",
            color: "primaryColor",
            "&:hover": {
              color: darken("primaryColor", 0.05),
            },
          },
          ".page-title": {
            display: "block",
            my: 3,
          },
          p: {
            fontSize: "18px",
            my: 4,
            color: "SecondaryColor",
          },
          img: {
            maxWidth: ["100%", "100%", "250px"],
            borderRadius: "12px",
          },
          "&:nth-child(1)": {
            textAlign: "left",
          },
          "&:nth-child(2)": {
            textAlign: "right",
          },
        },
      },
    },

    breadcrumb: {
      variant: "variants.container",
      ol: {
        listStyle: "none",
        mx: "auto",
        my: 0,
        py: 3,
        fontSize: 2,
        px: "0 !important",
        li: {
          display: "inline",
          mx: 2,
          "&:first-child": {
            ml: 0,
          },
        },
        a: {
          color: "textColor",
          "&:hover": {
            color: "primaryColor",
            textDecoration: "underline",
          },
        },
      },
    },
    section: {
      py: 7,
    },
    pageHead: {
      pb: 7,
      h1: {
        mt: 2,
        mb: 0,
        color: "primaryColor",
        fontSize: [5, 6, 7],
        maxWidth: "30ch",
        lineHeight: "1.1",
      },
      p: {
        display: "inline-block",
        m: 0,
        maxWidth: "60ch",
        fontSize: 3,
        color: "textColor",
      },
    },
    button: {
      primary: {
        py: 3,
        px: [3, 4],
        mr: [3, 4],
        display: "inline-flex",
        alignItems: "center",
        borderRadius: "12px",
        textDecoration: "none",
        appearance: "none",
        border: "none",
        fontSize: "inherit",
        color: "buttonTextColor",
        bg: "buttonColor",
        "&:hover": {
          bg: lighten("buttonColor", 0.1),
        },
      },
      secondary: {
        py: 3,
        px: [3, 4],
        display: "inline-flex",
        alignItems: "center",
        borderRadius: "12px",
        textDecoration: "none",
        appearance: "none",
        border: "none",
        fontSize: "inherit",
        color: darken("buttonColor", 0.5),
        bg: lighten("buttonColor", 0.1),
        "&:hover": {
          color: "buttonTextColor",
        },
      },
    },
  },
}
export default theme

/** @jsx jsx */
import { jsx } from "theme-ui"
import { useColorMode } from "theme-ui"
import { FiMoon, FiSun } from "react-icons/fi"

const Colors = props => {
  const [colorMode, setColorMode] = useColorMode()

  return (
    <div sx={themeStyles.modeOption}>
      <button
        onClick={e => {
          setColorMode(colorMode === "default" ? "dark" : "default")
        }}
      >
        {colorMode === "default" ? <FiMoon /> : <FiSun />}
        <div sx={themeStyles.modeText}>
          {colorMode === "default" ? "Dark" : "Light"}
        </div>
      </button>
    </div>
  )
}
export default Colors

const themeStyles = {
  modeOption: {
    bg: "transparent",
    button: {
      p: 0,
      pl: [4, 4, 0, 0],
      ml: [0, 0, 4, 0],
      fontSize: 3,
      bg: "transparent",
      border: "none",
      display: "flex",
      alignItems: "center",
      color: "primaryColor",
      cursor: "pointer",
      width: ["100%", "100%", "100%", "60px"],
      height: ["60px", "80px"],
      justifyContent: ["left", "left", "left", "center"],
      "&:hover, &:focus": {
        color: "SecondaryColor",
      },
    },
  },
  modeText: {
    fontSize: "16px",
    display: ["block", "block", "block", "none"],
    ml: 3,
  },
}

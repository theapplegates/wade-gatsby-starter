/** @jsx jsx */
import { jsx } from "theme-ui"
import ConvertKitForm from "convertkit-react"
import Integration from "../util/integrations.json"
import { lighten, darken } from "@theme-ui/color"

const config = {
  formId: Integration.convertkit.formId,
  submitText: Integration.convertkit.submitText
    ? Integration.convertkit.submitText
    : "Subscribe",
}

const Convertkit = () => {
  return (
    <div sx={{ ...convertkitStyles }}>
      <h3>
        {Integration.convertkit.Title
          ? Integration.convertkit.Title
          : "Subscribe for the latest updates from us"}
      </h3>
      <p>
        {Integration.convertkit.subscribeDescription
          ? Integration.convertkit.subscribeDescription
          : "We respect your privacy. you can Unsubscribe at any time"}
      </p>
      <ConvertKitForm {...config} />
    </div>
  )
}

export default Convertkit

const convertkitStyles = {
  padding: 5,
  borderRadius: "12px",
  bg: "primaryBgColor",
  border: "2px solid",
  borderColor: "borderColor",
  my: 7,
  h3: {
    fontSize: 4,
    fontWeight: 900,
    m: 0,
    color: "primaryColor",
  },
  p: {
    fontSize: 2,
    color: lighten("textColor", 0.1),
    m: 0,
    opacity: 0.8,
  },
  input: {
    py: 3,
    px: 3,
    mt: [3, 4],
    mr: 3,
    mb: 0,
    width: ["100%", "100%", "100%", "35%"],
    appearance: "none",
    border: "1px solid",
    borderColor: "borderColor",
    borderRadius: "6px",
    bg: "#fff",
    fontSize: 1,
    outline: "none",
  },
  button: {
    mt: 3,
    p: "15px 30px",
    display: "inline-block",
    textTransform: "uppercase",
    border: "1px solid",
    borderColor: "buttonColor",
    borderRadius: "6px",
    bg: "buttonColor",
    fontWeight: "700",
    color: "buttonTextColor",
    transition: "background .3s ease",
    "&:hover": {
      bg: darken("buttonColor", 0.2),
    },
  },
}

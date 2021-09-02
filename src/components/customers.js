/** @jsx jsx */
import { jsx } from "theme-ui"
import { getSrc, GatsbyImage } from "gatsby-plugin-image"

const Customers = props => {
  const images = props.data.customerImages

  const customersLogo = images.map((customer, index) => {
    const hasImage = getSrc(customer.customerImage) ? true : false
    const customerImage = hasImage === true ? customer.customerImage.childImageSharp.gatsbyImageData : ""
    const CustomerName = customer.customerName ? customer.customerName : ""
    return (
      <div sx={customerStyles.customerImg} key={"CImg" + index}>
        {customerImage !== "" ? (
          <GatsbyImage image={customerImage} alt={CustomerName} />
        ) : (
          <div
            sx={customerStyles.logo}
            style={{
              mask:
                "url('" +
                customer.customerImage.publicURL +
                "') no-repeat center / contain",
              WebkitMask:
                "url('" +
                customer.customerImage.publicURL +
                "') no-repeat center / contain",
            }}
          />
        )}
      </div>
    )
  })

  return (
    <div sx={customerStyles.customerContainer}>
      <div sx={customerStyles.customers}>
        <div>
          <span sx={{ variant: "variants.homePageSpan" }}>
            <strong>—</strong> {props.data.title}
          </span>
          <h3 sx={customerStyles.title}>{props.data.description}</h3>
        </div>
        <div sx={customerStyles.customerImages}>{customersLogo}</div>
      </div>
    </div>
  )
}

export default Customers

const customerStyles = {
  customerContainer: {
    variant: "variants.section",
    bg: "primaryBgColor",
  },
  logo: {
    opacity: "0.6",
    height: "60px",
    bg: "primaryColor",
    mx: [3, 0],
  },
  customers: {
    variant: "variants.container",
    display: "grid",
    gridTemplateColumns: ["1fr", "1fr", "1fr 1.2fr"],
    gridGap: 7,
    alignItems: "center",
  },
  customerImages: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    columnGap: [6, 8, 7, 7, 8],
    rowGap: 5,
  },
  customerImg: {
    width: "130px",
    ".gatsby-image-wrapper": {
      width: "100%",
      mx: "auto",
      filter: "grayscale(1)",
      opacity: "0.9",
      textAlign: "center",
      transition: "filter .3s linear, opacity .3s linear",
    },
  },
  title: {
    color: "primaryColor",
    fontSize: [5, 5, 6],
    m: 0,
    fontWeight: "initial !important",
  },
}

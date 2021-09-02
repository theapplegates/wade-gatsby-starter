/** @jsx jsx */
import { jsx } from "theme-ui"
import { RiChatQuoteFill } from "react-icons/ri"

import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"

const Testimonials = props => {
  const data = props.data
  const testimonial = data.map((item, index) => {
    return (
      <div key={"testimonial" + index}>
        {item.description ? (
          <p sx={testimonialsStyles.description}>{item.description}</p>
        ) : (
          ""
        )}
        {item.name || item.jobRole ? (
          <div sx={testimonialsStyles.testimonialData}>
            {item.name ? <h3>{item.name}</h3> : ""}
            {item.jobRole ? <span>{item.jobRole}</span> : ""}
          </div>
        ) : (
          ""
        )}
      </div>
    )
  })

  return (
    <div sx={testimonialsStyles.testimonial}>
      <div sx={testimonialsStyles.testimonials}>
        <div sx={testimonialsStyles.quoteicon}>
          <RiChatQuoteFill />
        </div>
        <Carousel
          autoPlay
          infiniteLoop
          transitionTime={1000}
          showStatus={false}
          showThumbs={false}
          showIndicators={false}
        >
          {testimonial}
        </Carousel>
      </div>
    </div>
  )
}

export default Testimonials

const testimonialsStyles = {
  testimonial: {
    maxWidth: "100%",
    width: "100%",
    variant: "variants.section",
    bg: "primaryBgColor",
    ".slide": {
      bg: "transparent",
    },
    ".carousel .control-prev.control-arrow::before": {
      borderRight: "8px solid",
      borderColor: "borderColor",
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
    },
    ".carousel .control-next.control-arrow::before": {
      borderLeft: "8px solid",
      borderColor: "borderColor",
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
    },
    ".carousel.carousel-slider .control-arrow:hover": {
      bg: "transparent",
    },
    ".carousel .control-arrow, .carousel.carousel-slider .control-arrow": {
      opacity: 0.8,
      "&:hover": {
        opacity: 1,
      },
    },
  },
  testimonials: {
    variant: "variants.container",
    textAlign: "center !important",
  },
  quoteicon: {
    fontSize: [7, 8],
    color: "SecondaryColor",
    display: "inline-flex",
  },
  description: {
    fontSize: [3, 4, 5],
    color: "textColor",
    mb: 0,
    pb: 3,
    px: [6],
    lineHeight: "1.3",
  },
  testimonialData: {
    textTransform: "capitalize",
    pb: "20px",
    h3: {
      fontSize: 5,
      my: 0,
      mt: [2, 3, 4],
      color: "SecondaryColor",
      fontWeight: "400",
    },
    span: {
      mt: 1,
      fontSize: 2,
      color: "textColor",
    },
  },
}

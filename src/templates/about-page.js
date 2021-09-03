/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ReactMarkdown from "react-markdown"
import { getSrc, GatsbyImage } from "gatsby-plugin-image"

export const pageQuery = graphql`
  query AboutQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 140)
      frontmatter {
        title
        aboutDescription
        images {
          aboutAlign
          aboutImage1 {
            childImageSharp {
							gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH, formats: [AVIF, WEBP, AUTO])
            }
          }
          aboutImage2 {
            childImageSharp {
							gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH, formats: [AVIF, WEBP, AUTO])
            }
          }
          aboutImage3 {
            childImageSharp {
							gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH, formats: [AVIF, WEBP, AUTO])
            }
          }
        }
        timelineContainer {
          hideTimeline
          timelineText
          timeline {
            jobRole
            companyName
            working
            startDate(formatString: "YYYY")
            endDate(formatString: "YYYY")
          }
        }
        educationContainer {
          hideEducation
          educationText
          education {
            universityName
            group
            studying
            startDate(formatString: "YYYY")
            endDate(formatString: "YYYY")
          }
        }
        skillsContainer {
          hideSkills
          skillsText
          skills
        }
      }
    }
  }
`

const AboutPage = ({ data }) => {
  const { markdownRemark } = data // data.markdownRemark holds your page data
  const { frontmatter } = markdownRemark

  // Experiance
  const timelineData = frontmatter.timelineContainer
  const timelineName = timelineData.timelineText
    ? timelineData.timelineText
    : ""
  const timelineInfo = timelineData.timeline.map((info, index) => {
    const startdate = info.startDate === "0000" ? "" : info.startDate
    const enddate = info.endDate === "0000" ? "" : info.endDate
    return (
      <div key={"exp" + index}>
        {(info.companyName || info.jobRole) && (
          <div sx={aboutStyles.timelineCard}>
            {info.companyName ? (
              <p sx={aboutStyles.companyName}>{info.companyName}</p>
            ) : (
              ""
            )}
            {info.jobRole ? (
              <h3 sx={aboutStyles.jobRole}>{info.jobRole}</h3>
            ) : (
              ""
            )}
            {info.startDate && info.endDate && (
              <div sx={aboutStyles.date}>
                <span>{startdate}</span>
                <span sx={aboutStyles.endDate}>
                  {info.working === true ? "Present" : enddate}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    )
  })

  // Education
  const educationData = frontmatter.educationContainer
  const myEducationTitle = educationData.educationText
    ? educationData.educationText
    : ""
  const educationInfo = educationData.education.map((details, index) => {
    const startdate = details.startDate === "0000" ? "" : details.startDate
    const enddate = details.endDate === "0000" ? "" : details.endDate
    return (
      <div key={"edu" + index}>
        {(details.universityName || details.group) && (
          <div sx={aboutStyles.timelineCard}>
            {details.universityName ? (
              <p sx={aboutStyles.companyName}>{details.universityName}</p>
            ) : (
              ""
            )}
            {details.group ? (
              <h3 sx={aboutStyles.jobRole}>{details.group}</h3>
            ) : (
              ""
            )}
            {details.startDate && details.endDate && (
              <div sx={aboutStyles.date}>
                <span>{startdate}</span>
                <span sx={aboutStyles.endDate}>
                  {details.studying === true ? "Present" : enddate}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    )
  })

  // // Images
  const aboutData = frontmatter.images

  const hasImage1 = getSrc(aboutData.aboutImage1).includes("spacer.png")
    ? ""
    : aboutData.aboutImage1.childImageSharp.gatsbyImageData
  const aboutImg1 = <GatsbyImage image={hasImage1} alt="" />

  const hasImage2 = getSrc(aboutData.aboutImage2).includes("spacer.png")
    ? ""
    : aboutData.aboutImage2.childImageSharp.gatsbyImageData
  const aboutImg2 = <GatsbyImage image={hasImage2} alt="" />

  const hasImage3 = getSrc(aboutData.aboutImage3).includes("spacer.png")
    ? ""
    : aboutData.aboutImage3.childImageSharp.gatsbyImageData
  const aboutImg3 = <GatsbyImage image={hasImage3} alt="" />

  const imgContainer = (
    <div sx={aboutStyles.threeImages}>
      <div>{aboutImg1}</div>
      <div>{aboutImg2}</div>
      <div>{aboutImg3}</div>
    </div>
  )
  const content = (
    <div>
      {(frontmatter.title || frontmatter.aboutDescription) && (
        <div>
          {frontmatter.title ? (
            <h1 sx={aboutStyles.aboutTitle}>{frontmatter.title}</h1>
          ) : (
            ""
          )}
          {frontmatter.aboutDescription ? (
            <ReactMarkdown
              sx={aboutStyles.aboutInfo}
              source={frontmatter.aboutDescription}
            />
          ) : (
            ""
          )}
        </div>
      )}
      {timelineData.hideTimeline === false ? (
        ""
      ) : (
        <div sx={{ mt: 7 }}>
          <h2 sx={{ mb: 6, color: "textColor" }}>{timelineName}</h2>
          {timelineInfo}
        </div>
      )}

      {educationData.hideEducation === false ? (
        ""
      ) : (
        <div>
          <h2 sx={{ mb: 6, color: "textColor" }}>{myEducationTitle}</h2>
          {educationInfo}
        </div>
      )}
      {frontmatter.skillsContainer.hideSkills === false ? (
        ""
      ) : (
        <div>
          {frontmatter.skillsContainer.skillsText ? (
            <h2 sx={{ color: "textColor" }}>
              {frontmatter.skillsContainer.skillsText}
            </h2>
          ) : (
            ""
          )}
          {frontmatter.skillsContainer.skills ? (
            <p sx={aboutStyles.skills}>{frontmatter.skillsContainer.skills}</p>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  )

  return (
    <Layout sx={aboutStyles.aboutContainer}>
      <Seo
        title={frontmatter.title}
        description={frontmatter.aboutDescription}
      />
      {aboutData.aboutAlign === "left" ? (
        <div sx={aboutStyles.gridLeft}>
          <div>
            <div sx={aboutStyles.image}>{imgContainer}</div>
          </div>
          <div sx={aboutStyles.content}>{content}</div>
        </div>
      ) : (
        <div sx={aboutStyles.gridRight}>
          <div sx={aboutStyles.orderOne}>
            <div sx={aboutStyles.image}>{imgContainer}</div>
          </div>
          <div sx={aboutStyles.content}>{content}</div>
          <div sx={aboutStyles.orderTwo}>
            <div sx={aboutStyles.image}>{imgContainer}</div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default AboutPage

const aboutStyles = {
  aboutContainer: {
    variant: "variants.section",
    pt: [4, 4, 7],
  },
  gridLeft: {
    variant: "variants.container",
    display: ["grid"],
    gridTemplateColumns: ["1fr", "1fr", "1fr 1fr"],
    gridGap: "64px",
    px: ["20px", "20px", "40px", "40px", "80px"],
  },
  gridRight: {
    variant: "variants.container",
    display: ["grid"],
    gridTemplateColumns: ["1fr", "1fr", "1.5fr 1fr"],
    gridGap: "64px",
    px: ["20px", "20px", "40px", "40px", "80px"],
  },
  image: {
    position: "sticky",
    top: "100px",
    mb: [6, 7, 0],
    overflow: "hidden",
    img: {
      display: "block",
      maxWidth: "100%",
      width: "100%",
    },
  },
  aboutTitle: {
    fontSize: ["64px !important", "64px !important", "96px !important"],
    mt: 0,
    mb: 3,
    color: "primaryColor",
  },
  aboutInfo: {
    fontSize: 3,
    mt: 0,
    mb: 6,
    fontWeight: "400",
    color: "textColor",
  },
  orderOne: {
    display: ["block", "block", "none"],
  },
  orderTwo: {
    display: ["none", "none", "block"],
  },

  // Timeline, Journey and Education Details
  timelineCard: {
    pb: 6,
    position: "relative",
    ml: "60px",
    "&::after": {
      content: "''",
      position: "absolute",
      width: "3px",
      bg: "borderColor",
      opacity: "0.3",
      top: "0",
      bottom: "0",
      left: "-49px",
    },
    "&::before": {
      content: "''",
      position: "absolute",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      bg: "borderColor",
      left: "-57px",
      zIndex: "1",
    },
  },
  companyName: {
    m: 0,
    color: "textColor",
    fontSize: 3,
    lineHeight: "20px",
  },
  jobRole: {
    fontSize: 5,
    mt: 1,
    mb: 0,
    color: "primaryColor",
    fontWeight: "500 !important",
  },
  timelineMeta: {
    color: "textColor",
    fontSize: 2,
    my: 2,
  },
  date: {
    py: 1,
    span: {
      color: "SecondaryColor",
      fontSize: 1,
      fontWeight: "500",
    },
  },
  endDate: {
    "&::before": {
      content: "'—'",
      mx: 2,
    },
  },
  skills: {
    fontSize: 3,
    m: 0,
    color: "textColor",
  },

  //images
  threeImages: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2px",
    "> div": {
      overflow: "hidden",
      ".gatsby-image-wrapper": {
        maxWidth: "100% !important",
      },
      "&:nth-of-type(1)": {
        gridColumn: "1/3",
        borderBottomLeftRadius: "30px",
        borderTopRightRadius: "30px",
      },
      "&:nth-of-type(2)": {
        borderBottomLeftRadius: "30px",
        borderTopRightRadius: "30px",
      },
      "&:nth-of-type(3)": {
        borderBottomRightRadius: "30px",
        borderTopLeftRadius: "30px",
      },
    },
  },
}

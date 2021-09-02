import React from "react"
import { DiscussionEmbed } from "disqus-react"
import Integration from "../util/integrations.json"

const Disqus = props => {
  const disqusShortname = Integration.disqus.disqusUrl
  const disqusConfig = {
    identifier: props.id,
    title: props.title,
    url: props.url,
  }
  return <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
}

export default Disqus

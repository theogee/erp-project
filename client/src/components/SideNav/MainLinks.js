import React from "react";

import MainLink from "./MainLink";

export default function MainLinks(props) {
  return props.links.map((link) => <MainLink key={link.name} link={link} />);
}

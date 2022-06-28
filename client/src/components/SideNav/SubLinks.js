import React from "react";

import SubLink from "./SubLink";

export default function SubLinks(props) {
  return props.subLinks.map((subLink, i) => (
    <SubLink
      subLink={subLink}
      isLast={i === props.subLinks.length - 1 ? true : false}
    />
  ));
}

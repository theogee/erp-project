import React from "react";

import CircleIcon from "@mui/icons-material/Circle";

export default function GeeCircleStatus(props) {
  const { cummulativeQty, safetyStockQty } = props;

  const determineColor = (cummulativeQty, safetyStockQty) => {
    if (cummulativeQty === safetyStockQty) return "red";
    else if (cummulativeQty <= safetyStockQty * 2) return "yellow";
    else return "signatureGreen";
  };

  const color = determineColor(cummulativeQty, safetyStockQty);

  return <CircleIcon color={color} fontSize="10" />;
}

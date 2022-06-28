import React from "react";

import CircleIcon from "@mui/icons-material/Circle";

export default function GeeCircleStatus(props) {
  const { type, status, cummulativeQty, safetyStockQty } = props;

  let color;

  const determineColorStock = (cummulativeQty, safetyStockQty) => {
    if (!safetyStockQty) return "grey";
    else if (safetyStockQty >= cummulativeQty) return "red";
    else if (cummulativeQty <= safetyStockQty * 2) return "yellow";
    else return "signatureGreen";
  };

  const determineColorStatus = (status) => {
    if (status === "yellow") return "yellow";
    else if (status === "red") return "red";
    else return "signatureGreen";
  };
  if (type === "status") color = determineColorStatus(status);
  else if (type === "stock")
    color = determineColorStock(cummulativeQty, safetyStockQty);

  return <CircleIcon color={color} fontSize="10" />;
}

export const getSupplierPayload = (supplier, businessID) => {
  return {
    businessID: businessID,
    name: supplier.name,
    address: supplier.address,
    telp: supplier.telp,
  };
};

export const getMaterialPayload = (
  material,
  businessID,
  isSafetyStockEnabled
) => {
  const payload = {
    businessID: businessID,
    measurementID: material.measurement.id,
    name: material.name,
  };

  if (isSafetyStockEnabled) payload.safetyStockQty = material.safetyStockQty;

  return payload;
};

export const getBatchPayload = (batch) => {
  return {
    supplierID: batch.supplier.id,
    purchaseQty: batch.qty,
    currentQty: batch.qty,
    pricePerUnit: batch.purchasePrice / batch.qty,
    purchasePrice: batch.purchasePrice,
    purchaseDate: batch.purchaseDate,
    expiryDate: batch.expiryDate,
  };
};

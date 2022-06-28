export const getBusinessPayload = (business) => {
  return {
    name: business.name,
    address: business.address,
  };
};

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

export const getProductMaterialPayload = (productMaterial, product_id) => {
  return {
    productID: product_id,
    materialID: productMaterial.material.id,
    measurementID: productMaterial.measurement.id,
    qty: productMaterial.qty,
  };
};

export const getProductPayload = (product, businessID) => {
  return {
    businessID: businessID,
    name: product.name,
    price: product.price,
    productionProcess: product.productionProcess,
  };
};

export const getJobPayload = (job) => {
  return {
    productID: job.product.id,
    productionDate: job.productionDate,
    expiryDate: job.expiryDate,
    qty: job.qty,
  };
};

export const getOrderPayload = (order, businessID) => {
  return {
    businessID: businessID,
    orderDate: order.orderDate,
    clientName: order.clientName,
    orderItems: order.orderItems,
  };
};

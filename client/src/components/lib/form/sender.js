import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const sendBusiness = async (payload) => {
  const { data } = await axios.post(SERVER_URL + "/api/business", payload, {
    withCredentials: true,
  });

  if (!data.success) throw new Error("Something went wrong.");

  return data.success;
};

export const sendSupplier = async (payload) => {
  const { data } = await axios.post(SERVER_URL + "/api/supplier", payload, {
    withCredentials: true,
  });

  if (!data.success) throw new Error("Something went wrong.");

  return data.success;
};

export const sendMaterial = async (payload) => {
  const { data } = await axios.post(SERVER_URL + "/api/material", payload, {
    withCredentials: true,
  });

  if (!data.success) throw new Error("Something went wrong.");

  return data.data.material_id;
};

export const sendBatch = async (payload) => {
  const { data } = await axios.post(SERVER_URL + "/api/batches", payload, {
    withCredentials: true,
  });

  if (!data.success) throw new Error("Something went wrong.");

  return data.success;
};

export const sendProduct = async (payload) => {
  const { data } = await axios.post(SERVER_URL + "/api/product", payload, {
    withCredentials: true,
  });

  if (!data.success) throw new Error("Something went wrong.");

  return data.data.product_id;
};

export const sendProductMaterial = async (payload) => {
  const { data } = await axios.post(
    SERVER_URL + "/api/product_material",
    payload,
    {
      withCredentials: true,
    }
  );

  if (!data.success) throw new Error("Something went wrong.");

  return data.success;
};

export const sendJob = async (payload) => {
  const { data } = await axios.post(SERVER_URL + "/api/job", payload, {
    withCredentials: true,
  });

  if (!data.success) throw new Error("Something went wrong.");

  return data.success;
};

export const sendOrder = async (payload) => {
  const { data } = await axios.post(SERVER_URL + `/api/order`, payload, {
    withCredentials: true,
  });

  if (!data.success) throw new Error("Something went wrong.");

  return data.success;
};

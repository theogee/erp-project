import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

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

export const sendProductMaterial = async (payload) => {
  const { data } = await axios.post(SERVER_URL + "/api/product_material", payload, {
    withCredentials: true,
  });

  if (!data.success) throw new Error("Something went wrong.");

  return data.success;
}
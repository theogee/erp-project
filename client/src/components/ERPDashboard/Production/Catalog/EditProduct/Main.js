import React from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import EditProduct from "./EditProduct";
import MaterialsPerUnit from "./MaterialsPerUnit";

export default function Main() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();
  const params = useParams();

  const [product, setProduct] = React.useState({});
  const [productMaterials, setProductMaterials] = React.useState([]); // store all added materials for the product

  React.useEffect(() => {
    (async () => {
      try {
        const [
          { data: productData },
          { data: productMaterialsData },
          { data: productBatchesData },
        ] = await Promise.all([
          axios.get(SERVER_URL + `/api/product/${params.productID}`, {
            withCredentials: true,
          }),
          axios.get(
            SERVER_URL + `/api/product_material?productID=${params.productID}`,
            { withCredentials: true }
          ),
          axios.get(
            SERVER_URL +
              `/api/product_batches/p/${params.productID}?status=yellow`,
            { withCredentials: true }
          ),
        ]);

        productMaterialsData.data = productMaterialsData.data.map((pm) => ({
          id: pm.material_id,
          name: pm.name,
          qty: pm.qty,
          measurement: pm.measurement_name,
          measurementID: pm.measurement_id,
        }));

        if (productBatchesData.data.length !== 0)
          navigate(`/b/${params.businessID}/dashboard/production`);

        setProduct(productData.data);
        setProductMaterials(productMaterialsData.data);
      } catch (err) {
        console.log(err);
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, []);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      component="main"
      sx={{ backgroundColor: "#F3F3F3" }}
    >
      <EditProduct product={product} productMaterials={productMaterials} />
      <MaterialsPerUnit
        productMaterials={productMaterials}
        setProductMaterials={(newState) => setProductMaterials(newState)}
      />
    </Stack>
  );
}

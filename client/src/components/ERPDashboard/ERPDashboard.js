import { default as React, useState, useEffect } from "react";

import axios from "axios";

import { Outlet, useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { SideNav } from "../SideNav";

export default function ERPDashboard() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();
  const { businessID } = useParams();

  const [business, setBusiness] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data: businessData } = await axios.get(
          SERVER_URL + `/api/business/${businessID}`,
          {
            withCredentials: true,
          }
        );

        const { data: userData } = await axios.get(SERVER_URL + "/api/user", {
          withCredentials: true,
        });

        setBusiness(businessData.data);

        setUser(userData);
      } catch (err) {
        console.log(err);
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, []);

  const links = [
    {
      to: "inventory",
      name: "Inventory",
      subLinks: [
        { to: "inventory/materials", name: "Materials" },
        { to: "inventory/products", name: "Products" },
      ],
    },
    {
      to: "production",
      name: "Production",
    },
  ];

  return (
    <Stack component="main" direction="row">
      <SideNav
        avatarTitle={business.name}
        avatarSubtitle={user.firstname + " " + user.lastname}
        links={links}
      />
      <Box
        sx={{
          padding: "40px 53px",
          maxWidth: "100%",
          flexGrow: "100",
        }}
      >
        <Outlet context={{ user, businessID }} />
      </Box>
    </Stack>
  );
}

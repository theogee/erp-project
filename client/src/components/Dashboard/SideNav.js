import React from "react";
import axios from "axios";

import { NavLink, useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";

export default function SideNav(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  const style = {
    width: "260px",
  };

  const logout = async () => {
    try {
      await axios.get(SERVER_URL + "/auth/google/logout", {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="sidebar">
      <Stack sx={style}>
        <div className="profile">
          <p style={{ float: "right" }}>
            {props.firstname + " " + props.lastname}
          </p>
          <p style={{ float: "right" }}>{props.email}</p>
          <Avatar
            alt={props.firstname + " " + props.lastname}
            src={props.profile_picture}
          />
        </div>
        <Link component={NavLink} to="/dashboard/home">
          home
        </Link>
        <Link component={NavLink} to="/" onClick={logout}>
          Logout
        </Link>
      </Stack>
    </nav>
  );
}

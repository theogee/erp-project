/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import axios from "axios";

import { NavLink, useNavigate } from "react-router-dom";

import styled from "@emotion/styled";

import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";

const StyledStack = styled(Stack)`
  background-color: white;
  width: 260px;
  padding: 24px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

const StyledLink = styled(Link)`
  padding: 12px;
  font-size: 14px;
  border-radius: 4px;
`;

const StyledGreyLink = styled(Link)`
  padding: 12px;
  font-size: 12px;
  color: #4b5563;
`;

export default function SideNav(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();

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

  const links = [{ to: "/dashboard", name: "home" }];
  const LinksComponent = () => {
    return links.map((link) => (
      <StyledLink
        key={link.name}
        component={NavLink}
        to={link.to}
        underline="none"
        style={({ isActive }) => ({
          backgroundColor: isActive ? "black" : "white",
          color: isActive ? "white" : "black",
        })}
      >
        {link.name}
      </StyledLink>
    ));
  };

  const greyLinks = [
    { to: "/dashboard/settings", name: "Settings" },
    { to: "/", name: "Logout", onClick: logout },
  ];
  const GreyLinksComponent = () => {
    return (
      <Stack sx={{ marginTop: "24px" }}>
        {greyLinks.map((link) => (
          <StyledGreyLink
            key={link.name}
            component={NavLink}
            to={link.to}
            underline="none"
            onClick={link.onClick ? link.onClick : ""}
          >
            {link.name}
          </StyledGreyLink>
        ))}
      </Stack>
    );
  };

  return (
    <nav className="sidebar">
      <StyledStack sx={{ height: "100vh" }}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ marginBottom: "24px" }}
        >
          <Avatar
            alt={props.firstname + " " + props.lastname}
            src={props.profile_picture}
          />
          <div css={{ marginLeft: 8 }}>
            <p css={{ fontWeight: 500, fontSize: 14 }}>
              {props.firstname + " " + props.lastname}
            </p>
            <p css={{ fontSize: 12 }}>{props.email}</p>
          </div>
        </Stack>
        <LinksComponent />
        <GreyLinksComponent />
      </StyledStack>
    </nav>
  );
}

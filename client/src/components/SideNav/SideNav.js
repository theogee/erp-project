/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

import MainLinks from "./MainLinks";
import GreyLinks from "./GreyLinks";

const StyledStack = styled(Stack)`
  background-color: white;
  min-width: 260px;
  padding: 24px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

export default function SideNav(props) {
  return (
    <Box
      component="nav"
      sx={{ position: "sticky", top: "0", alignSelf: "flex-start" }}
    >
      <StyledStack sx={{ height: "100vh" }}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ marginBottom: "24px" }}
        >
          <Avatar
            alt={props.avatarTitle}
            src={props.profile_picture}
            referrerPolicy="no-referrer"
          />
          <Box sx={{ marginLeft: "8px" }}>
            <p css={{ fontWeight: 500, fontSize: 14 }}>{props.avatarTitle}</p>
            <p css={{ fontSize: 12 }}>{props.avatarSubtitle}</p>
          </Box>
        </Stack>
        <MainLinks links={props.links} />
        <GreyLinks />
      </StyledStack>
    </Box>
  );
}

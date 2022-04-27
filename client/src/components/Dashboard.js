import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function Dashboard() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(SERVER_URL + "/api/user", {
          withCredentials: true,
        });

        setUser(data);
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, []);

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
    <main>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          alt={`${user.firstname} ${user.lastname}`}
          src={user.profile_picture}
        />
        <p>
          {user.firstname} {user.lastname}
        </p>
        <Button onClick={logout} variant="contained" color="error">
          logout
        </Button>
      </Stack>
    </main>
  );
}

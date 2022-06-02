import React from "react";

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main>
      <h1>Oops... You're not supposed to be here.</h1>
      <br />
      <Link to="/dashboard">Go back</Link>
    </main>
  );
}

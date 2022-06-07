import React from "react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <main>
      <h1>
        Sorry, you're unauthorized to access the resource. Please login to
        continue.
      </h1>
      <Link to="/login">Login</Link>
    </main>
  );
}

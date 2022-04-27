import React from "react";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <main>
      <h1>Hello World!</h1>
      <nav>
        <Link to="/login">Login</Link>
      </nav>
    </main>
  );
}

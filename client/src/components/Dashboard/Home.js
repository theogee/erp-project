import React from "react";

import { useOutletContext } from "react-router-dom";

export default function Home() {
  const user = useOutletContext();
  return (
    <section className="home">
      <h1>Hello, {user.firstname + " " + user.lastname}!</h1>
    </section>
  );
}

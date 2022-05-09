import React from "react";

import { useOutletContext } from "react-router-dom";

export default function Home() {
  const user = useOutletContext();
  console.log(user);
  return (
    <section className="business">
      <h1>Hello, {user.firstname + " " + user.lastname}!</h1>
    </section>
  );
}

"use client";
import * as React from "react";
import { useMinebrukere } from "../api/kandidatsok/minebrukere/minebrukere";

const Page: React.FC = () => {
  const { isLoading, error, data } = useMinebrukere();
  return (
    <React.Fragment>
      Hello{" "}
      <ul>
        {data && data.kandidater.map((b, i) => <li key={i}>{b.fornavn}</li>)}
      </ul>
    </React.Fragment>
  );
};

export default Page;

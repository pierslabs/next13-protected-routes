"use client";
import { useRouter } from "next/router";
import React from "react";

export default function Page({ params }: { params: { userId: string } }) {
  console.log("Page", params);

  return <h1>My Page: {params.userId} </h1>;
}

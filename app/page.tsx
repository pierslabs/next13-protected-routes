"use client";
import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div
      className=" flex flex-col
     justify-center items-center min-w-screen  min-h-screen  "
    >
      <h1 className="text-3xl font-bold underline">Home</h1>
      <Link
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-48 text-center"
        href="/user"
      >
        User
      </Link>
    </div>
  );
};

export default Home;

import Link from "next/link";
import React from "react";

const User = () => {
  return (
    <div className="flex flex-col justify-center items-center min-w-screen min-h-screen ">
      <h1 className="text-2xl">User</h1>

      <Link
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-48 text-center"
        href="/"
      >
        Home
      </Link>
    </div>
  );
};

export default User;

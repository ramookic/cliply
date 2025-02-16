"use client";

import { useSearchParams } from "next/navigation";

const Alert = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  if (error) {
    return (
      <div className="w-full bg-red-100 text-red-500 p-4 text-sm font-semibold rounded-2xl text-center">
        <p>{error}</p>
      </div>
    );
  }

  return null;
};

export default Alert;

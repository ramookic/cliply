"use client";

import Button from "@/components/ui/button";
import { logoutAction } from "@/lib/actions";

const Page = () => {
  return (
    <div className="h-screen">
      <h1 className="font-semibold text-xl">Dashboard</h1>
      <Button
        fit
        variant="dark"
        onClick={async () => {
          await logoutAction();
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Page;

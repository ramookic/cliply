"use client";

import Button from "@/components/ui/button/button";
import { logoutAction } from "@/lib/actions";

const Page = () => {
  return (
    <div>
      <p>Dashboard page</p>
      <Button
        fit
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

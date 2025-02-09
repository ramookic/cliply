"use client";

import UpdatePasswordForm from "@/components/forms/update-password-form/update-password-form";
import Alert from "@/components/ui/alert/alert";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  if (!code) redirect("/login");

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h4 className="text-xl font-semibold text-zinc-800">
          Update your password
        </h4>
        <p className="text-sm text-zinc-500">Please enter your new password.</p>
      </div>
      <UpdatePasswordForm code={code} />
      <Alert />
      <p className="text-sm text-zinc-500 text-center">
        Remember your password?{" "}
        <Link href="/login" className="text-primary font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Page;

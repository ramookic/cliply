"use client";

import UpdatePasswordForm from "@/components/forms/update-password-form";
import Alert from "@/components/ui/alert";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  if (!code) redirect("/login");

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center flex flex-col gap-2">
        <h4 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">
          Update your password
        </h4>
        <p className="text-sm text-zinc-500">Please enter your new password.</p>
      </div>
      <UpdatePasswordForm code={code} />
      <Alert />
      <p className="text-sm text-zinc-500 text-center">
        Remember your password?{" "}
        <Link
          href="/login"
          className="text-zinc-800 dark:text-zinc-100  font-semibold"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Page;

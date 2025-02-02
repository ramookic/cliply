import ResetPasswordForm from "@/components/forms/reset-password-form/reset-password-form";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h4 className="text-xl font-semibold text-zinc-800">
          Reset your password
        </h4>
        <p className="text-sm text-zinc-500">
          You will receive an email to update your password.
        </p>
      </div>
      <ResetPasswordForm />
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

import ResetPasswordForm from "@/components/forms/reset-password-form/reset-password-form";
import Alert from "@/components/ui/alert/alert";
import Link from "next/link";

const Page = async () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center flex flex-col gap-2">
        <h4 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">
          Reset your password
        </h4>
        <p className="text-sm text-zinc-500">
          You will receive an email to update your password.
        </p>
      </div>
      <ResetPasswordForm />
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

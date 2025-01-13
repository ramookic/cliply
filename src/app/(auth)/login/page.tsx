import Alert from "@/components/ui/alert/alert";
import LoginForm from "@/components/forms/login-form/login-form";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h4 className="text-xl font-semibold text-zinc-800">Welcome back</h4>
        <p className="text-sm text-zinc-500">
          Enter your details to access your account.
        </p>
      </div>
      <LoginForm />
      <Alert />
      <p className="text-sm text-zinc-500 text-center">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary font-semibold">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Page;

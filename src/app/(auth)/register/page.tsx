import Alert from "@/components/ui/alert/alert";
import RegisterForm from "@/components/forms/register-form/register-form";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center flex flex-col gap-2">
        <h4 className="text-3xl font-bold text-zinc-800">Create an account</h4>
        <p className="text-sm text-zinc-500">
          Free forever. No credit card needed.
        </p>
      </div>
      <RegisterForm />
      <Alert />
      <p className="text-sm text-zinc-500 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-zinc-800 font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Page;

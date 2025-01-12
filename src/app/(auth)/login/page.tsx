import LoginForm from "@/components/forms/login-form/login-form";

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
    </div>
  );
};

export default Page;

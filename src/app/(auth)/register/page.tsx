import RegisterForm from "@/components/forms/register-form/register-form";

const Page = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h4 className="text-xl font-semibold text-zinc-800">Get Started</h4>
        <p className="text-sm text-zinc-500">
          Free forever. No credit card needed.
        </p>
      </div>
      <RegisterForm />
    </div>
  );
};

export default Page;

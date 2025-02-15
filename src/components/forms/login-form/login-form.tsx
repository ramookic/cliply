"use client";

import Button from "@/components/ui/button/button";
import Input from "@/components/ui/input/input";
import { loginAction } from "@/lib/actions";
import { FormFields, schema } from "@/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    await loginAction(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Input
        {...register("email")}
        id="email"
        error={errors?.email?.message}
        type="email"
        placeholder="Your email"
        label="Email"
      />
      <Input
        {...register("password")}
        isPassword
        id="password"
        error={errors?.password?.message}
        type="password"
        placeholder="Your password"
        label="Password"
      />
      <p className="text-sm text-zinc-500">
        Forgot your password?{" "}
        <Link
          href="/reset-password"
          className="text-zinc-800 dark:text-zinc-100  font-semibold"
        >
          Reset
        </Link>
      </p>
      <Button
        variant="dark"
        disabled={isSubmitting}
        loader={isSubmitting}
        type="submit"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;

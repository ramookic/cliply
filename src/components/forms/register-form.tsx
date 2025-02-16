"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { registerAction } from "@/lib/actions";
import { FormFields, schema } from "@/schemas/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    await registerAction(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Input
        {...register("name")}
        id="name"
        error={errors?.name?.message}
        type="text"
        placeholder="Your name"
        label="Name"
      />
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
      <Input
        {...register("confirmPassword")}
        isPassword
        id="confirmPassword"
        error={errors?.confirmPassword?.message}
        type="password"
        placeholder="Confirm password"
        label="Confirm password"
      />
      <Button
        variant="dark"
        disabled={isSubmitting}
        loader={isSubmitting}
        type="submit"
      >
        Create account
      </Button>
    </form>
  );
};

export default RegisterForm;

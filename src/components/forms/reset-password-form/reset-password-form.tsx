"use client";

import Button from "@/components/ui/button/button";
import Input from "@/components/ui/input/input";
import { FormFields, schema } from "@/schemas/reset-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    // reset-password-action
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        {...register("email")}
        id="email"
        error={errors?.email?.message}
        type="email"
        placeholder="Your email"
        label="Email"
      />
      <Button disabled={isSubmitting} type="submit">
        Reset
      </Button>
    </form>
  );
};

export default ResetPasswordForm;

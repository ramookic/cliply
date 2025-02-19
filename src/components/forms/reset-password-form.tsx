"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { resetPasswordAction } from "@/lib/actions";
import { FormFields, schema } from "@/schemas/reset-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    await resetPasswordAction(formData);
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
      <Button
        variant={isSubmitSuccessful ? "success" : "dark"}
        disabled={isSubmitting}
        loader={isSubmitting}
        type="submit"
      >
        {isSubmitSuccessful ? "Success, check your email." : "Reset"}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;

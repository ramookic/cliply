"use client";

import Button from "@/components/ui/button/button";
import Input from "@/components/ui/input/input";
import { updatePasswordAction } from "@/lib/actions";
import { FormFields, schema } from "@/schemas/update-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

type UpdatePasswordFormProps = {
  code: string;
};

const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({ code }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    await updatePasswordAction(formData, code);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        {...register("password")}
        id="password"
        error={errors?.password?.message}
        type="password"
        placeholder="Your password"
        label="New password"
      />
      <Input
        {...register("confirmPassword")}
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
        Update
      </Button>
    </form>
  );
};

export default UpdatePasswordForm;

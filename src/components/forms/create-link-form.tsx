"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../ui/input";
import Button from "../ui/button";
import { CreateLinkFormFields, createLinkSchema } from "@/schemas/link-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLinkAction } from "@/lib/actions";

const CreateLinkForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateLinkFormFields>({
    resolver: zodResolver(createLinkSchema),
  });

  const onSubmit: SubmitHandler<CreateLinkFormFields> = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    await createLinkAction(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Input
        {...register("originalUrl")}
        id="originalUrl"
        error={errors?.originalUrl?.message}
        type="text"
        placeholder="Your URL"
        label="Original URL"
      />
      <Input
        {...register("shortcode")}
        id="shortcode"
        error={errors?.shortcode?.message}
        type="text"
        placeholder="Your shortcode"
        label="Short code"
      />
      <Button
        variant="dark"
        disabled={isSubmitting}
        loader={isSubmitting}
        type="submit"
      >
        Create
      </Button>
    </form>
  );
};

export default CreateLinkForm;

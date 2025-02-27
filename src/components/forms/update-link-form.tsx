"use client";

import { UpdateLinkFormFields, updateLinkSchema } from "@/schemas/link-schema";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/button";
import { useState } from "react";
import { updateLinkAction } from "@/lib/actions";
import { Tables } from "../../../types_db";

type UpdateLinkFormProps = {
  linkData: Tables<"links">;
};

const UpdateLinkForm: React.FC<UpdateLinkFormProps> = ({ linkData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateLinkFormFields>({
    resolver: zodResolver(updateLinkSchema),
  });

  const [url, setUrl] = useState(linkData.original_url);
  const [code, setCode] = useState(linkData.short_code);

  const onSubmit: SubmitHandler<UpdateLinkFormFields> = async (data) => {
    const formData = new FormData();

    formData.append("linkId", String(linkData.id));

    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    await updateLinkAction(formData);
  };

  const reset = () => {
    setUrl(linkData.original_url);
    setCode(linkData.short_code);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Input
        {...register("originalUrl")}
        id="originalUrl"
        error={errors?.originalUrl?.message}
        type="text"
        placeholder="Your URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        label="Original URL"
      />
      <Input
        {...register("shortcode")}
        id="shortcode"
        error={errors?.shortcode?.message}
        type="text"
        placeholder="Your shortcode"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        label="Short code"
      />
      <div className="flex items-center justify-start h-auto gap-2">
        <Button
          variant="dark"
          disabled={isSubmitting}
          loader={isSubmitting}
          type="submit"
          fit
        >
          Update
        </Button>
        <Button variant="outline" onClick={reset} fit>
          Reset
        </Button>
      </div>
    </form>
  );
};

export default UpdateLinkForm;

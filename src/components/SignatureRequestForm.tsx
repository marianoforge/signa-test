import React from "react";
import { useForm, useFieldArray, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormValues } from "../types";

interface SignatureRequestFormProps {
  onRequest: (emails: string[]) => void;
}

const validationSchema = yup.object().shape({
  emails: yup
    .array()
    .of(
      yup.object().shape({
        email: yup.string().email("Invalid email").required("Required"),
      })
    )
    .min(1, "At least one email is required"),
});

const SignatureRequestForm: React.FC<SignatureRequestFormProps> = ({
  onRequest,
}) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: { emails: [{ email: "" }] },
    resolver: yupResolver(validationSchema) as Resolver<FormValues>,
  });

  const { fields, append, remove } = useFieldArray({ control, name: "emails" });

  const onSubmit = (data: FormValues) => {
    const emailList = data.emails.map((e) => e.email);
    onRequest(emailList);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow rounded-lg p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Request Signatures
      </h3>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-4">
          <input
            {...register(`emails.${index}.email` as const)}
            placeholder="Signer Email"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.emails?.[index]?.email && (
            <p className="text-sm text-red-600 mt-1">
              {errors.emails?.[index]?.email?.message}
            </p>
          )}
          <button
            type="button"
            onClick={() => remove(index)}
            className="mt-2 text-sm text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => append({ email: "" })}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Signer
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Send Request
        </button>
      </div>
    </form>
  );
};

export default SignatureRequestForm;

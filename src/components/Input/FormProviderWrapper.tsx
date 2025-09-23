import React from "react";
import { FormProvider, type UseFormReturn } from "react-hook-form";

interface Props {
  methods: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  children: React.ReactNode;
}

export function FormProviderWrapper({ methods, onSubmit, children }: Props) {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        // className="w-full max-w-md bg-white shadow-md rounded-2xl p-6 space-y-4"
      >
        {children}
      </form>
    </FormProvider>
  );
}

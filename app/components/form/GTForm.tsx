// "use client";

// import { ReactNode } from "react";
// import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

// interface formConfig {
//   defaultValues?: Record<string, any>;
//   resolver?: any;
// }

// interface IProps extends formConfig {
//   children: ReactNode;
//   onSubmit: SubmitHandler<any>;
// }

// export default function GTForm({
//   children,
//   onSubmit,
//   defaultValues,
//   resolver,
// }: IProps) {
//   const formConfig: formConfig = {};

//   if (!!defaultValues) {
//     formConfig["defaultValues"] = defaultValues;
//   }

//   if (!!resolver) {
//     formConfig["resolver"] = resolver;
//   }

//   const methods = useForm(formConfig);

//   const submitHandler = methods.handleSubmit;

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={submitHandler(onSubmit)}>{children}</form>
//     </FormProvider>
//   );
// }

"use client";

import { ReactNode } from "react";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";

interface formConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

interface IProps extends formConfig {
  children: ReactNode;
  onSubmit: (data: any, methods: UseFormReturn<any>) => void;
}

export default function GTForm({
  children,
  onSubmit,
  defaultValues,
  resolver,
}: IProps) {
  const formConfig: formConfig = {};

  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }

  if (resolver) {
    formConfig.resolver = resolver;
  }

  const methods = useForm(formConfig);

  const submitHandler = methods.handleSubmit((data) => {
    onSubmit(data, methods); // ✅ pass methods including reset
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={submitHandler}>{children}</form>
    </FormProvider>
  );
}

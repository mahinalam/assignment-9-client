"use client";

import React, { Suspense } from "react";

import PaymentLoading from "../PaymentLoading";

import PaymentSuccessPage from "./SuccessComponent";

const SuccessPage = () => {
  return (
    <Suspense fallback={<PaymentLoading />}>
      <PaymentSuccessPage />
    </Suspense>
  );
};

export default SuccessPage;

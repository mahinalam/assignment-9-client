"use client";

import React, { Suspense } from "react";
import PaymentSuccessPage from "./SuccessComponent";
import PaymentLoading from "../PaymentLoading";

const SuccessPage = () => {
  return (
    <Suspense fallback={<PaymentLoading />}>
      <PaymentSuccessPage />
    </Suspense>
  );
};

export default SuccessPage;

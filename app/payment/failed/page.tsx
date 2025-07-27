"use client";

import React, { Suspense } from "react";
import PaymentLoading from "../PaymentLoading";
import PaymentFailedPage from "./FailedComponent";

const FailedPage = () => {
  return (
    <Suspense fallback={<PaymentLoading />}>
      <PaymentFailedPage />
    </Suspense>
  );
};

export default FailedPage;

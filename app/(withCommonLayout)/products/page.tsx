import React, { Suspense } from "react";

import Products from "./Products";

import Container from "@/app/components/sharred/Container";

const SuspenseProductComponent = () => {
  return (
    <Container>
      <Suspense fallback={<div>{/* <ProductsLoading /> */}</div>}>
        <Products />
      </Suspense>
    </Container>
  );
};

export default SuspenseProductComponent;

// "use client";

// import React, { Suspense, useEffect, useRef, useState } from "react";

// // import SortSearch from "@/app/components/products/SortSearch";
// import ProductCart from "@/app/components/sharred/ProductCard";
// import { useGetAllCategoriesQuery } from "@/app/redux/features/category/categoryApi";
// import {
//   useGetAllProductsByCategoryQuery,
//   useGetAllProductsQuery,
// } from "@/app/redux/features/product/productApi";
// import { IProduct, TQueryParam } from "@/types";
// import { Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
// import Link from "next/link";
// import Loader from "@/app/components/sharred/Loader";
// import CheckBox from "./CheckBox";
// import Rate from "rc-rate";
// import "rc-rate/assets/index.css";
// import RateComponent from "./Rate";
// import { useGetProductReviewsQuery } from "@/app/redux/features/review/reviewApi";
// import { useGetAllBrandsQuery } from "@/app/redux/features/brand/brandApi";
// import CheckboxComponent from "./CheckboxComponent";
// import Container from "@/app/components/sharred/Container";
// import { useRouter, useSearchParams } from "next/navigation";
// // import { useRouter } from "next/router";

// const Products = () => {
//   // const router = useRouter();
//   // const { search } = router.query;
//   console.log("window", window.location.search);
//   const searchParams = useSearchParams();
//   const value = searchParams.get("search");
//   console.log("value", value);
//   const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
//   const [minPrice, setMinPrice] = useState<string | number>(1);
//   const [maxPrice, setMaxPrice] = useState<string | number>(1);

//   const router = useRouter();

//   const {
//     data: productsData,
//     isLoading: productsDataLoading,
//     isFetching,
//   } = useGetAllProductsQuery(params, {
//     refetchOnMountOrArgChange: true, // Ensure fresh data on params change
//     refetchOnFocus: true, // Refetch when the window regains focus
//   });

//   const [categorySelected, setCategorySelected] = useState("");

//   const [isCheckBoxSelected, setIsCheckBoxSelected] = useState("");

//   const { data: categoryProductData, isLoading: categoryProductDataLoading } =
//     useGetAllProductsByCategoryQuery(params, {
//       skip: !categorySelected,
//     });
//   console.log("categoryProductData", categoryProductData);

//   console.log("products data", productsData);
//   console.log("isFetching", isFetching);

//   const { data: categoriesData, isLoading: categoriesDataLoading } =
//     useGetAllCategoriesQuery(null);
//   // console.log("categoriesData", categoriesData);

//   const [selectedRatingValue, setSelecdRatingValue] = useState(0);

//   const { data: brandData, isLoading: brandLoading } =
//     useGetAllBrandsQuery(null);

//   let queryParams: TQueryParam[] = [];

//   useEffect(() => {
//     if (value) {
//       queryParams.push({ name: "searchTerm", value });
//       setParams(queryParams);
//     }
//   }, [value]);

//   console.log("brandData", brandData);
//   if (
//     categoriesDataLoading ||
//     productsDataLoading ||
//     categoryProductDataLoading ||
//     brandLoading
//   ) {
//     return <Loader />;
//   }

//   const handlecategoryChange = (e: any) => {
//     const value = e.target.value;
//     if (value) {
//       // queryParams.push({name})
//       // queryParams.push({name})
//       setCategorySelected(value);
//     }
//     // console.log("value from category", value);
//   };

//   // const handleSearchInput = (value: string) => {
//   //   console.log(value);

//   //   // Clear any existing "searchTerms" in queryParams
//   //   const updatedQueryParams = queryParams.filter(
//   //     (param) => param.name !== "searchTerms"
//   //   );

//   //   if (value) {
//   //     // Add the new "searchTerms" value
//   //     updatedQueryParams.push({ name: "searchTerms", value });
//   //   }

//   //   setParams(updatedQueryParams); // Update the query parameters
//   //   console.log("Updated Query Params:", updatedQueryParams);
//   // };

//   // Handle search input
//   const handleSearchInput = (value: string) => {
//     const updatedQueryParams =
//       params?.filter((param) => param.name !== "searchTerms") || [];
//     if (value) {
//       updatedQueryParams.push({ name: "searchTerms", value });
//     }
//     setParams(updatedQueryParams); // Update query parameters
//   };
//   const handleSortInput = (value: string) => {
//     // Clear any existing "sortOrder" or "sortBy" in queryParams
//     const updatedQueryParams = queryParams.filter(
//       (param) => param.name !== "sortOrder" && param.name !== "sortBy"
//     );

//     if (value) {
//       // Add the new "sortOrder" and "sortBy" values
//       updatedQueryParams.push({ name: "sortOrder", value });
//       updatedQueryParams.push({ name: "sortBy", value: "newPrice" });
//     }

//     setParams(updatedQueryParams); // Update the query parameters
//     // console.log("Updated Query Params:", updatedQueryParams);
//   };

//   const handlePriceFunctionality = () => {
//     const updatedQueryParams = queryParams.filter(
//       (param) => param.name !== "priceMax" && param.name !== "priceMin"
//     );
//     if (maxPrice) {
//       updatedQueryParams.push({ name: "priceMax", value: maxPrice });
//     }
//     if (minPrice) {
//       updatedQueryParams.push({ name: "priceMin", value: minPrice });
//     }
//     setParams(updatedQueryParams);
//   };

//   const handleRatingFunctionality = (ratingValue: any) => {
//     console.log("value", ratingValue);
//     if (ratingValue) {
//       setSelecdRatingValue(ratingValue);
//       const updatedQueryParams = queryParams.filter(
//         (param) => param.name !== "rating"
//       );
//       updatedQueryParams.push({ name: "rating", value: ratingValue });
//       setParams(updatedQueryParams);
//     }
//   };

//   const handleCheckFunctionality = (ratingValue: any) => {
//     console.log("value", ratingValue);
//     if (ratingValue) {
//       setSelecdRatingValue(ratingValue);
//       const updatedQueryParams = queryParams.filter(
//         (param) => param.name !== "rating"
//       );
//       updatedQueryParams.push({ name: "rating", value: ratingValue });
//       setParams(updatedQueryParams);
//     }
//   };

//   const handleChecked = (id: string) => {
//     console.log("cheked", id);
//     setIsCheckBoxSelected(id);
//   };

//   // console.log("queryParams", queryParams);
//   return (
//     <Suspense fallback={<div>LOading</div>}>
//       <div className="w-full mt-20 ">
//         <div className="">
//           {/* Sort Options */}
//           <div className="flex justify-end gap-2">
//             <span className="text-sm font-medium">Sort By:</span>
//             <Select
//               onChange={(e) => handleSortInput(e.target.value)}
//               className="w-48"
//               // label="Select a Price"
//             >
//               <SelectItem key="asc">Price Low to High</SelectItem>
//               <SelectItem key="desc">Price High to Low</SelectItem>
//             </Select>
//           </div>
//         </div>
//         <div className="flex ">
//           <div className="hidden lg:block lg:w-3/12">
//             <section>
//               <div className="py-4 border-y-1">
//                 <p className="text-[14px] text-[#121212] mb-2">Category</p>
//                 <div>
//                   {/* <Checkbox defaultSelected size="sm">
//                     <span className="ml-3 text-[13px] text-[#757575]">
//                       Option
//                     </span>
//                   </Checkbox> */}
//                   {categoriesData?.data?.map((brand: any) => (
//                     <CheckboxComponent
//                       // isSelected={isCheckBoxSelected}
//                       key={brand.id}
//                       title={brand.name}
//                       id={brand.id}
//                       handleChecked={handleChecked}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </section>
//             <section>
//               <div className="py-4 border-y-1">
//                 <p className="text-[14px] text-[#121212] mb-2">Brand</p>
//                 <div>
//                   {/* <Checkbox defaultSelected size="sm">
//                     <span className="ml-3 text-[13px] text-[#757575]">
//                       Option
//                     </span>
//                   </Checkbox> */}
//                   {brandData?.data?.map((brand: any) => (
//                     <CheckboxComponent
//                       // isSelected={isCheckBoxSelected}
//                       key={brand.id}
//                       title={brand.name}
//                       id={brand.id}
//                       handleChecked={handleChecked}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </section>

//             {/* price section */}
//             <section>
//               <div className="my-3 ">
//                 <p className="text-[14px] text-[#121212]">Price</p>
//                 <div className="flex items-center gap-1">
//                   <div>
//                     <Input
//                       onChange={(e) => setMinPrice(e.target.value)}
//                       type="number"
//                       placeholder="Min"
//                       className="bg-transparent"
//                     />
//                   </div>
//                   <div>
//                     <span>-</span>
//                   </div>
//                   <div>
//                     <Input
//                       onChange={(e) => setMaxPrice(e.target.value)}
//                       type="number"
//                       placeholder="Max"
//                       className="border rounded-none bg-transparent"
//                     />
//                   </div>
//                   <div>
//                     <button onClick={handlePriceFunctionality}>Apply</button>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* rating section */}
//             <section>
//               <div className="border-y-1 py-3 mt-2">
//                 <p className="text-[14px] text-[#121212]">Rating</p>
//                 <RateComponent
//                   handleRatingFunctionality={handleRatingFunctionality}
//                   value={5}
//                   hasTitle={false}
//                   ratingValue={selectedRatingValue}
//                 />
//                 <RateComponent
//                   handleRatingFunctionality={handleRatingFunctionality}
//                   ratingValue={selectedRatingValue}
//                   value={4}
//                 />
//                 <RateComponent
//                   ratingValue={selectedRatingValue}
//                   handleRatingFunctionality={handleRatingFunctionality}
//                   value={3}
//                 />
//                 <RateComponent
//                   ratingValue={selectedRatingValue}
//                   handleRatingFunctionality={handleRatingFunctionality}
//                   value={2}
//                 />
//                 <RateComponent
//                   ratingValue={selectedRatingValue}
//                   handleRatingFunctionality={handleRatingFunctionality}
//                   value={1}
//                 />
//               </div>
//             </section>
//           </div>
//           {productsData?.data?.data?.length > 0 ? (
//             <div className="grid md:grid-cols-6 grid-cols-2 sm:grid-cols-3 gap-4 lg:w-9/12">
//               {productsData?.data?.data?.map((item: IProduct) => (
//                 <Link href={`/products/${item.id}`} key={item.id}>
//                   <ProductCart product={item} />
//                 </Link>
//               ))}
//             </div>
//           ) : (
//             <p className="text-2xl mt-10">No product found..</p>
//           )}
//         </div>
//       </div>
//     </Suspense>
//   );
// };

// export default Products;

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

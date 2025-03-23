// // import React from "react";
// // import Link from "next/link";

// // import Title from "../Title";

// // import CategoryCard from "./CategoryCard";

// // import { ICategory } from "@/types";
// // import { useGetAllCategoriesQuery } from "@/app/redux/features/category/categoryApi";

// // const Categories = () => {
// //   const { data: categoriesData, isLoading: categoryLoading } =
// //     useGetAllCategoriesQuery(null);

// //   console.log("category", categoriesData);

// //   return (
// //     <div className="w-full md:mt-10 mt-5">
// //       <div>
// //         <section className="flex justify-between">
// //           <Title title="Categories" />
// //           <div className="md:hidden block">
// //             {/* <Button /> */}
// //             <Link className="block md:hidden" href="products">
// //               <button className="font-medium  ">
// //                 <span> Shop More </span>
// //                 <span>{`>`}</span>
// //               </button>
// //             </Link>
// //           </div>
// //         </section>
// //         <div className="hidden md:block">
// //           <section className="grid grid-cols-8 gap-2">
// //             {categoriesData?.data?.map((category: ICategory) => (
// //               <Link key={category.id} href="/products">
// //                 <CategoryCard category={category} />
// //               </Link>
// //             ))}
// //           </section>
// //         </div>
// //         <div className="block md:hidden">
// //           <section className="grid grid-cols-2 sm:grid-cols-3  gap-3">
// //             {categoriesData?.data?.slice(0, 3).map((category: ICategory) => (
// //               <Link key={category.id} href="/products">
// //                 <CategoryCard category={category} />
// //               </Link>
// //             ))}
// //           </section>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Categories;

// import React from "react";
// import Link from "next/link";

// import Title from "../Title";
// import CategoryCard from "./CategoryCard";

// import { ICategory } from "@/types";
// import { useGetAllCategoriesQuery } from "@/app/redux/features/category/categoryApi";

// const Categories = () => {
//   const { data: categoriesData, isLoading: categoryLoading } =
//     useGetAllCategoriesQuery(null);

//   if (categoryLoading) {
//     return (
//       <div className="w-full flex justify-center items-center mt-10">
//         {/* You can replace this with your Loader component */}
//         <span>Loading...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full md:mt-10 mt-5">
//       <section>
//         <div className="flex justify-between items-center mb-4">
//           <Title title="Categories" />
//           <div className="md:hidden block">
//             <Link href="/products">
//               <button className="font-medium text-primary flex items-center">
//                 <span> Shop More </span>
//                 <span className="ml-2 text-lg">{`>`}</span>
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* Desktop View */}
//         <div className="hidden md:block">
//           <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
//             {categoriesData?.data?.map((category: ICategory) => (
//               <Link
//                 key={category.id}
//                 href={`/products?category=${category.id}`}
//               >
//                 <CategoryCard category={category} />
//               </Link>
//             ))}
//           </section>
//         </div>

//         {/* Mobile View */}
//         <div className="block md:hidden">
//           <section className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//             {categoriesData?.data?.slice(0, 3).map((category: ICategory) => (
//               <Link
//                 key={category.id}
//                 href={`/products?category=${category.id}`}
//               >
//                 <CategoryCard category={category} />
//               </Link>
//             ))}
//           </section>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Categories;

import React from "react";
import Link from "next/link";

import Title from "../Title";

import CategoryCard from "./CategoryCard";

import { ICategory } from "@/types";
import { useGetAllCategoriesQuery } from "@/app/redux/features/category/categoryApi";
import Container from "../../sharred/Container";

const Categories = () => {
  const { data: categoriesData, isLoading: categoryLoading } =
    useGetAllCategoriesQuery(null);

  if (categoryLoading) {
    return (
      <div className="w-full flex justify-center items-center mt-10">
        {/* You can replace this with your Loader component */}
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <Container>
      <section className="md:mt-10 mt-3">
        <div className="flex justify-between items-center mb-1  ">
          <Title title="Categories" />
          <div className="md:hidden block text-xs md:text-sm font-light">
            <Link href="/products">
              <button className="  flex items-center space-x-2">
                <span>Shop More</span>
                <span className="">{`>`}</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-1">
            {categoriesData?.data?.map((category: ICategory) => (
              <Link
                key={category.id}
                className="block  rounded-lg border p-3 bg-white border-gray-200 hover:shadow-lg transition-all duration-200 ease-in-out"
                href={`/products?category=${category.id}`}
              >
                <CategoryCard category={category} />
              </Link>
            ))}
          </section>
        </div>

        {/* Mobile View */}
        {/* <div className="block md:hidden">
          <section className="grid grid-cols-3 gap-1">
            {categoriesData?.data?.slice(0, 3).map((category: ICategory) => (
              <Link
                key={category.id}
                className=""
                href={`/products?category=${category.id}`}
              >
                <CategoryCard category={category} />
              </Link>
            ))}
          </section>
        </div> */}
        {/* Mobile View with Horizontal Scrolling */}
        <div className="block md:hidden bg-white">
          <section className="overflow-x-auto">
            <div className="flex gap-3 w-max">
              {categoriesData?.data?.map((category: ICategory) => (
                <Link
                  key={category.id}
                  className="flex-shrink-0 w-40 bg-white p-3 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 ease-in-out"
                  href={`/products?category=${category.id}`}
                >
                  <CategoryCard category={category} />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </Container>
  );
};

export default Categories;

// import { Skeleton } from "@nextui-org/react";
// import React from "react";

// const Loading = () => {
//   return (
//     <div className="space-y-3">
//       {[...Array(5)].map((_, i) => (
//         <div
//           key={i}
//           className="flex justify-between items-center gap-4  rounded-lg"
//         >
//           {/* Product Info */}
//           <div className="flex items-center gap-3 w-[25%]">
//             <Skeleton className="rounded-md w-12 h-12" />
//             <Skeleton className="h-4 w-32 rounded-md" />
//           </div>

//           {/* Review Info */}
//           <div className="flex items-center gap-3 w-[25%]">
//             <Skeleton className="rounded-md w-12 h-12" />
//             <Skeleton className="h-4 w-32 rounded-md" />
//           </div>

//           {/* Rating */}
//           <Skeleton className="h-4 w-12 rounded-md" />

//           {/* Date */}
//           <Skeleton className="h-4 w-20 rounded-md" />

//           {/* Action */}
//           <Skeleton className="h-6 w-6 rounded-full" />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Loading;

import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";

const Loading = () => {
  return (
    <div className="mt-6 px-4">
      {/* <SidebarButton
        title={"Orders"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        role="vendor"
      /> */}
      <Skeleton className="h-4 w-40 rounded" />
      <Table aria-label="Loading table">
        <TableHeader>
          <TableColumn>PRODUCT</TableColumn>
          <TableColumn>USER</TableColumn>
          <TableColumn>RATING</TableColumn>
          <TableColumn>PAYMENT STATUS</TableColumn>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Skeleton className="rounded-full w-12 h-12" />
                  <Skeleton className="h-4 w-40 rounded" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Skeleton className="rounded-full w-12 h-12" />
                  <Skeleton className="h-4 w-40 rounded" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-12 rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20 rounded" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Loading;

// import React, { ReactNode } from "react";

// const Container = ({ children }: { children: ReactNode }) => {
//   return <div className="max-w-[1200px] mx-auto ">{children}</div>;
// };

// export default Container;

// // xl:px-20 md:px-10 sm:px-2 px-4

import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[1300px] mx-auto   md:px-10 sm:px-2 px-4  ">
      {children}
    </div>
  );
};

export default Container;

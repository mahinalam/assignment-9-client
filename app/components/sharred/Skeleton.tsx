import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

const SkeletonComponent = ({ isFlash = true }: { isFlash?: boolean }) => {
  return (
    <Card className=" w-full space-y-5 p-4 " radius="lg">
      <Skeleton className="rounded-lg">
        <div className="sm:h-36 h-28 rounded-lg bg-default-300" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="md:h-4 h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>

        {isFlash && (
          <div>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="md:h-4 h-3 w-4/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg mt-3">
              <div className="md:h-4 h-3 w-2/5 rounded-lg bg-default-300" />
            </Skeleton>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SkeletonComponent;

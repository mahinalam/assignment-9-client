import React from "react";

const AminitiesCard = ({ icon, title }: { icon: any; title: string }) => {
  return (
    <div className="flex items-center  text-[#475569] gap-3 lg:mb-1 mb-2">
      {icon}
      <p className="text-[13px]">{title}</p>
    </div>
  );
};

export default AminitiesCard;

import React from "react";

interface IProps {
  icon: any;
  pathname: string;
  address: string;
  title: string;
  handleNavigateForSmallDevice: any;
}

const NavComponent = ({
  title,
  icon: Icon,
  pathname,
  address,
  handleNavigateForSmallDevice,
}: IProps) => {
  return (
    <div
      className={`flex items-center gap-2  ${pathname === address ? "text-primary" : ""}`}
      onClick={() => handleNavigateForSmallDevice(address)}
    >
      <span>
        <Icon size={18} />
      </span>
      <p className={`py-2 text-medium`}>{title}</p>
    </div>
  );
};

export default NavComponent;

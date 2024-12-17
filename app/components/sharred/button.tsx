import React from "react";

const Button = () => {
  return (
    <div>
      <button className="font-medium block md:hidden ">
        <span> Shop More </span>
        <span>{`>`}</span>
      </button>
    </div>
  );
};

export default Button;

"use client";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import Container from "../sharred/Container";

const NewsLetter = () => {
  return (
    <Container>
      <div className="bg-primary p-6 md:p-10 rounded-xl mt-5 md:mt-10 shadow-lg text-white w-full px-3 sm:px-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Icon Section */}
          <div className="flex justify-center md:justify-start">
            <svg
              className="w-16 h-16 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Text Section */}
          <div className="text-center md:text-left flex-1">
            <h2 className="text-lg md:text-2xl font-bold">
              Subscribe to get 20% off your first order!
            </h2>
            {/* <p className="md:text-base text-sm mt-2">
              Stay updated with our latest shop news and exclusive offers.
            </p> */}
          </div>

          {/* Input Section */}
          <div className="flex flex-col md:flex-row w-full md:w-auto items-center gap-4">
            <Input
              className="w-full md:w-80 text-black"
              placeholder="Enter your email"
              radius="none"
              size="md"
              type="email"
            />
            <Button
              className="bg-black hover:bg-gray-800 text-white px-6"
              radius="none"
              size="md"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NewsLetter;

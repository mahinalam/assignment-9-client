"use client";

import GTForm from "@/app/components/form/GTForm";
import GTInput from "@/app/components/form/GTInput";
import GTTextArea from "@/app/components/form/GTTestArea";
import Container from "@/app/components/sharred/Container";
import { Button } from "@nextui-org/button";
import { Collapse, Divider } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles

const { Panel } = Collapse;
const ContactUs = () => {
  const handleSendMessage = (data) => {
    console.log("form data", data);
  };
  return (
    <Container>
      <div className="mt-[62px] sm:mt-[96px] lg:mt-44 bg-white p-8">
        <div className="text-center mb-1 border-b-[1px] border-b-[#E5E7EB] lg:pb-8 pb-5">
          <h1 className="lg:text-5xl text-2xl mb-2 font-bold">Contact Us</h1>
          <p className="text-[#475569] lg:text-base text-sm lg:mt-4 mt-2">
            We’re here for you. Whether you have a question about our services,
            feedback you'd like to offer, ab— we’d love to hear from you. Our
            team is committed to responding promptly and making sure your voice
            is heard.
          </p>
        </div>

        <section className="grid lg:grid-cols-2 lg:gap-16 lg:pt-4 pt-4">
          {/* store section */}
          <div className="">
            <p className="text-xl  font-bold mb-0 ">Our Stores</p>
            <p className="text-[#475569] text-sm mt-2">
              Your ultimate destination for quality products and exceptional
              service. Whether you're shopping for essentials or treating
              yourself to something special, we've got you covered. Explore our
              carefully curated collection and enjoy a seamless shopping
              experience from start to finish.
            </p>
            <div className="flex gap-4 mt-6">
              {/* icon */}
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </div>
              <div className="">
                <p className="mb-0 font-bold text-[18px] ">Dhaka</p>
                <p className="mb-0 text-sm font-medium mt-1">
                  Alam Market, 2nd Floor, Dhaka
                </p>
                <p className="text-sm font-medium mb-0 mt-3">+88012345678</p>
                <p className="font-bold lg:text-sm mb-0 mt-1">info@gmail.com</p>
              </div>
            </div>
          </div>
          {/* form section */}
          <div className="lg:mt-0 mt-10">
            <p className="text-[#475569] text-sm pb-2 lg:pb-3">
              Have a question, suggestion, or just want to say hello? Fill out
              the form below and we’ll get back to you as soon as possible.
            </p>
            <GTForm onSubmit={handleSendMessage}>
              <div className="space-y-3">
                <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-3">
                  <GTInput
                    required
                    label="Your email *"
                    name="name"
                    type="text"
                  />
                  <GTInput
                    required
                    label="Your name *"
                    name="email"
                    type="email"
                  />
                </div>
                <GTInput required label="Subject *" name="name" type="text" />
                <GTTextArea
                  rows={5}
                  required
                  label="Your message "
                  name="review"
                />
              </div>

              <Button
                className="my-4 rounded-md bg-primary  font-semibold text-white"
                //   isLoading={createProductLoading}
                size="md"
                type="submit"
              >
                Send message
                {/* {createProductLoadingName} */}
              </Button>
            </GTForm>
          </div>
        </section>
      </div>
    </Container>
  );
};

export default ContactUs;

"use client";

import Container from "@/app/components/sharred/Container";
import { Collapse, Divider } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles

const { Panel } = Collapse;
const ContactUs = () => {
  return (
    <Container>
      <div className="bg-white mt-[44px]">
        {/* Contact Header */}
        <div className="text-center pt-12">
          <h1 className="md:text-xl text-lg font-semibold">
            Contact our friendly team
          </h1>
          <p className="mt-4 md:text-medium text-base text-gray-500">
            Let us know how we can help.
          </p>
        </div>
        <Divider />
        {/* Contact Options */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg">
            <svg
              className="size-6 my-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="md:text-xl text-lg font-semibold mt-4 text-blue-900">
              Chat to sales
            </h2>
            <p className="text-center mt-2 text-gray-500">
              Speak to our friendly team.
            </p>
            <a
              className="mt-2 text-blue underline text-btn-primary"
              href="mailto:sales@yourdomain.com"
            >
              sales@yourdomain.com
            </a>
          </div>

          <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg">
            <svg
              className="size-6 my-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="md:text-xl text-lg font-semibold mt-4 text-blue-900">
              Chat to support
            </h2>
            <p className="text-center mt-2 text-gray-500">
              We’re here to help.
            </p>
            <a
              className="mt-2 text-btn-primary underline"
              href="mailto:support@yourdomain.com"
            >
              support@yourdomain.com
            </a>
          </div>

          <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg">
            <svg
              className="size-6 my-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <h2 className="md:text-xl text-lg font-semibold mt-4 text-blue-900">
              Visit us
            </h2>
            <p className="text-center mt-2 text-gray-500">
              Visit our office HQ.
            </p>
            <a
              className="mt-2 text-btn-primary underline"
              href="https://goo.gl/maps/yourlocation"
              rel="noopener noreferrer"
              target="_blank"
            >
              View on Google Maps
            </a>
          </div>

          <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg">
            <svg
              className="size-6 my-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <h2 className="md:text-xl text-lg font-semibold mt-4 text-blue-900">
              Call us
            </h2>
            <p className="text-center mt-2 text-gray-500">
              Mon-Fri from 8am to 5pm.
            </p>
            <a
              className="mt-2 text-btn-primary underline "
              href="tel:+15550000000"
            >
              +1 (555) 000-0000
            </a>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-16 px-4">
          <h2 className="md:text-xl text-lg font-semibold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <Collapse
            accordion
            className=" rounded-lg shadow-lg border-0 "
            style={{ background: "none" }}
          >
            <Panel
              key="1"
              className="text-base font-semibold p-2"
              header="Do I need an account to place an order?"
            >
              <p className="text-base text-gray-600 font-medium">
                Yes, you need to create an account to place an order, track your
                purchases, and access other benefits.
              </p>
            </Panel>
            <Panel
              key="2"
              className="text-base font-semibold p-2"
              header="What types of products do you sell"
            >
              <p className="text-base text-gray-600 font-medium">
                We offer a wide range of products, including categories like
                electronics, clothing, outdoor gear, etc.
              </p>
            </Panel>
            <Panel
              key="3"
              className="text-base font-semibold p-2"
              header="How do I place an order?"
            >
              <p className="text-base text-gray-600 font-medium">
                Browse our website, add items to your cart, and proceed to
                checkout. Follow the prompts to complete your order.
              </p>
            </Panel>
            <Panel
              key="4"
              className="text-base font-semibold p-2"
              header="What are your customer support hours?"
            >
              <p className="text-base text-gray-600 font-medium">
                Our support team is available from 09:00AM to 07:00PM, Saturday
                to Wednesday.
              </p>
            </Panel>
            <Panel
              key="5"
              className="text-base font-semibold p-2"
              header="Where can I leave feedback about my shopping experience? "
            >
              <p className="text-base text-gray-600 font-medium">
                We welcome your feedback! Please leave your comments on our
                Feedback Page or email us directly.
              </p>
            </Panel>
          </Collapse>
        </div>
        <section>
          <h2 className="md:text-xl my-10 text-lg font-semibold text-center ">
            Find Our Location
          </h2>
          <div className="md:w-3/4 w-full mx-auto h-64 bg-gray-300 rounded-xl overflow-hidden shadow-lg">
            <iframe
              allowFullScreen
              height="100%"
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509371!2d144.953736315678!3d-37.81627944202169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0727b4c7f2eb30b!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1632232923456!5m2!1sen!2sau"
              title="find"
              width="100%"
            />
          </div>
        </section>
      </div>
    </Container>
  );
};

export default ContactUs;

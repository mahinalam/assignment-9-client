import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F4F4F6] text-sm text-[#0f136d] py-12 md:mt-[50px] sm:mt-[25px] mt-[20px] w-full">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
        {/* Column 1: About Us */}
        <div>
          <h2 className=" text-lg mb-4 text-[#0f136d]">About Us</h2>
          <p className="text-[#0f136d] leading-relaxed">
            We are dedicated to providing top-notch services, ensuring our
            customers enjoy the best experience at the most competitive prices.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h2 className=" text-lg mb-4 text-[#0f136d]">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="text-[#0f136d] hover:text-white transition-colors duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/products"
                className="text-[#0f136d] hover:text-white transition-colors duration-300"
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-[#0f136d] hover:text-white transition-colors duration-300"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-[#0f136d] hover:text-white transition-colors duration-300"
              >
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div>
          <h2 className=" text-lg mb-4 text-[#0f136d]">Services</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="text-[#0f136d] hover:text-white transition-colors duration-300"
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-[#0f136d] hover:text-white transition-colors duration-300"
              >
                Customer Support
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-[#0f136d] hover:text-white transition-colors duration-300"
              >
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h2 className=" text-lg mb-4 text-[#0f136d]">Contact Info</h2>
          <p className="text-[#0f136d] leading-relaxed">
            123 Main Street, City, Country
          </p>
          <p className="text-[#0f136d] mt-2">Phone: +123 456 789</p>
          <p className="text-[#0f136d] mt-2">Email: info@example.com</p>
        </div>
      </div>

      <div className="container mx-auto text-center text-[#0f136d] mt-4 ">
        &copy; 2025 Electromert All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

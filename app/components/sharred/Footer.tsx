import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 md:mt-[50px] sm:mt-[25px] mt-[20px]">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
        {/* Column 1: About Us */}
        <div>
          <h2 className="font-bold text-xl mb-4 text-blue-400">About Us</h2>
          <p className="text-gray-300 leading-relaxed">
            We are dedicated to providing top-notch services, ensuring our
            customers enjoy the best experience at the most competitive prices.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h2 className="font-bold text-xl mb-4 text-blue-400">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Rooms
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div>
          <h2 className="font-bold text-xl mb-4 text-blue-400">Services</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Booking
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Room Service
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Customer Support
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h2 className="font-bold text-xl mb-4 text-blue-400">Contact Info</h2>
          <p className="text-gray-300 leading-relaxed">
            123 Main Street, City, Country
          </p>
          <p className="text-gray-300 mt-2">Phone: +123 456 789</p>
          <p className="text-gray-300 mt-2">Email: info@example.com</p>
        </div>
      </div>

      <div className="container mx-auto text-center text-gray-500 mt-4 ">
        &copy; 2024 BookNest All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

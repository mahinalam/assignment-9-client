import React from "react";

import Container from "./Container";

const Footer: React.FC = () => {
  return (
    <footer className=" text-sm text-black py-12  w-full">
      <Container>
        <div className="px-3 sm:px-0">
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:px-6">
            {/* Column 1: About Us */}
            <div>
              <h2 className=" text-lg mb-4 text-black">About Us</h2>
              <p className="text-black leading-relaxed">
                We are dedicated to providing top-notch services, ensuring our
                customers enjoy the best experience at the most competitive
                prices.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h2 className=" text-lg mb-4 text-black">Quick Links</h2>
              <ul className="space-y-2">
                <li>
                  <a
                    className="text-black hover:text-primary transition-colors duration-300"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="text-black hover:text-primary transition-colors duration-300"
                    href="/products"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    className="text-black hover:text-primary transition-colors duration-300"
                    href="/store"
                  >
                    Shops
                  </a>
                </li>
                <li>
                  <a
                    className="text-black hover:text-primary transition-colors duration-300"
                    href="/contact"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Services */}
            <div>
              <h2 className=" text-lg mb-4 text-black">Authentication</h2>
              <ul className="space-y-2">
                <li>
                  <a
                    className="text-black hover:text-primary transition-colors duration-300"
                    href="/login"
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    className="text-black hover:text-primary transition-colors duration-300"
                    href="/signup"
                  >
                    Signup
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div>
              <h2 className=" text-lg mb-4 text-black">Contact Info</h2>
              <p className="text-black leading-relaxed">
                Alam Market, 2nd Floor, Dhaka
              </p>
              <p className="text-black mt-2">Phone: +88012345678</p>
              <p className="text-black mt-2">Email: info@gmail.com</p>
            </div>
          </div>

          <div className="container mx-auto text-center text-black mt-4 ">
            &copy; 2025 Electromert All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

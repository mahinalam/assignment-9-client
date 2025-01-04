# E-Commerce Application

## Project Overview

The E-Commerce Application is a scalable, high-performance platform for online shopping. It supports users, vendors, and administrators with distinct functionalities and a seamless shopping experience.

**Repository Links:**

- [Backend](https://github.com/AbuBokorprog/bazaar-bridge-backend)
- [Frontend](https://github.com/AbuBokorprog/bazaar-bridge-frontend/)
- [Dashboard](https://github.com/AbuBokorprog/bazaar-bridge-dashboard/)

**Live Links:**

- [Backend](https://bazaar-bridge.vercel.app/)
- [Frontend](https://bazaar-bridge-front.vercel.app/)
- [Dashboard](https://bazaar-bridge-front.vercel.app/)

---

## Technology Stack & Packages

## Dependencies

Below are the key dependencies used in this project:

### Core Libraries:

- `react`: ^18.3.1
- `next`: ^14.2.4
- `react-dom`: ^18.3.1

### State Management:

- `@reduxjs/toolkit`: ^2.4.0
- `react-redux`: ^9.1.2
- `redux-persist`: ^6.0.0

### Form Handling and Validation:

- `react-hook-form`: ^7.53.2
- `@hookform/resolvers`: ^3.9.1
- `zod`: ^3.23.8

### UI Libraries:

- `@nextui-org/theme`: ^2.2.11
- `@nextui-org/react`: ^2.6.4
- `@nextui-org/button`: ^2.0.38

### Styling:

- `tailwindcss`: ^3.4.10
- `tailwind-variants`: ^0.1.20

### Utilities:

- `moment`: ^2.30.1
- `jwt-decode`: ^4.0.0
- `sonner`: ^1.7.1

### Dev Dependencies:

- `@types/node`: ^20.5.7
- `typescript`: ^5.6.3
- `eslint`: ^8.57.0
- `tailwindcss`: ^3.4.3
- `autoprefixer`: ^10.4.19
- `typescript-eslint/parser`: ^8.11.0

---

## Features & Functionalities

### Admin Role:

- Manage users (suspend/delete accounts)
- Blacklist vendor shops
- Dynamically manage product categories
- Monitor transactions and platform activities

### Vendor Role:

- Create and manage their shop
- Add/edit/delete products with attributes like name, price, category, inventory count, images, and discounts
- View and respond to customer reviews
- Manage order history

### Customer Role:

- Browse and filter products (e.g., by price, category)
- Add products to the cart and apply coupon codes
- Compare up to three products
- View purchase history
- Leave reviews and ratings for purchased products

### Home Page

- Display all available products from various vendors.
- Prioritize products from followed shops for logged-in users.
- Filtering and searching functionalities (price range, category, keyword, etc.).
- Scroll-to-top button for better navigation.
- Display a list of categories. When a category is clicked, redirect the user to the "All Products" page and automatically filter the products to show only those belonging to the selected category.
- Show flash sale products and add a button at the bottom. After clicking the button, redirect to the flash sale page and display all flash sale products.

### Product Details Page

- Product name, price, category, images, and detailed descriptions.
- Display the shop name with a clickable link redirecting to the shop page.
- Related products section showing products in the same category.
- Customer reviews and ratings for the product.

### Shop Page

- Vendor’s shop name and details.
- List of products belonging to the vendor only.
- Option for customers to add products directly to the cart from the shop page.
- Option for users to follow or unfollow the shop.
- Follower count.

### Cart Functionality

- Products can only be added from one vendor at a time.
- If attempting to add products from another vendor, show a warning with options:
  - Replace the cart with the new product(s).
  - Retain the current cart and cancel the addition.
- Display product details, pricing, and total cost in the cart.

### Checkout

- Apply coupon codes for discounts during checkout.
- Integrate Aamarpay or Stripe for payment processing.

### Order History

- **For Vendors**: View a detailed list of all orders placed for their shop.
- **For Customers**: View their purchase history with product and order details.

### Authentication

- **Signup Page**: Option to register as a user or vendor.
  - If a vendor is selected, redirect them to the dashboard to add their shop name and some initial products.
- **Login Page**: Secure login using JWT.
- **Password Management**:
  - Change password after logging in.
  - Reset password functionality via email.


### Responsive Design

- Mobile and desktop-friendly interface for all users.

---

# Frontend Setup Instructions

## Prerequisites:

- Node.js installed
- Backend server running
- Environment variables configured (e.g., `.env` file)

---

## Installation:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## Project Scripts

### Development:

```bash
npm run dev
```

Starts the development server on `http://localhost:5173`.

### Build:

```bash
npm run build
```

Creates a production-ready build of the application.

### Lint:

```bash
npm run lint
```

Runs ESLint to analyze and fix code quality issues.

---

## Additional Notes

- Ensure that the backend API is running and accessible before starting the frontend server.
- Refer to the backend README for more details on API setup and endpoints.

---

## Known Issues/Bugs

- User cannot see overall product details throw modal by click view icon.
- Admin or vendor cannot reply user review.
- In dashboard have some static data.
- Admin or Vendor cannot edit or update overall order details, They can just order status change and payment status change.

---

## Key Highlights

- JWT-based authentication for secure access.
- Paginated APIs for scalability.
- Responsive design for seamless mobile and desktop experiences.
- Advanced filtering and search functionalities.
- Integrated third-party services for payments and image uploads.

---

## Authentication and Authorization

#### Admin

- admin@gmail.com
- pass: 123456

#### Vendor:

- vendor@gmail.com
- pass: 123456


#### User(Customer):

- user@gmail.com
- pass: 123456


## Contribution

Contributions are welcome. Feel free to open issues or submit pull requests for any improvements or bug fixes.

---

## License

This project is licensed under the [MIT License](LICENSE).

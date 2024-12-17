"use client";

import { useParams } from "next/navigation";

export default function DashboardPage() {
  const { slug } = useParams(); // Get the dynamic route parameter

  const renderContent = () => {
    switch (slug) {
      case "AddShop":
        return <h1>Welcome to My Shop</h1>;
      case "users":
        return <h1>Manage Users</h1>;
      case "orders":
        return <h1>Order History</h1>;
      default:
        return <h1>Dashboard Home</h1>;
    }
  };

  return <>{renderContent()}</>;
}

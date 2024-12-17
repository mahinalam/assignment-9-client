import Link from "next/link";

export const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-6">
      <Link href="/">
        {" "}
        <h2 className="text-lg font-bold mb-6">Green Haven</h2>
      </Link>
      <Link href="/dashboard/AddShop">
        <button className="block w-full text-left p-2 rounded-md mb-2 bg-gray-700">
          My Shop
        </button>
      </Link>
      <Link href="/dashboard/AddProducts">
        <button className="block w-full text-left p-2 rounded-md mb-2 bg-gray-700">
          Add Products
        </button>
      </Link>
      <Link href="/dashboard/AllProducts">
        <button className="block w-full text-left p-2 rounded-md mb-2 bg-gray-700">
          All Products
        </button>
      </Link>
      <Link href="/dashboard/Reviews">
        <button className="block w-full text-left p-2 rounded-md mb-2 bg-gray-700">
          Reviews & Ratings
        </button>
      </Link>
      <Link
        href="/dashboard/OrderHistory"
        // className={`block w-full text-left p-2 rounded-md mb-2 ${
        //   activeSection === "paymentsHistory" ? "bg-blue-600" : "bg-gray-700"
        // }`}
        // onClick={() => setActiveSection("paymentsHistory")}
      >
        Order History
      </Link>
    </div>
  );
};

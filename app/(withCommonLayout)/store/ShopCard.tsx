import Link from "next/link";

const ShopCard = ({ shop }: any) => {
  const { name, logo, description, product, followingShop, id } = shop;

  return (
    <div className="border p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-sm mx-auto">
      {/* Shop Logo */}
      <div className="flex justify-center">
        <div className=" rounded-full shadow-sm">
          <Link href={`/store/${id}`}>
            <img
              alt={name}
              className="size-36 object-contain rounded-full"
              src={logo}
            />
          </Link>
        </div>
      </div>

      {/* Shop Info */}
      <div className="mt-4 text-center space-y-1">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        <p className="text-sm font-semibold !mt-2">{product.length} Products</p>
      </div>
    </div>
    // <></>
  );
};

export default ShopCard;

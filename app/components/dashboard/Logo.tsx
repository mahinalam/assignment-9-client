import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <img
        alt="logo"
        className="hidden md:block"
        height="100"
        src=""
        width="100"
      />
    </Link>
  );
};

export default Logo;

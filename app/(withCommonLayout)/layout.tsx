import Footer from "../components/sharred/Footer";
import { Navbar } from "../components/sharred/Navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen w-[90%] mx-auto">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

import Container from "../components/sharred/Container";
import Footer from "../components/sharred/Footer";
import Navbar from "../components/sharred/navbar/Navbar";
// import { Navbar } from "../components/sharred/Navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#f5f5f5]">
      <Navbar />
      {/* <Container> */}
      <main>{children}</main>
      {/* </Container> */}
      <Footer />
    </div>
  );
}

import type { MetaFunction } from "@remix-run/node";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const meta: MetaFunction = () => {
  return [
    { title: "Katio" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-centern overflow-hidden">
      <div>
        <Navbar />
        <h1>Aplicacion</h1>
        <div className="flex">
          <button className="btn btn-primary"><a href="/Books">Books</a></button>
          <button className="btn btn-primary"><a href="/Autors">Autors</a></button>
        </div>
        <Footer />
      </div>
    </div>
  );
}
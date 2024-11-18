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
    <div className="flex h-screen items-center justify-center">
      <div>
      <Navbar/>
      <h1>Aplicacion</h1>
      <Footer/>
      </div>
    </div>
  );
}
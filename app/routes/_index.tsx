import { Link } from "react-router-dom";
import { MetaFunction } from "@remix-run/react";

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
    <div className="h-screen min-h-screen">
      <div>
        <Navbar />
        <Link className="btn btn-ghost" to="/signUp">signUp</Link>
        <Link className="btn btn-ghost" to="/signUp">logIn</Link>
        <h1>Aplicacion</h1>
        <div className="flex h-screen items-center justify-centern overflow-hidden">
          <div className="flex">
            <button className="btn btn-primary"><a href="/Books">Books</a></button>
            <button className="btn btn-primary"><a href="/Autors">Autors</a></button>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
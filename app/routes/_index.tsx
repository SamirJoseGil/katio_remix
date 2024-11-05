import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="h-screen min-h-screen">
      <div>
      <Navbar/>
      <Link className="btn btn-ghost" to="/signUp">signUp</Link>
      <Link className="btn btn-ghost" to="/signUp">logIn</Link>
      <h1>Aplicacion</h1>
      <Footer/>
      </div>
    </div>
  );
}
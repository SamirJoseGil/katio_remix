import { Link, Outlet } from "@remix-run/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import 'animate.css';

// export function loader() {

// }

export default function Index() {
  return (
    <div className="flex flex-col pt-20">
      <Navbar />
      <div className="">
        <div className="relative flex-1 h-screen">
          <div className="h-screen absolute inset-0 bg-cover bg-[url('/public/img/MainBackground.jpg')]">
            <div className="absolute inset-0 backdrop-blur-sm bg-black bg-opacity-30"></div>
          </div>
          <div className="pt-20 relative z-10 animate__animated animate__fadeIn place-items-center">
            <div className="mt-10 animate__animated animate__fadeInUp text-center">
              <h3 className="text-5xl uppercase font-bold text-white">Biblioteca Virtual Secretos Para Contar</h3>
            </div>
            <div className="my-10 text-justify animate__animated animate__fadeInUp">
              <Link to={"/books"} className="btn btn-outline text-2xl text-white">Ir a la Biblioteca</Link>
            </div>
          </div>
        </div>
        <div className="relative flex-1 min-h-screen bg-white">
          
        </div>
      </div>
      <Footer />
    </div>
  );
}
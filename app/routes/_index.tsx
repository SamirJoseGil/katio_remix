import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import 'animate.css';

export default function Index() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div>
        <div className="relative flex-1 h-screen">
          <div className="h-screen absolute inset-0 bg-cover bg-[url('/public/img/MainBackground.jpg')]">
            <div className="absolute inset-0 backdrop-blur-sm bg-black bg-opacity-30"></div>
          </div>
          <div className="relative z-10 animate__animated animate__fadeIn">
            <div className="grid grid-cols-12 grid-rows-10">
              <div className="col-start-9 col-end-12 row-start-3 row-end-7 text-end">
                <div className="relative p-4 bg-black bg-opacity-5 backdrop-blur-sm rounded-lg animate__animated animate__fadeInUp">
                  <h2 className="text-8xl uppercase font-bold text-transparent bg-clip-text bg-gradient-to-b from-emerald-600 to-emerald-300">Katio</h2>
                  <h3 className="text-4xl uppercase font-bold text-transparent bg-clip-text bg-gradient-to-b from-emerald-300 to-white">Biblioteca Virtual Secretos Para Contar</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
import { Link } from "@remix-run/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import 'animate.css';

export default function Index() {
  return (
    <div className="flex flex-col pt-16">
      <Navbar />
      <div className="">
        <div className="relative flex-1 h-screen">
          <div className="h-screen absolute inset-0 bg-cover bg-[url('/public/img/MainBackground.jpg')]">
            <div className="absolute inset-0 backdrop-blur-sm bg-black bg-opacity-30"></div>
          </div>
          <div className="relative z-10 animate__animated animate__fadeIn">
            <div className="grid grid-cols-12 grid-rows-10">
              <div className="col-start-2 col-end-5 row-start-2 row-end-7 text-start">
                <div className="relative p-4 bg-black bg-opacity-0 backdrop-blur-sm rounded-lg animate__animated animate__fadeInUp">
                  <h2 className="text-8xl uppercase font-bold text-transparent bg-clip-text bg-gradient-to-b from-emerald-700 to-emerald-300">Katio</h2>
                  <h3 className="text-4xl uppercase font-bold text-transparent bg-clip-text bg-gradient-to-b from-emerald-300 to-white">Biblioteca Virtual Secretos Para Contar</h3>
                </div>
                <div className="col-start-5 mx-10 my-10 col-end-6 row-start-3 row-end-7 text-justify animate__animated animate__fadeInUp">
                  <Link to={"/books"} className="btn btn-ghost text-2xl text-emerald-600 bg-black bg-opacity-15 ">Ir a la Biblioteca</Link>
                </div>
              </div>
              <div className="col-start-7 col-end-12 row-start-2 row-end-7 text-justify">
                <div className="relative p-4 bg-black bg-opacity-0 backdrop-blur-sm rounded-lg animate__animated animate__fadeInUp">
                  <h2 className="text-7xl uppercase font-bold text-transparent bg-clip-text bg-gradient-to-b from-emerald-600 to-emerald-300 text-center mb-6">Quienes somos?</h2>
                  <h3 className="text-xl uppercase text-white">La fundación Secretos para Contar ha contado con material narrativo y
                    didáctico en formato de libros físicos que ha distribuido en diferentes
                    lugares con motivo de generar un impacto en las comunidades que
                    apoya. A raíz de la modernización de los medios de distribución de
                    información, la fundación busca crear una plataforma web la cual sirva
                    como biblioteca y sitio de venta.</h3>
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
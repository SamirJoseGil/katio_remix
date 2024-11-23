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
          <div className="h-screen absolute inset-0 bg-cover bg-[url('/public/img/MainBackground.png')]">
            <div className="absolute inset-0 backdrop-blur-m bg-black bg-opacity-30"></div>
          </div>
          <div className="pt-20 relative z-10 animate__animated animate__fadeIn place-items-center">
            {/* <div className="mt-10 animate__animated animate__fadeInUp text-center">
              <h3 className="text-5xl uppercase font-bold text-white">Biblioteca Virtual Secretos Para Contar</h3>
            </div> */}
            <div className="absolute bottom right-10 animate__animated animate__fadeInUp">
              <Link to={"/books"} className="btn btn-outline text-2xl bg-[#002847]">Ir a la Biblioteca</Link>
            </div>
          </div>


        </div>

        

      </div>

        <div className="relative flex-1 min-h-screen bg-white">
            <div className="mt-20 text-center">
              <h2 className="text-4xl font-bold text-[#002847] mb-4">¿Quién es Katio?</h2>
              <p className="text-xl text-gray-700 px-10">
              Katio tiene su origen debido a la necesidad de la fundación "Secretos para contar" de ofrecer, a todos sus estudiantes de zonas rurales, una plataforma con experiencias interactivas y educativas a través de una biblioteca digital. 
              </p>
              <br />
              <p className="text-xl text-gray-700 px-10">
              El nombre surge de la inspiración en la comunidad indígena Katio, un grupo originario de la región del Urabá en Colombia, cuyo legado cultural y sabiduría ancestral han sido fundamentales para la preservación de tradiciones. Al igual que esta comunidad, la plataforma Katio busca fortalecer la identidad, el conocimiento y la integración de las comunidades más alejadas, proporcionando acceso a recursos educativos de manera inclusiva.
              </p>
            </div>

            <div className="mt-20 text-center">
              <h2 className="text-4xl font-bold text-[#002847] mb-4">Lo más leido:</h2>
              Aqui van los más descargados cuando se implementen las estadisticas.
            </div>
          </div>
      <Footer />
    </div>
  );
}
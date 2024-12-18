import { Link } from "@remix-run/react";
import { useState } from "react";




export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div>
            <div className="navbar bg-custom-beige fixed top-0 left-0 w-full z-30 shadow-md h-26">
                <div className="flex-1">
                    <a href="/"><img className="w-24 mx-4 h-auto" src="../../public/img/secretos-para-contar-naranja.png" alt="" /></a>
                    <Link to="/" className="btn btn-ghost  text-2xl text-white text-custom-dark-blue no-animation">
                        Biblioteca Virtual Secretos Para Contar
                    </Link>
                </div>
                <div className="flex-none">
                    <button
                        className="btn btn-ghost"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-10 w-10 stroke-current text-custom-Orange"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
            {/* Menú lateral */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-custom-beige shadow-lg transform transition-transform duration-300 z-40 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="p-6 text-center">
                    <h2 className="text-white text-3xl font-bold mb-4 mt-10 text-custom-dark-blue ">Menú</h2>

                    <ul className=" text-white menu menu-compact my-2">
                        <li>
                            <Link
                                to="/books"
                                className="hover:bg-neutral-focus btn btn-ghost btn-accen text-custom-dark-blue"
                                onClick={closeMenu}>
                                Libros
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/autors"
                                className="hover:bg-neutral-focus btn btn-ghost text-custom-dark-blue"
                                onClick={closeMenu}>
                                Autores
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/audiobooks"
                                className="hover:bg-neutral-focus btn btn-ghost text-custom-dark-blue"
                                onClick={closeMenu}>
                                Audio libros
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/narrators"
                                className="hover:bg-neutral-focus btn btn-ghost text-custom-dark-blue"
                                onClick={closeMenu}>
                                Narradores
                            </Link>
                        </li>
                        <h2 className="text-white text-2xl font-bold mb-4 mt-5 text-custom-dark-blue ">Administradores</h2>
                        <li>
                            <Link 
                                to="/createAuthor"
                                className="hover:bg-neutral-focus btn btn-ghost text-custom-dark-blue"      
                                onClick={closeMenu}>  
                                Crear Autor              
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/createBook"
                                className="hover:bg-neutral-focus btn btn-ghost text-custom-dark-blue"      
                                onClick={closeMenu}>  
                                Crear Libro            
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/createNarrator"
                                className="hover:bg-neutral-focus btn btn-ghost text-custom-dark-blue"      
                                onClick={closeMenu}>  
                                Crear Narrador               
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/createAudioBook"
                                className="hover:bg-neutral-focus btn btn-ghost text-custom-dark-blue"      
                                onClick={closeMenu}>  
                                Crear AudioLibro              
                            </Link>
                        </li>
                    </ul>
                    <button
                        className="mt-4 btn btn-sm btn-outline text-orange-500"
                        onClick={closeMenu}>
                        Cerrar
                    </button>
                </div>
            </div>


            {/* Fondo oscuro al abrir el menú */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={closeMenu}
                ></div>
            )}
        </div>
    )
}
import { useState } from "react";
import { Link } from "@remix-run/react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div className="navbar bg-base-100 w-screen top-0 bg-violet-100 fixed z-50">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl text-zinc-950">
                    Katio
                </Link>
            </div>
            <div className="flex-none">
                <button
                    className="btn btn-square btn-ghost"
                    onClick={() => setIsMenuOpen(true)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-5 w-5 stroke-current text-zinc-950"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>
            </div>

            {/* Off-canvas menu */}
            <div
                className={`fixed top-0 right-0 h-screen w-64 bg-neutral text-neutral-content shadow-lg transform transition-transform duration-300 z-50 ${
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Menú</h2>
                    <ul className="menu menu-compact">
                        <li>
                            <Link
                                to="/books"
                                className="hover:bg-neutral-focus btn-accen"
                                onClick={closeMenu}
                            >
                                Libros
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/autors"
                                className="hover:bg-neutral-focus"
                                onClick={closeMenu}
                            >
                                Autores
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/audiobooks"
                                className="hover:bg-neutral-focus"
                                onClick={closeMenu}
                            >
                                Audio libros
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/narrators"
                                className="hover:bg-neutral-focus"
                                onClick={closeMenu}
                            >
                                Narradores
                            </Link>
                        </li>
                    </ul>
                    <button
                        className="mt-4 btn btn-sm btn-outline text-orange-400"
                        onClick={closeMenu}
                    >
                        Cerrar
                    </button>
                </div>
            </div>

            {/* Background overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={closeMenu}
                ></div>
            )}
        </div>
    );
}

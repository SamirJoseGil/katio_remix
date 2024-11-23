import { json, redirect } from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import { useState, useEffect } from "react";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import NotFoundModal from "~/components/NotFoundModal";
import { search } from "~/services/narratorService";
import { Narrator } from "~/services/interfaces";

export default function CreateNarrator() {
    const [searchResults, setSearchResults] = useState<Narrator[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = async () => {
        setSearchResults([]);
        const response = await search(searchTerm);
        const audioBook = response.responseElements;
        if (audioBook.length === 0) {
            setIsModalOpen(true);
        } else {
            setSearchResults(audioBook);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="items-center justify-center bg-slate-100 pt-16">
            <Navbar />
            <div className="my-10 bg-slate-100">
                <h1 className="text-center text-2xl text-slate-700 font-bold my-5">Crear un Narrador</h1>
                <div className="navbar border-solid rounded-2xl border-2 border-slate-300 mx-auto justify-between container">
                    <div className="mx-20">
                        <a href="/createAudiobook" className="btn btn-ghost text-xl">Crear audiolibros</a>
                        <a href="/createNarrator" className="btn btn-ghost text-xl">Crear Narradores</a>
                        <a href="/createBook" className="btn btn-ghost text-xl">Crear Libros</a>
                        <a href="/createAutor" className="btn btn-ghost text-xl">Crear Autores</a>
                    </div>
                    <div className="flex-none gap-2 mx-10">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Buscar un narrador"
                                className="input input-accent w-full bg-slate-100 border-slate-400 rounded-2xl border-2"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button
                                className="absolute right-0 btn btn-ghost no-animation"
                                onClick={handleSearch}
                            >
                                <div className="indicator">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="max-w-md mx-auto">
                    <div className="rounded-lg shadow-md my-10">
                        <Form method="post" encType="multipart/form-data">
                            <div className="form-control mb-4">
                                <label className="label">Nombre</label>
                                <input type="text" name="name" placeholder="Nombre" className="input input-bordered w-full" required />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">Apellido</label>
                                <input type="text" name="lastName" placeholder="Apellido" className="input input-bordered w-full" required />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">Género</label>
                                <input type="text" name="genre" placeholder="Género" className="input input-bordered w-full" required />
                            </div>
                            <div className="form-control">
                                <button type="submit" className="btn btn-primary w-full">Crear</button>
                            </div>
                        </Form>
                    </div>
                </div>
                {isModalOpen && <NotFoundModal closeModal={closeModal} />}
            </div>
            <Footer />
        </div>
    );
}

export const action = async ({ request }: { request: Request }) => {
    const formData = await request.formData();

    try {
        const response = await fetch("http://localhost:5125/api/Narrator/CreateNarrator", {
            method: "POST",
            body: formData,
        });

        const responseText = await response.text(); // Logs detallados
        console.log("Respuesta del servidor:", responseText);

        if (!response.ok) {
            console.error("Error del servidor:", response.status, responseText);
            return json({ error: `Error al crear el narrador: ${responseText}` }, { status: response.status });
        }

        return redirect("/createNarrator");
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        return json({ error: "Error inesperado al conectar con el servidor" }, { status: 500 });
    }
};


function Modal({ isOpen, onClose, errorMessage }: { isOpen: boolean, onClose: () => void, errorMessage: string | null }) {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <p>{errorMessage}</p>
            </div>
        </div>
    );
}

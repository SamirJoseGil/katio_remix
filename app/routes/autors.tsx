import { useRef, useState } from "react";
import { useLoaderData, Link } from "@remix-run/react";
import { getAllAuthors, search } from "~/services/authorService";
import { Data, Author } from "~/services/interfaces"

import NotFoundModal from "~/components/NotFoundModal";
import NavBar from "~/components/Navbar";
import Footer from "~/components/Footer";

// Loader para obtener la lista de autores
export function loader() {
    return getAllAuthors();
}

export default function Autors() {
    const data = useLoaderData<Data<Author>>();
    const [searchResults, setSearchResults] = useState<Author[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = async () => {
        setSearchResults([]);

        try {
            const response = await search(searchTerm);
            const authors = response.responseElements;
            if (authors.length === 0) {
                setIsModalOpen(true);
            } else {
                setSearchResults(authors);
            }
        } catch {
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="items-center justify-center min-h-screen bg-slate-100 pt-16">
            <NavBar />
            <div className="my-10">
                <div className="navbar border-solid rounded-2xl border-2 border-slate-300 mx-auto justify-between container">
                    <div className="mx-20">
                        <a href="/audiobooks" className="btn btn-ghost text-xl">Audiolibros</a>
                        <a href="/narrators" className="btn btn-ghost text-xl">Narradores</a>
                        <a href="/books" className="btn btn-ghost text-xl">Libros</a>
                        <a href="/autors" className="btn btn-ghost text-xl">Autores</a>
                    </div>
                    <div className="flex-none gap-2 mx-10">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Buscar un autor"
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
                <div className={`${isModalOpen ? "blur-sm overflow-hidden" : ""}`}>
                    <div className="card">
                        <h3 className="card-title text-slate-500 m-4 mx-12">
                            Se encontraron{" "}
                            <strong className="text-slate-700">
                                {searchResults.length > 0 ? searchResults.length : data.totalElements}
                            </strong>{" "}
                            autores
                        </h3>
                        <div className="container mx-11">
                            <div className="grid grid-cols-4 gap-4">
                                {(searchResults.length > 0 ? searchResults : data.responseElements).map((item: Author) => (
                                    <Card
                                        key={item.id}
                                        id={item.id}
                                        name={item.name}
                                        lastName={item.lastName}
                                        country={item.country}
                                        birthDate={item.birthDate}
                                        profilePicture={item.profilePicture}
                                        biography={item.biography}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            {isModalOpen && <NotFoundModal closeModal={closeModal} />}
        </div>
    );
}

function Card({ id, name, lastName, country, birthDate, profilePicture }: Author) {
    const imageRef = useRef<HTMLImageElement | null>(null);

    return (
        <div className="card card-compact w-72 bg-slate-100 border-solid rounded-2xl border-2 border-slate-200">
            <div className="card-body place-content-between">
                <h4 className="card-title text-black font-bold">
                    {name} {lastName}
                </h4>
                <div className="my-1 text-stone-700">
                    <p>{country}</p>
                    <p>{birthDate}</p>
                </div>
                <div className="my-1 flex justify-center">
                    <img
                        ref={imageRef}
                        src={profilePicture}
                        alt={`${name} cover`}
                        className="w-48 h-auto rounded-3xl"
                    />
                </div>
                <div className="card-actions justify-center">
                    <Link to={`/autor/${id}`} className="btn btn-outline btn-accent w-3/5">
                        Más información
                    </Link>
                </div>
            </div>
        </div>
    );
}

import { useRef, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import { getAllNarrators, search } from '~/services/narratorService';
import { Data, Narrator } from '~/services/interfaces';

import NotFoundModal from '~/components/NotFoundModal';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

export function loader() {
    return getAllNarrators();
}

export default function Narrators() {
    const data = useLoaderData() as Data<Narrator>;
    const [searchResults, setSearchResults] = useState<Narrator[]>([]);

    // Modal 
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Barra de busqueda
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = async () => {
        setSearchResults([]);

        try {
            const response = await search(searchTerm);
            const narrator = response.responseElements;
            if (narrator.length === 0) {
                setIsModalOpen(true);
            } else {
                setSearchResults(narrator);
            }
        } catch {
            setIsModalOpen(true)
        }
    };

    // Organizar Lista
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [sortBy, setSortBy] = useState<"name" | "genre" | "none">("none");
    const [groupBy, setGroupBy] = useState<"none" | "firstLetter">("none");

    const sortNarrators = (narrators: Narrator[]) => {
        return narrators.sort((a, b) => {
            if (sortBy === "name") {
                return sortOrder === "asc"
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            } else if (sortBy === "genre") {
                return sortOrder === "asc"
                    ? a.genre.localeCompare(a.genre)
                    : b.name.localeCompare(b.genre);
            } else {
                return 0;
            }
        });
    };

    const Narrators = searchResults.length > 0 ? searchResults : data.responseElements;
    const sortedNarrators = sortNarrators(Narrators);

    const toggleGroupBy = () => {
        setGroupBy(groupBy === "firstLetter" ? "none" : "firstLetter");
    };

    const toggleSortBy = () => {
        if (sortBy === "none") {
            setSortBy("name");
        } else if (sortBy === "name") {
            setSortBy("genre");
        } else {
            setSortBy("none");
        }
    };

    const groupNarrators = (narrators: Narrator[]) => {
        return narrators.reduce((groups: { [key: string]: Narrator[] }, narrator: Narrator) => {
            const key = narrator.name[0].toUpperCase();
            if (!groups[key]) groups[key] = [];
            groups[key].push(narrator);
            return groups;
        }, {});
    };

    const narratorsToDisplay = (): [string, Narrator[]][] | Narrator[] => {
        const narrators = searchResults.length > 0 ? searchResults : data.responseElements;
        const sortedNarrators = sortNarrators(narrators);
        if (groupBy === "firstLetter") {
            return Object.entries(groupNarrators(sortedNarrators));
        }
        return sortedNarrators;
    };

    return (
        <div className="items-center justify-center min-h-screen bg-slate-100 pt-28">
            <NavBar />
            <div className='my-10 min-h-screen'>
                <h1 className="text-5xl text-center my-2"><strong>Sección de Narradores</strong></h1>
                <div className="navbar border-slate-300 mx-auto justify-between container">
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
                <div className={`${isModalOpen ? "blur-sm overflow-hidden" : ""}`}>
                    <h3 className="card-title text-slate-500 m-4 mx-12">
                        Se encontraron{" "}
                        <strong className="text-slate-700">
                            {searchResults.length > 0 ? searchResults.length : data.totalElements}
                        </strong>{" "}
                        narradores
                    </h3>
                    <div className="flex my-5 mx-10">
                        <button
                            className={`btn btn-outline ${groupBy === "firstLetter" ? "bg-gray-700 text-white" : "custom-button-blue"}`}
                            onClick={toggleGroupBy}>
                            {groupBy === "firstLetter" ? "Agrupado" : "Agrupar"}
                        </button>
                        <button
                            className="btn custom-button-blue btn-outline mx-2"
                            onClick={toggleSortBy}>
                            {sortBy === "none" ? "Ordenar por: Ninguno" : sortBy === "name" ? "Ordenar por: Nombre" : "Ordenar por: Genero"}
                        </button>
                        <button
                            className="btn custom-button-blue btn-outline"
                            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                            {sortOrder === "asc" ? "Ascendente" : "Descendente"}
                        </button>
                    </div>
                    <div className="container mx-11">
                        {groupBy === "firstLetter" ? (
                            (narratorsToDisplay() as [string, Narrator[]][]).map(([key, narrators]) => (
                                <div key={key}>
                                    <h4 className="text-lg font-bold">{key}</h4>
                                    <div className="grid grid-cols-4 gap-4">
                                        {narrators.map((item: Narrator) => (
                                            <Card key={item.id} {...item} />
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="grid grid-cols-4 gap-4">
                                {(narratorsToDisplay() as Narrator[]).map((item: Narrator) => (
                                    <Card key={item.id} {...item} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
            {isModalOpen && <NotFoundModal closeModal={closeModal} />}
        </div>
    );
}

function Card({ id, name, lastName, genre, profilePicture }: Narrator) {
    const imageRef = useRef<HTMLImageElement | null>(null);

    return (
        <div className="card card-compact shadow-xl w-72 bg-slate-100 border-solid rounded-2xl border-2 border-slate-200">
            <div className="card-body place-content-between">
                <a href={`/narrator/${id}`}>
                    <h4 className="card-title text-black font-bold"> {name} {lastName}</h4>
                </a>
                <a href={`/narrator/${id}`}>
                    <div className="my-1 mx-auto">
                        <img
                            ref={imageRef}
                            src={profilePicture}
                            alt={`${name} cover`}
                            className="w-auto h-64 rounded-3xl"
                        />
                    </div>
                </a>
                <a href={`/narrator/${id}`}>
                    <div className='my-4 text-stone-700'>
                        <p>{genre}</p>
                    </div>
                </a>
                <div className="card-actions justify-center">
                    <Link to={`/narrator/${id}`} className="btn btn-outline custom-button-orange w-3/5">
                        Más información
                    </Link>
                </div>
            </div>
        </div>
    );
}
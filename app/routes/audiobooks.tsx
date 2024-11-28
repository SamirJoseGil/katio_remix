import { useRef, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import { getAllAudioBooks, search } from '~/services/audioBookService';
import { Data, Audiobook } from '~/services/interfaces';

import NotFoundModal from '~/components/NotFoundModal';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

export function loader() {
    return getAllAudioBooks();
}

export default function AudioBooks() {
    const data = useLoaderData() as Data<Audiobook>;
    const [searchResults, setSearchResults] = useState<Audiobook[]>([]);

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
            const audioBook = response.responseElements;
            if (audioBook.length === 0) {
                setIsModalOpen(true);
            } else {
                setSearchResults(audioBook);
            }
        } catch {
            setIsModalOpen(true);
        }
    };

    // Organizar lista
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [sortBy, setSortBy] = useState<"name" | "published" | "none">("none");
    const [groupBy, setGroupBy] = useState<"none" | "firstLetter">("none");

    const sortAudioBooks = (audiobooks: Audiobook[]) => {
        return audiobooks.sort((a, b) => {
            if (sortBy === "name") {
                return sortOrder === "asc"
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            } else if (sortBy === "published") {
                return sortOrder === "asc"
                    ? new Date(a.published).getTime() - new Date(b.published).getTime()
                    : new Date(b.published).getTime() - new Date(a.published).getTime();
            } else {
                return 0;
            }
        });
    };

    const audiobooks = searchResults.length > 0 ? searchResults : data.responseElements;
    const sortedAudioBooks = sortAudioBooks(audiobooks);

    const toggleGroupBy = () => {
        setGroupBy(groupBy === "firstLetter" ? "none" : "firstLetter");
    };

    const toggleSortBy = () => {
        if (sortBy === "none") {
            setSortBy("name");
        } else if (sortBy === "name") {
            setSortBy("published");
        } else {
            setSortBy("none");
        }
    };

    const groupAudioBooks = (audiobooks: Audiobook[]) => {
        return audiobooks.reduce((groups: { [key: string]: Audiobook[] }, audiobook: Audiobook) => {
            const key = audiobook.name[0].toUpperCase();
            if (!groups[key]) groups[key] = [];
            groups[key].push(audiobook);
            return groups;
        }, {});
    };

    // Libros a mostrar
    const audiobooksToDisplay = (): [string, Audiobook[]][] | Audiobook[] => {
        const audiobooks = searchResults.length > 0 ? searchResults : data.responseElements;
        const sortedAudioBooks = sortAudioBooks(audiobooks);
        if (groupBy === "firstLetter") {
            return Object.entries(groupAudioBooks(sortedAudioBooks));
        }
        return sortedAudioBooks;
    };


    return (
        <div className="items-center justify-center bg-slate-100 pt-28">
            <NavBar />
            <div className='my-10 bg-slate-100'>
                <h1 className="text-5xl text-center my-2"><strong>Seccion de Audiolibros</strong></h1>
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
                                placeholder="Buscar un audiolibro"
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
                        audiolibros
                    </h3>
                    <div className="flex my-5 mx-10">
                        <button
                            className={`btn btn-outline ${groupBy === "firstLetter" ? "bg-gray-700 text-white" : "bg-slate-100"}`}
                            onClick={toggleGroupBy}>
                            {groupBy === "firstLetter" ? "Agrupado" : "Agrupar"}
                        </button>
                        <button
                            className="btn btn-outline mx-2"
                            onClick={toggleSortBy}>
                            {sortBy === "none" ? "Ordenar por: Ninguno" : sortBy === "name" ? "Ordenar por: Nombre" : "Ordenar por: Año"}
                        </button>
                        <button
                            className="btn btn-outline"
                            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                            {sortOrder === "asc" ? "Ascendente" : "Descendente"}
                        </button>
                    </div>
                    <div className="container mx-11">
                        {groupBy === "firstLetter" ? (
                            (audiobooksToDisplay() as [string, Audiobook[]][]).map(([key, audiobooks]) => (
                                <div key={key}>
                                    <h4 className="text-lg font-bold">{key}</h4>
                                    <div className="grid grid-cols-4 gap-4">
                                        {audiobooks.map((item: Audiobook) => (
                                            <Card key={item.id} {...item} />
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="grid grid-cols-4 gap-4">
                                {(audiobooksToDisplay() as Audiobook[]).map((item: Audiobook) => (
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

function Card({ id, name, published, edition, frontPage }: Audiobook) {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const year = new Date(published).getFullYear();

    return (
        <div className="card card-compact shadow-xl w-72 bg-slate-100 border-solid rounded-2xl border-2 border-slate-200">
            <div className="card-body place-content-between">
                <h4 className="card-title text-black font-bold">{name}</h4>
                <div className="relative my-4 mx-auto">
                    <img
                        ref={imageRef}
                        src={frontPage}
                        alt={`${name} cover`}
                        className="w-auto h-50 rounded-3xl"
                    />
                </div>
                <div className='my-4 text-stone-700'>
                    <p><strong>Publicado:</strong> {year}</p>
                    <p><strong>Edición:</strong> {edition}</p>
                </div>
                <div className="card-actions justify-center">
                    <Link to={`/audiobook/${id}`} className="btn btn-outline btn-accent w-3/5">
                        Más información
                    </Link>
                </div>
            </div>
        </div>
    );
}
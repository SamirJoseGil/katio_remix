import { useRef, useState } from "react";
import { useLoaderData, Link } from "@remix-run/react";
import { getAllBooks, search } from "~/services/bookService";
import { Data, Book } from "~/services/interfaces";

import NotFoundModal from "~/components/NotFoundModal";
import NavBar from "~/components/Navbar";
import Footer from "~/components/Footer";

// Loader para obtener la lista de libros
export function loader() {
    return getAllBooks();
}

export default function Books() {
    const data = useLoaderData<Data<Book>>();
    const [searchResults, setSearchResults] = useState<Book[]>([]);

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
            const books = response.responseElements;
            if (books.length === 0) {
                setIsModalOpen(true);
            } else {
                setSearchResults(books);
            }
        } catch {
            setIsModalOpen(true);
        }
    };

    // Organizar Lista
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [sortBy, setSortBy] = useState<"name" | "published" | "none">("none");
    const [groupBy, setGroupBy] = useState<"none" | "firstLetter">("none");

    const sortBooks = (books: Book[]) => {
        return books.sort((a, b) => {
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

    const books = searchResults.length > 0 ? searchResults : data.responseElements;
    const sortedBooks = sortBooks(books);

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

    const groupBooks = (books: Book[]) => {
        return books.reduce((groups: { [key: string]: Book[] }, book: Book) => {
            const key = book.name[0].toUpperCase();
            if (!groups[key]) groups[key] = [];
            groups[key].push(book);
            return groups;
        }, {});
    };

    // Libros a mostrar
    const booksToDisplay = (): [string, Book[]][] | Book[] => {
        const books = searchResults.length > 0 ? searchResults : data.responseElements;
        const sortedBooks = sortBooks(books);
        if (groupBy === "firstLetter") {
            return Object.entries(groupBooks(sortedBooks));
        }
        return sortedBooks;
    };

    return (
        <div className="items-center justify-center min-h-screen bg-slate-100 pt-28">
            <NavBar />
            <div className="my-10 min-h-screen">
                <h1 className="text-5xl text-center my-2"><strong>Seccion de Libros</strong></h1>
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
                                placeholder="Buscar un libro"
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
                        libros
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
                            (booksToDisplay() as [string, Book[]][]).map(([key, books]) => (
                                <div key={key}>
                                    <h4 className="text-lg font-bold">{key}</h4>
                                    <div className="grid grid-cols-4 gap-4">
                                        {books.map((item: Book) => (
                                            <Card key={item.id} {...item} />
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="grid grid-cols-4 gap-4">
                                {(booksToDisplay() as Book[]).map((item: Book) => (
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

function Card({ id, name, published, edition, bookCover }: Book) {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const year = new Date(published).getFullYear();

    return (
        <div className="card card-compact w-72 bg-slate-100 border-solid rounded-2xl border-2 border-slate-200">
            <div className="card-body place-content-between">
                <a href={`/book/${id}`}>
                    <h4 className="card-title text-black font-bold">{name}</h4>
                </a>
                <a href={`/book/${id}`}>
                    <div className="my-4 mx-auto">
                        <img
                            ref={imageRef}
                            src={bookCover}
                            alt={`${name} cover`}
                            className="w-auto h-64 rounded-3xl"
                        />
                    </div>
                </a>
                <a href={`/book/${id}`}>
                    <div className="my-4 text-stone-700">
                        <p>{edition}</p>
                        <p>{year}</p>
                    </div>
                </a>
                <div className="card-actions justify-center">
                    <Link to={`/book/${id}`} className="btn btn-outline btn-accent w-3/5">
                        Más información
                    </Link>
                </div>
            </div>
        </div>
    );
}

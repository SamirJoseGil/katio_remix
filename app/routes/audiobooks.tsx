import { useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { getAllAudioBooks, search } from '~/services/audioBookService';

import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { Data, Audiobook } from '~/services/interfaces';
import NotFoundModal from '~/components/NotFoundModal';

export function loader() {
    return getAllAudioBooks();
}

export default function AudioBooks() {
    const data = useLoaderData() as Data<Audiobook>;
    const [searchResults, setSearchResults] = useState<Audiobook[]>([]);
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
        <div className="items-center justify-center min-h-screen bg-slate-100">
            <NavBar />
            <div>
                <div className="navbar border-solid rounded-2xl border-2 border-slate-300 mx-auto justify-between container">
                    <div className="mx-20">
                        <a href="/autors" className="btn btn-ghost text-xl">Audio Libros</a>
                    </div>
                    <div className="flex-none gap-2 mx-10">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Buscar un audio libro"
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
                            audio libros
                        </h3>
                        <div className="container mx-11">
                            <div className="grid grid-cols-4 gap-4">
                                {(searchResults.length > 0 ? searchResults : data.responseElements).map((item: Audiobook) => (
                                    <Card
                                        key={item.id}
                                        id={item.id}
                                        name={item.name}
                                        isbn10={item.isbn10}
                                        isbn13={item.isbn13}
                                        published={item.published}
                                        edition={item.edition}
                                        genre={item.genre}
                                        lenghtInSeconds={item.lenghtInSeconds}
                                        path={item.path}
                                        frontPage={item.frontPage}
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

function Card({ id, name, isbn10, isbn13, published, edition, frontPage }: Audiobook) {
    return (
      <div className="card card-compact shadow-xl w-72 bg-slate-100 border-solid rounded-2xl border-2 border-slate-200">
        <div className="card-body place-content-between">
          <h4 className="card-title text-black font-bold">
            {name}
          </h4>
          <div className="my-4 text-stone-700">
            <img src={frontPage} alt={`${name} cover`} className="w-full h-auto rounded-3xl" />
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
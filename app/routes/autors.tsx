import { useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { Data, Author, getAllAuthors, search } from '~/services/authorService';

export function loader() {
    return getAllAuthors();
}

export default function Autors() {
    const data = useLoaderData() as Data;
    const [searchResults, setSearchResults] = useState<Author[]>([]);
    const [searchError, setSearchError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        setSearchResults([]);
        setSearchError('');
        try {
            const response = await search(searchTerm);
            const authors = response.responseElements;
            if (authors.length === 0) {
                setSearchError('No se encontró el autor');
                setIsModalOpen(true);
            } else {
                setSearchResults(authors);
            }
        } catch (error) {
            console.error('Error fetching author:', error);
            setSearchError('No se encontró el autor');
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleMoreInfo = (id: number) => {
        navigate(`/autor/${id}`);
    };

    return (
        <div className="items-center justify-center min-h-screen bg-slate-100">
            <NavBar />
            <div>
                <div className='navbar border-solid rounded-2xl border-2 border-slate-300 mx-auto justify-between container'>
                    <div className='mx-20'>
                        <a href="/autores" className='btn btn-ghost text-xl'>Autores</a>
                    </div>
                    <div className='flex-none gap-2 mx-10'>
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder='Buscar un autor'
                                className='input input-accent w-full bg-slate-100 border-slate-400 rounded-2xl border-2'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="absolute right-0 btn btn-ghost no-animation " onClick={handleSearch}>
                                <div className="indicator">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`${isModalOpen ? 'blur-sm overflow-hidden' : ''}`}>
                    <div className="card">
                        <h3 className='card-title text-slate-500 m-4 mx-12'>Se encontraron <strong className='text-slate-700'>{searchResults.length > 0 ? searchResults.length : data.totalElements}</strong> autores</h3>
                        <div className='container mx-11'>
                            <div className="grid grid-cols-4 gap-4 ">
                                {(searchResults.length > 0 ? searchResults : data.responseElements).map((item: Author) => (
                                    <AuthorCard
                                        key={item.id}
                                        id={item.id}
                                        name={item.name}
                                        lastName={item.lastName}
                                        country={item.country}
                                        birthDate={item.birthDate}
                                        onMoreInfo={handleMoreInfo}
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

function AuthorCard({ name, lastName, country, birthDate, id, onMoreInfo }: Author & { onMoreInfo: (id: number) => void }) {
    return (
        <div className="card card-compact shadow-xl w-72 bg-slate-100 border-solid rounded-2xl border-2 border-slate-200">
            <div className='card-body place-content-between'>
                <h4 className='card-title text-black font-bold'>{name} {lastName}</h4>
                <div className='my-4 text-stone-700'>
                    <p>{country}</p>
                    <p>{birthDate}</p>
                </div>
                <div className="card-actions justify-center">
                    <button className="btn btn-outline btn-accent w-3/5" onClick={() => onMoreInfo(id)}>Más información</button>
                </div>
            </div>
        </div>
    );
}


function NotFoundModal({ closeModal }: { closeModal: () => void }) {
    return (
        <div className="modal modal-open overflow-hidden">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Not Found</h3>
                <p className="py-4">No se encontró el autor.</p>
                <div className="modal-action">
                    <button onClick={closeModal} className="btn">Cerrar</button>
                </div>
            </div>
        </div>
    );
}
import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getAudioBookById, getAudioBookFileById } from "~/services/audioBookService";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

import { Audiobook } from "~/services/interfaces";
import { useEffect, useRef, useState } from "react";
import { calculateAverageColor } from "~/components/calculateAverageColor";

// Loader para obtener los detalles del audiolibro
export const loader: LoaderFunction = async ({ params }) => {
    const id = params.id;
    const response = await getAudioBookById(Number(id));
    return response.responseElements[0];
};

// Componente para mostrar los detalles del audiolibro
export default function AudioBookDetail() {
    const audioBook = useLoaderData<Audiobook>();
    const imageRef = useRef<HTMLImageElement | null>(null);

    const [mediaUrl, setMediaUrl] = useState<string>('');
    const [mediaType, setMediaType] = useState<string>('');

    const fetchAudioBookFile = async () => {
        try {
            const { url, type } = await getAudioBookFileById(audioBook.id);
            setMediaUrl(url);
            setMediaType(type || '');
        } catch (error) {
            console.error(error);
        }
    };


    const downloadAudioBookFile = async () => {
        try {
            const { url, type } = await getAudioBookFileById(audioBook.id);
            const extension = type?.split('/')[1] || 'mp3'; // Proporcionar un valor predeterminado
            const link = document.createElement('a');
            link.href = url;
            link.download = `${audioBook.name}.${extension}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="items-center justify-center min-h-screen bg-slate-100 pt-28">
            <Navbar />
            <div className="min-h-screen">
                <div className="grid grid-cols-11 mx-20 my-10">
                    <div className="justify-center items-center col-start-1 col-end-6">
                        <div>
                            <Link to="/audiobooks" className="btn btn-outline btn-accent">Volver Atras</Link>
                        </div>
                        {audioBook && (
                            <>
                                <h1 className="text-5xl text-slate-800 my-6">
                                    <strong>{audioBook.name}</strong>
                                </h1>
                                <div className="text-lg text-slate-500 font-bold text-3xl mx-2">
                                    <p><strong className="text-slate-700 font-bold">Narrador:</strong> <a className="hover:decoration-1no-underline hover:underline ..." href={`/narrator/${audioBook.narratorId}`}>{audioBook.narrator.name} {audioBook.narrator.lastName} </a></p>
                                    <h2 className="text-3xl text-slate-800 mt-10 mb-5"><strong>Información general</strong></h2>
                                    <p><strong className="text-slate-700 font-bold">ISBN:</strong> {audioBook.isbN10}</p>
                                    <p><strong className="text-slate-700 font-bold">ISBN-13:</strong> {audioBook.isbN13}</p>
                                    <p><strong className="text-slate-700 font-bold">Publicacion:</strong> {audioBook.published}</p>
                                    <p><strong className="text-slate-700 font-bold">Edicion:</strong> {audioBook.edition}</p>
                                    <p><strong className="text-slate-700 font-bold">Genero:</strong> {audioBook.genre}</p>
                                    <p><strong className="text-slate-700 font-bold">Duracion en segundos:</strong> {audioBook.lenghtInSeconds}</p>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="justify-center items-center col-start-6 col-end-12 flex">
                        {audioBook && (
                            <img
                                ref={imageRef}
                                src={audioBook.frontPage}
                                alt={`${audioBook.name} Cover`}
                                className="w-auto h-screen rounded-3xl"
                            />
                        )}
                    </div>
                </div>
                <div className="text-center my-10">
                    <button onClick={fetchAudioBookFile} className="btn btn-outline btn-accent mt-4 mx-4">
                        Escuchar Audiolibro
                    </button>
                    <button onClick={downloadAudioBookFile} className="btn btn-outline btn-accent mt-4">
                        Descargar Audiolibro
                    </button>
                    {mediaUrl && (
                        <div className="mt-4 flex justify-center">
                            {mediaType.startsWith('audio') ? (
                                <audio controls src={mediaUrl} className="w-1/5 my-10" />
                            ) : (
                                <video controls src={mediaUrl} className="w-full my-10" />
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

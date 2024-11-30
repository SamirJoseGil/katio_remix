import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getAudioBookById } from "~/services/audioBookService";
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
    const audioBookName = audioBook.name;
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
                                <h1 className="text-5xl text-slate-700 my-6">
                                    <strong>{audioBook.name}</strong>
                                </h1>
                                <div className="text-lg text-emerald-600 text-3xl mx-2">
                                    {/*<p><strong className="text-slate-600 font-bold">Narrador:</strong> <a className="hover:decoration-1no-underline hover:underline ..." href={`/narrator/${audioBook.narratorId}`}>{audioBook.narrator.name} {audioBook.narrator.lastName} </a></p>*/}
                                    <p><strong className="text-slate-600 font-bold">ISBN:</strong> {audioBook.isbN10}</p>
                                    <p><strong className="text-slate-600 font-bold">ISBN-13:</strong> {audioBook.isbN13}</p>
                                    <p><strong className="text-slate-600 font-bold">Publicacion:</strong> {audioBook.published}</p>
                                    <p><strong className="text-slate-600 font-bold">Edicion:</strong> {audioBook.edition}</p>
                                    <p><strong className="text-slate-600 font-bold">Genero:</strong> {audioBook.genre}</p>
                                    <p><strong className="text-slate-600 font-bold">Duracion en segundos:</strong> {audioBook.lenghtInSeconds}</p>
                                    {audioBook.narrator && (
                                        <div className="my-6">
                                            <h2 className="text-4xl text-slate-700 mt-10 mb-5"><strong>Información del narrador</strong></h2>
                                            <p><strong className="text-slate-600 font-bold">Nombre:</strong> {audioBook.narrator.name} {audioBook.narrator.lastName}</p>
                                            <Link to={`/narrator/${audioBook.narratorId}`} className="btn btn-outline btn-accent w-2/5 my-2">
                                                Más información
                                            </Link>
                                        </div>
                                    )}
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
                <div className="">
                    <h1>Aca va el libro en audiolibro</h1>
                </div>
            </div>
            <Footer />
        </div>
    );
}

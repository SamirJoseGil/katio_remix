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

    console.log("AudioBook data:", response);
    return response.responseElements[0];
};

// Componente para mostrar los detalles del audiolibro
export default function AudioBookDetail() {
    const audioBook = useLoaderData<Audiobook>();
    const [backgroundColor, setBackgroundColor] = useState<string>("#cccccc");
    const imageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const img = imageRef.current;
        if (img) {
            img.onload = () => {
                const averageColor = calculateAverageColor(img);
                setBackgroundColor(averageColor);
            };
        }
    }, [audioBook.frontPage]);

    return (
        <div className="items-center justify-center min-h-screen bg-slate-100 pt-16">
            <Navbar />
            <div className="grid grid-cols-11 mx-20 my-10">
                <div className="justify-center items-center col-start-1 col-end-6">
                    <div>
                        <Link to="/audiobooks" className="btn btn-outline btn-accent">Volver Atras</Link>
                    </div>
                    <h1 className="text-5xl text-slate-700 my-6">
                        <strong>{audioBook.name}</strong>
                    </h1>
                    <div className="text-lg text-emerald-600 text-3xl mx-2">
                        <p><strong className="text-slate-600 font-bold">ISBN-10:</strong> {audioBook.isbN10}</p>
                        <p><strong className="text-slate-600 font-bold">ISBN-13:</strong> {audioBook.isbN13}</p>
                        <p><strong className="text-slate-600 font-bold">Publicacion:</strong> {audioBook.published}</p>
                        <p><strong className="text-slate-600 font-bold">Edicion:</strong> {audioBook.edition}</p>
                        <p><strong className="text-slate-600 font-bold">Genero:</strong> {audioBook.genre}</p>
                        <p><strong className="text-slate-600 font-bold">Duracion en segundos:</strong> {audioBook.lenghtInSeconds}</p>
                        <div className="my-4">
                            <p className="text-slate-600 font-bold text-4xl">Audiolibro</p>
                        </div>
                    </div>
                </div>
                <div className="justify-center items-center col-start-6 col-end-12">
                    <div className="relative p-2">
                        <div
                            className="absolute inset-0 blur-xl rounded-3xl z-0"
                            style={{
                                backgroundColor: backgroundColor,
                            }}
                        ></div>
                        <img
                            ref={imageRef}
                            src={audioBook.frontPage}
                            alt={`${audioBook.name} Cover`}
                            className="w-full h-auto rounded-3xl relative z-10"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

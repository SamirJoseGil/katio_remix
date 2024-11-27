import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getBookById } from "~/services/bookService";
import { Book } from "~/services/interfaces";

import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { useEffect, useRef, useState } from "react";
import { calculateAverageColor } from "~/components/calculateAverageColor";

export const loader: LoaderFunction = async ({ params }) => {
    const id = params.id;
    const response = await getBookById(Number(id));
    return response.responseElements[0];
};

export default function BookDetail() {
    const book = useLoaderData<Book>();
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
    }, [book.bookCover]);

    return (
        <div className="items-center justify-center min-h-screen bg-slate-100 pt-28">
            <Navbar />
            <div className="grid grid-cols-11 mx-20 my-10">
                <div className="justify-center items-center col-start-1 col-end-6">
                    <div>
                        <Link to="/books" className="btn btn-outline btn-accent">Volver Atras</Link>
                    </div>
                    {book && (
                        <>
                            <h1 className="text-5xl text-slate-700 my-6">
                                <strong>{book.name}</strong>
                            </h1>
                            <div className="text-lg text-emerald-600 text-3xl mx-2">
                                <p><strong className="text-slate-600 font-bold">ISBN:</strong> {book.isbN10}</p>
                                <p><strong className="text-slate-600 font-bold">ISBN-13:</strong> {book.isbN13}</p>
                                <p><strong className="text-slate-600 font-bold">Publicacion:</strong> {book.published}</p>
                                <p><strong className="text-slate-600 font-bold">Edicion:</strong> {book.edition}</p>
                                {book.author && (
                                    <div className="mt-4">
                                        <h2 className="text-4xl text-slate-700 mt-10 mb-5"><strong>Información del Autor</strong></h2>
                                        <p><strong className="text-slate-600 font-bold">Nombre:</strong> {book.author.name} {book.author.lastName}</p>
                                        <p><strong className="text-slate-600 font-bold">País:</strong> {book.author.country}</p>
                                        <p><strong className="text-slate-600 font-bold">Fecha de Nacimiento:</strong> {book.author.birthDate}</p>
                                        <Link to={`/autor/${book.authorId}`} className="btn btn-outline btn-accent w-2/5 my-2">
                                            Más información
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
                <div className="justify-center items-center col-start-6 col-end-12">
                    <div className="">
                        <div className="relative p-1">
                            <div
                                className="absolute inset-0 blur-xl rounded-3xl z-0"
                                style={{
                                    backgroundColor: backgroundColor,
                                }}
                            ></div>
                            {book && (
                                <img
                                    src={book.bookCover}
                                    alt={`${book.name} Cover`}
                                    className="w-auto h-screen rounded-3xl relative z-10"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

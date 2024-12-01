import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getBookById } from "~/services/bookService";
import { Book } from "~/services/interfaces";

import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { useRef } from "react";

export const loader: LoaderFunction = async ({ params }) => {
    const id = params.id;
    const response = await getBookById(Number(id));
    return response.responseElements[0];
};

export default function BookDetail() {
    const book = useLoaderData<Book>();
    const imageRef = useRef<HTMLImageElement | null>(null);

    return (
        <div className="items-center justify-center min-h-screen bg-slate-100 pt-28">
            <Navbar />
            <div className="min-h-screen">
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
                                    <p><strong className="text-slate-600 font-bold">Autor:</strong> <a className="hover:decoration-1no-underline hover:underline ..." href={`/autor/${book.authorId}`}>{book.author.name} {book.author.lastName} </a></p>
                                    <h2 className="text-3xl text-slate-700 mt-10 mb-5"><strong>Información general</strong></h2>
                                    <p><strong className="text-slate-600 font-bold">ISBN:</strong> {book.isbN10}</p>
                                    <p><strong className="text-slate-600 font-bold">ISBN-13:</strong> {book.isbN13}</p>
                                    <p><strong className="text-slate-600 font-bold">Publicacion:</strong> {book.published}</p>
                                    <p><strong className="text-slate-600 font-bold">Edicion:</strong> {book.edition}</p>
                                    {book.author && (
                                        <div className="my-6">
                                            <Link to={`/autor/${book.authorId}`} className="btn btn-outline btn-accent w-2/5 my-2">
                                                Más información
                                            </Link>
                                        </div>
                                    )}
                                    <p><strong className="text-4xl text-slate-700 font-bold">Descripcion de el libro</strong></p>
                                    <p>aca va la descripcion</p>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="justify-center items-center col-start-6 col-end-12 flex">
                        {book && (
                            <img
                                src={book.bookCover}
                                alt={`${book.name} Cover`}
                                className="w-auto h-screen rounded-3xl"
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="">
                <h1>Aca va el libro en pdf</h1>
            </div>
            <Footer />
        </div>
    );
}
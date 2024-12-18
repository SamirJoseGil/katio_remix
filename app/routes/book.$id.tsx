import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getBookById, getBookPdfById } from "~/services/bookService";
import { Book } from "~/services/interfaces";

import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { useRef, useState } from "react";

export const loader: LoaderFunction = async ({ params }) => {
    const id = params.id;
    const response = await getBookById(Number(id));
    return response.responseElements[0];
};

export default function BookDetail() {
    const book = useLoaderData<Book>();
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [pdfUrl, setPdfUrl] = useState<string>('');

    const fetchBookWithPdf = async () => {
        try {
            const url = await getBookPdfById(book.id);
            setPdfUrl(url);
        } catch (error) {
            console.error(error);
        }
    };

    const downloadBookPdf = async () => {
        try {
            const url = await getBookPdfById(book.id);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${book.name}.pdf`;
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
                            <Link to="/books" className="btn btn-outline custom-button-blue">Volver Atras</Link>
                        </div>
                        {book && (
                            <>
                                <h1 className="text-5xl text-slate-800 my-6">
                                    <strong>{book.name}</strong>
                                </h1>
                                <div className="text-lg text-slate-500 font-bold text-3xl mx-2">
                                    <p><strong className="text-slate-700 font-bold">Autor:</strong> <a className="text-custom-Orange hover:decoration-1no-underline hover:underline ..." href={`/autor/${book.authorId}`}>{book.author.name} {book.author.lastName} </a></p>
                                    <h2 className="text-3xl text-slate-800 mt-10 mb-5"><strong>Información general</strong></h2>
                                    <p><strong className="text-slate-700 font-bold">ISBN:</strong> {book.isbN10}</p>
                                    <p><strong className="text-slate-700 font-bold">ISBN-13:</strong> {book.isbN13}</p>
                                    <p><strong className="text-slate-700 font-bold">Publicacion:</strong> {book.published}</p>
                                    <p><strong className="text-slate-700 font-bold">Edicion:</strong> {book.edition}</p>
                                    <h2 className="text-3xl text-slate-800 mt-10 mb-5"><strong>Descripcion del libro</strong></h2>
                                    <p><strong className="text-slate-700 font-bold">{book.description}</strong></p>
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
            <div className="text-center my-10">
                <button onClick={fetchBookWithPdf} className="btn btn-outline custom-button-orange mt-4 mx-4">
                    Leer Libro
                </button>
                <button onClick={downloadBookPdf} className="btn btn-outline custom-button-orange mt-4">
                    Descargar Libro
                </button>
                {pdfUrl && (
                    <div className="mt-4 flex justify-center">
                        <iframe src={pdfUrl} width="80%" height="600px" className="border-0" />
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
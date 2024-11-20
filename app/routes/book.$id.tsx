import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getBookById } from "~/services/bookService";
import { Book } from "~/services/interfaces";

import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";


export const loader: LoaderFunction = async ({ params }) => {
    const id = params.id;
    const response = await getBookById(Number(id));
    return response.responseElements[0];
};


export default function BookDetail() {
    const book = useLoaderData<Book>();

    return (
        <div className="items-center justify-center min-h-screen bg-slate-100">
            <Navbar />
            <div className="grid grid-cols-2 mx-10">
                <div className="justify-center items-center">
                    <h1 className="text-3xl text-slate-700 my-6">
                        <strong>{book.name}</strong>
                    </h1>
                    <h2 className="text-xl text-slate-500 my-2">
                        <strong>Edición:</strong> {book.edition}
                    </h2>
                    <h2 className="text-xl text-slate-500">
                        <strong>Fecha de publicación:</strong> {book.published}
                    </h2>
                </div>
            </div>
            <Footer />
        </div>
    );
}

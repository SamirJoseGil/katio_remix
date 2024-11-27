import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useRef, useState } from "react";

import { getByAuthorId } from "~/services/bookService";
import { getAuthorById } from "~/services/authorService";
import { Author, Book } from "~/services/interfaces";

import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";



// Loader para obtener los detalles del autor
export const loader: LoaderFunction = async ({ params }) => {
    const id = params.id;
    const authorResponse = await getAuthorById(Number(id));
    const booksResponse = await getByAuthorId(Number(id));
    return {
        author: authorResponse.responseElements[0],
        books: booksResponse.responseElements,
    };
};

// Componente para mostrar los detalles del autor
export default function AuthorDetail() {
    const { author, books } = useLoaderData<{ author: Author; books: Book[] }>();
    const imageRef = useRef<HTMLImageElement | null>(null);

    return (
        <div className="items-center justify-center min-h-screen bg-slate-100 pt-28">
            <Navbar />
            <div className="grid grid-cols-12 mx-20 my-10">
                <div className="justify-center items-center col-start-1 col-end-6 row-start-1">
                    <div>
                        <Link to="/autors" className="btn btn-outline btn-accent">Volver Atras</Link>
                    </div>
                    <h1 className="text-3xl text-slate-700 my-6">
                        <strong>{author.name} {author.lastName}</strong>
                    </h1>
                    <h2 className="text-xl text-slate-500 my-2">
                        <strong>Fecha de Nacimiento:</strong> {author.birthDate}
                    </h2>
                    <h2 className="text-xl text-slate-500">
                        <strong>País:</strong> {author.country}
                    </h2>
                    <div className="p-1 my-6 mr-10">
                        <img
                            ref={imageRef}
                            src={author.profilePicture}
                            alt={`${author.name} Image`}
                            className="w-full h-auto rounded-3xl z-10"
                        />
                    </div>
                </div>
                <div className="justify-center items-center col-start-6 col-end-13 row-start-1">
                    <h1 className="text-3xl text-slate-700 my-6">
                        <strong>Bibliografia</strong>
                    </h1>
                    <p className="text-xl text-slate-500 text-justify">
                        {author.biography}
                    </p>
                </div>
            </div>
            <div className="my-10">
                <h1 className="text-4xl text-slate-700 my-6 text-center"><strong>Libros del autor</strong></h1>
                <div className="container mx-11">
                    <div className="grid grid-cols-4 gap-4">
                        {books.map((item: Book) => (
                            <Card key={item.id} {...item} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}





function Card({ id, name, published, edition, bookCover }: Book) {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const year = new Date(published).getFullYear();

    return (
        <div className="card card-compact w-72 bg-slate-100 border-solid rounded-2xl border-2 border-slate-200">
            <div className="card-body place-content-between">
                <h4 className="card-title text-black font-bold">{name}</h4>
                <div className="my-4 mx-auto">
                    <img
                        ref={imageRef}
                        src={bookCover}
                        alt={`${name} cover`}
                        className="w-auto h-64 rounded-3xl"
                    />
                </div>
                <div className="my-4 text-stone-700">
                    <p>{edition}</p>
                    <p>{year}</p>
                </div>
                <div className="card-actions justify-center">
                    <Link to={`/book/${id}`} className="btn btn-outline btn-accent w-3/5">
                        Más información
                    </Link>
                </div>
            </div>
        </div>
    );
}
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAuthorById } from "~/services/authorService";
import { Author } from "~/services/interfaces";

import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";


// Loader para obtener los detalles del autor
export const loader: LoaderFunction = async ({ params }) => {
    const id = params.id;
    const response = await getAuthorById(Number(id));
    return response.responseElements[0];
};

// Componente para mostrar los detalles del autor
export default function AuthorDetail() {
    const author = useLoaderData<Author>();

    return (
        <div className="items-center justify-center min-h-screen bg-slate-100">
            <Navbar />
            <div className="grid grid-cols-2 mx-10">
                <div className="justify-center items-center">
                    <h1 className="text-3xl text-slate-700 my-6">
                        <strong>{author.name} {author.lastName}</strong>
                    </h1>
                    <h2 className="text-xl text-slate-500 my-2">
                        <strong>Fecha de Nacimiento:</strong> {author.birthDate}
                    </h2>
                    <h2 className="text-xl text-slate-500">
                        <strong>País:</strong> {author.country}
                    </h2>
                </div>
            </div>
            <Footer />
        </div>
    );
}

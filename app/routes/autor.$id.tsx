import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getAuthorById } from "~/services/authorService";
import { Author } from "~/services/interfaces";

import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { useEffect, useRef, useState } from "react";
import { calculateAverageColor } from "~/components/calculateAverageColor";


// Loader para obtener los detalles del autor
export const loader: LoaderFunction = async ({ params }) => {
    const id = params.id;
    const response = await getAuthorById(Number(id));
    return response.responseElements[0];
};

// Componente para mostrar los detalles del autor
export default function AuthorDetail() {
    const author = useLoaderData<Author>();
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
    }, [author.profilePicture]);

    return (
        <div className="items-center justify-center min-h-screen bg-slate-100 pt-16">
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
                    <div className="relative p-1 my-6 mr-10">
                        <div
                            className="absolute inset-0 blur-xl rounded-3xl z-0"
                            style={{
                                backgroundColor: backgroundColor,
                            }}
                        ></div>
                        <img
                            ref={imageRef}
                            src={author.profilePicture}
                            alt={`${author.name} Image`}
                            className="w-full h-auto rounded-3xl relative z-10"
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
            <Footer />
        </div>
    );
}

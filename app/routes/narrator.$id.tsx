import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useRef } from "react";

import { getAudioBookByNarratorId } from "~/services/audioBookService";
import { getNarratorById } from "~/services/narratorService";
import { Audiobook, Narrator } from "~/services/interfaces";

import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";


// Loader para obtener los detalles del narrador
export const loader: LoaderFunction = async ({ params }) => {
    const id = params.id;
    const narratorResponse = await getNarratorById(Number(id));
    const audioBookResponse = await getAudioBookByNarratorId(Number(id));
    return {
        narrator: narratorResponse.responseElements[0],
        audiobooks: audioBookResponse.responseElements || [],
    }
};

// Componente para mostrar los detalles del narrador
export default function NarratorDetail() {
    const { narrator, audiobooks } = useLoaderData<{ narrator: Narrator, audiobooks: Audiobook[] }>();
    const imageRef = useRef<HTMLImageElement | null>(null);

    return (
        <div className="items-center justify-center bg-slate-100 pt-28">
            <Navbar />
            <div className="grid grid-cols-11 mx-20 my-10 min-h-screen">
                <div className="justify-center items-center col-start-1 col-end-6 row-start-1">
                    <div>
                        <Link to="/narrators" className="btn btn-outline btn-accent">Volver Atras</Link>
                    </div>
                    <h1 className="text-5xl text-slate-800 my-6">
                        <strong>{narrator.name} {narrator.lastName}</strong>
                    </h1>
                    <h2 className="text-lg text-slate-500 font-bold text-3xl mx-2">
                        <strong className="text-slate-700 font-bold">Género:</strong> {narrator.genre}
                    </h2>
                    <div className="p-1 my-6 mr-10">
                        <img
                            ref={imageRef}
                            src={narrator.profilePicture}
                            alt={`${narrator.name} Image`}
                            className="w-auto h-screen rounded-3xl z-10"
                        />
                    </div>
                </div>
                <div className="justify-center items-center col-start-6 col-end-13 row-start-1">
                    <h1 className="text-3xl text-slate-800 mt-10 mb-5">
                        <strong>Bibliografia</strong>
                    </h1>
                    <p className="text-xl text-slate-500 text-justify">
                        aca va la bibliografia de el narrador
                    </p>
                </div>
            </div>
            <div className="my-10">
                <h1 className="text-4xl text-slate-700 my-6 text-center"><strong>Audiolibros del narrador</strong></h1>
                <div className="container mx-11">
                    <div className="grid grid-cols-4 gap-4">
                        {audiobooks.map((item: Audiobook) => (
                            <Card key={item.id} {...item} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

function Card({ id, name, published, edition, frontPage }: Audiobook) {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const year = new Date(published).getFullYear();

    return (
        <div className="card card-compact shadow-xl w-72 bg-slate-100 border-solid rounded-2xl border-2 border-slate-200">
            <div className="card-body place-content-between">
                <h4 className="card-title text-black font-bold">{name}</h4>
                <div className="relative my-4 mx-auto">
                    <img
                        ref={imageRef}
                        src={frontPage}
                        alt={`${name} cover`}
                        className="w-auto h-50 rounded-3xl"
                    />
                </div>
                <div className='my-4 text-stone-700'>
                    <p><strong>Publicado:</strong> {year}</p>
                    <p><strong>Edición:</strong> {edition}</p>
                </div>
                <div className="card-actions justify-center">
                    <Link to={`/audiobook/${id}`} className="btn btn-outline btn-accent w-3/5">
                        Más información
                    </Link>
                </div>
            </div>
        </div>
    );
}
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Data, Author, getAuthorById, search } from "../services/authorService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


// Función loader para cargar los datos del autor
export const loader: LoaderFunction = async ({ params }) => {
    const id = params.id;
    if (!id) {
        console.error("Author ID not provided");
        throw new Response("Author ID not provided", { status: 400 });
    }

    try {
        const response: Data = await getAuthorById(Number(id));
        console.log("Author data:", response);
        if (response.totalElements === 0) {
            throw new Response("Author not found", { status: 404 });
        }
        return response.responseElements[0];
    } catch (error) {
        console.error("Error fetching author:", error);
        throw new Response("Author not found", { status: 404 });
    }
};

// Componente para mostrar los detalles del autor
export default function AuthorDetail() {
    const author = useLoaderData<Author>();

    return (
        <div className="items-center justify-center min-h-screen bg-slate-100">
            <Navbar />
            <div className="grid grid-cols-2 mx-10">
                <div className="justify-center items-center ">
                    <div className="">
                        <h1 className="text-3xl text-slate-700 my-6"><strong>{author.name} {author.lastName}</strong></h1>
                        <h2 className="text-xl  text-slate-500 my-2"><strong>Fecha de Nacimiento:</strong> {author.birthDate}</h2>
                        <h2 className="text-xl text-slate-500"><strong>País:</strong> {author.country}</h2>
                    </div>
                </div>
                <div className="">
                    <div className="col-start-2">
                        <h1 className="text-3xl text-slate-700 my-6"><strong>Bibliografía</strong></h1>
                        <h2 className="text-xl text-slate-500 text-justify">
                            Gabriel José García Márquez (Aracataca, Magdalena, 6 de marzo de 1927-Ciudad de México, 17 de abril de 2014)nota 1​2​ ( escuchar) fue un escritor, guionista, editor de libros y periodista colombiano. Reconocido por sus novelas y cuentos, también escribió narrativa de no ficción, discursos, reportajes, críticas cinematográficas y memorias. Estudió derecho y periodismo en la Universidad Nacional de Colombia e inició sus colaboraciones periodísticas en el diario El Espectador. Fue conocido como Gabo, o Gabito, por sus familiares y amigos.3​4​ En 1982 recibió el Premio Nobel de Literatura5​ «por sus novelas e historias cortas, en las que lo fantástico y lo real se combinan en un mundo compuesto de imaginación, lo que refleja la vida y los conflictos de un continente».6​7

                            Junto a Julio Cortázar, Mario Vargas Llosa, Carlos Fuentes y Roberto Bolaño, fue uno de los exponentes centrales del boom latinoamericano. Está considerado uno de los principales autores del realismo mágico, y su novela más conocida, Cien años de soledad, es una de las más representativas de esa corriente literaria. Se considera que a su éxito se debe que el término se aplique a la literatura surgida a partir de 1960 en América Latina.8​9

                            En 2007 la Real Academia Española y la Asociación de Academias de la Lengua Española publicaron una edición popular conmemorativa de esta obra, por considerarla parte de los grandes clásicos hispánicos de todos los tiempos.10
                        </h2>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
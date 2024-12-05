import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { ImageToBase64 } from "~/components/Base64Util";

interface FormData {
    name: string;
    lastName: string;
    country: string;
    birthDate: string;
    profilePicture: string;
    biography: string;
}

export default function CreateAuthor() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        lastName: "",
        country: "",
        birthDate: "",
        profilePicture: "",
        biography: "",
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [authorCoverBase64, setAuthorCoverBase64] = useState("");

    const navigate = useNavigate(); // Hook para navegación programática

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleBase64Generated = (base64: string) => {
        setAuthorCoverBase64(base64);
        setFormData({ ...formData, profilePicture: base64 });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const authorData = {
            name: formData.name,
            lastName: formData.lastName,
            country: formData.country,
            birthDate: formData.birthDate,
            profilePicture: formData.profilePicture,
            biography: formData.biography,
        };

        try {
            const response = await fetch("http://localhost:5125/api/Author/CreateAuthor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(authorData),
            });

            const responseText = await response.text();

            if (!response.ok) {
                setErrorMessage(`Error al crear el author: ${responseText}`);
                setIsModalOpen(true);
                return;
            }

            alert("Author creado exitosamente");

            // Redirigir a /autors después de la creación exitosa
            navigate("/autors");

        } catch (error) {
            console.error("Error de conexión:", error);
            setErrorMessage("Error inesperado al conectar con el servidor.");
            setIsModalOpen(true);
        }
    };

    return (
        <div className="bg-slate-100 pt-28">
            <Navbar />
            <div className="container mx-auto my-20">
                <form onSubmit={handleSubmit} className="mx-20 bg-white shadow-md rounded-lg p-6 text-center">
                    <h2 className="text-2xl font-bold my-8 text-slate-700">Crear Author</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <label className="input rounded-3xl w-full bg-white border border-neutral-600 flex items-center focus-within:border-emerald-400 focus-within:bg-gray-s100 hover:bg-gray-100">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="grow px-3 py-2"
                                    placeholder="Nombre"
                                    required
                                />
                            </label>
                            <label className="input rounded-3xl w-full bg-white border border-neutral-600 flex items-center focus-within:border-emerald-400 focus-within:bg-gray-s100 hover:bg-gray-100">
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="grow px-3 py-2"
                                    placeholder="Apellido"
                                    required
                                />
                            </label>
                            <label className="input rounded-3xl w-full bg-white border border-neutral-600 flex items-center focus-within:border-emerald-400 focus-within:bg-gray-s100 hover:bg-gray-100">
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="grow px-3 py-2"
                                    placeholder="País"
                                    required
                                />
                            </label>
                            <label className="input rounded-3xl w-full bg-white border border-neutral-600 flex items-center focus-within:border-emerald-400 focus-within:bg-gray-s100 hover:bg-gray-100">
                                <input
                                    type="date"
                                    name="birthDate"
                                    value={formData.birthDate}
                                    onChange={handleInputChange}
                                    className="grow px-3 py-2 text-slate-400 date-input"
                                    placeholder="Fecha de Nacimiento"
                                    required
                                />
                            </label>
                            <textarea
                                name="biography"
                                value={formData.biography}
                                onChange={handleInputChange}
                                className="text-neutral-700 bg-white rounded-3xl w-full h-60 border border-neutral-600 resize-none p-4 placeholder-gray-400 focus:outline-none"
                                placeholder="Bibliografía"
                                required
                                rows={5}
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <ImageToBase64 onBase64Generated={handleBase64Generated} />
                            {authorCoverBase64 && (
                                <div className="mt-4 max-w-lg mx-h-xl">
                                    <img src={authorCoverBase64} alt="Portada" className="rounded-3xl border" />
                                </div>
                            )}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-outline custom-button-orange rounded-3xl w-1/5 my-10">
                        Crear Autor
                    </button>
                </form>
                {isModalOpen && (
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        errorMessage={errorMessage}
                    />
                )}
            </div>
            <Footer />
        </div>
    );
}


function Modal({ isOpen, onClose, errorMessage }: { isOpen: boolean, onClose: () => void, errorMessage: string | null }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg">
                <p className="text-red-600">{errorMessage}</p>
                <button onClick={onClose} className="btn btn-error mt-4">Cerrar</button>
            </div>
        </div>
    );
}
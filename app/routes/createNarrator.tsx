import { ChangeEvent, useState } from "react";

import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { useNavigate } from "@remix-run/react";

interface FormData {
    name: string;
    lastName: string;
    genre: string;
    profilePicture: string;
}

export default function CreateNarrator() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        lastName: "",
        genre: "",
        profilePicture: "",
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [narratorCoverBase64, setNarratorCoverBase64] = useState("");
    const navigate = useNavigate(); 

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleBase64Generated = (base64: string) => {
        setNarratorCoverBase64(base64);
        setFormData({ ...formData, profilePicture: base64 });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const narratorData = {
            name: formData.name,
            lastName: formData.lastName,
            genre: formData.genre,
            profilePicture: formData.profilePicture,
        };

        try {
            const response = await fetch("http://localhost:5125/api/Narrator/CreateNarrator", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(narratorData),
            });

            const responseText = await response.text();

            if (!response.ok) {
                setErrorMessage(`Error al crear el narrador: ${responseText}`);
                setIsModalOpen(true);
                return;
            }
            alert("Narrador creado exitosamente");
            navigate("/narrators");

            setFormData({
                name: "",
                lastName: "",
                genre: "",
                profilePicture: "",
            });
            setNarratorCoverBase64("");
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
                    <h2 className="text-2xl font-bold my-8 text-slate-700">Crear Narrador</h2>
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
                                    name="genre"
                                    value={formData.genre}
                                    onChange={handleInputChange}
                                    className="grow px-3 py-2"
                                    placeholder="Género"
                                    required
                                />
                            </label>
                        </div>
                        <div className="flex flex-col items-center">
                            <ImageToBase64 onBase64Generated={handleBase64Generated} />
                            {narratorCoverBase64 && (
                                <div className="mt-4 max-w-lg mx-h-xl">
                                    <img src={narratorCoverBase64} alt="Portada" className="rounded-3xl border" />
                                </div>
                            )}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-outline custom-button-orange rounded-3xl w-1/5 my-10">
                        Crear Narrador
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

function ImageToBase64({ onBase64Generated }: { onBase64Generated: (base64: string) => void }) {
    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    onBase64Generated(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <label className="btn btn-outline custom-button-orange cursor-pointer">
                Subir Portada
                <input type="file" onChange={handleImageUpload} className="hidden" />
            </label>
        </div>
    );
}
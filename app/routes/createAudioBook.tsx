import { ChangeEvent, useState } from "react";

import { ImageToBase64 } from "~/components/Base64Util";

import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

interface FormData {
    name: string;
    isbn10: string;
    isbn13: string;
    published: string;
    edition: string;
    genre: string;
    lenghtInSeconds: string;
    frontPage: string;
    narratorId: string;
    audioFile: File | null;
}

export default function CreateAudiobook() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        isbn10: "",
        isbn13: "",
        published: "",
        edition: "",
        genre: "",
        lenghtInSeconds: "",
        frontPage: "",
        narratorId: "",
        audioFile: null,
    })

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [frontPageBase64, setFrontPageBase64] = useState("");
    const [selectedAudioName, setSelectedAudioName] = useState("");
    const [audioDuration, setAudioDuration] = useState<string>("");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleBase64Generated = (base64: string) => {
        setFrontPageBase64(base64);
        setFormData({ ...formData, frontPage: base64 });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("isbn10", formData.isbn10);
        formDataToSend.append("isbn13", formData.isbn13);
        formDataToSend.append("published", formData.published);
        formDataToSend.append("edition", formData.edition);
        formDataToSend.append("genre", formData.genre);
        formDataToSend.append("lengthInSeconds", formData.lenghtInSeconds);
        formDataToSend.append("frontPage", formData.frontPage);
        formDataToSend.append("narratorId", formData.narratorId);

        if (formData.audioFile) {
            formDataToSend.append("AudioFile", formData.audioFile); // Asegúrate de usar "AudioFile" con "A" mayúscula
        } else {
            setErrorMessage("El archivo de audio es requerido.");
            setIsModalOpen(true);
            return;
        }

        try {
            const response = await fetch("http://localhost:5125/api/Audiobook/CreateAudiobook", {
                method: "POST",
                body: formDataToSend,
            });

            if (!response.ok) {
                const responseText = await response.text();
                setErrorMessage(`Error al crear el audiolibro: ${responseText}`);
                setIsModalOpen(true);
                return;
            }

            alert("Audiolibro creado exitosamente");
            setFormData({
                name: "",
                isbn10: "",
                isbn13: "",
                published: "",
                edition: "",
                genre: "",
                lenghtInSeconds: "",
                frontPage: "",
                narratorId: "",
                audioFile: null,
            });
        } catch (error) {
            setErrorMessage("Error inesperado al conectar con el servidor.");
            setIsModalOpen(true);
        }
    };

    const handleAudioChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedAudioName(file.name);
            setFormData((prevFormData) => ({
                ...prevFormData,
                audioFile: file,
            }));

            const audio = new Audio(URL.createObjectURL(file));
            audio.addEventListener('loadedmetadata', () => {
                const durationInSeconds = Math.floor(audio.duration);
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    lenghtInSeconds: durationInSeconds.toString(),
                }));
            });
        }
    };

    return (
        <div className="bg-slate-100 pt-28">
            <Navbar />
            <div className="container mx-auto my-20 min-h-screen">
                <form onSubmit={handleSubmit} className="mx-20 bg-white shadow-md rounded-lg p-6 text-center">
                    <h2 className="text-2xl font-bold mb-4 text-slate-700">Crear Audiolibro</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <label className="input rounded-3xl w-full bg-white border border-neutral-600 flex items-center">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="grow"
                                    placeholder="Nombre"
                                    required
                                />
                            </label>
                            <label className="input rounded-3xl w-full bg-white border border-neutral-600 flex items-center">
                                <input
                                    type="text"
                                    name="isbn10"
                                    value={formData.isbn10}
                                    onChange={handleInputChange}
                                    className="grow"
                                    placeholder="ISBN"
                                    required
                                />
                            </label>
                            <label className="input rounded-3xl w-full bg-white border border-neutral-600 flex items-center">
                                <input
                                    type="text"
                                    name="isbn13"
                                    value={formData.isbn13}
                                    onChange={handleInputChange}
                                    className="grow"
                                    placeholder="ISBN13"
                                    required
                                />
                            </label>
                            <label className="input rounded-3xl w-full bg-white border border-neutral-600 flex items-center">
                                <input
                                    type="date"
                                    name="published"
                                    value={formData.published}
                                    onChange={handleInputChange}
                                    className="grow text-neutral-400"
                                    required
                                />
                            </label>
                            <label className="input rounded-3xl w-full bg-white border border-neutral-600 flex items-center">
                                <input
                                    type="text"
                                    name="edition"
                                    value={formData.edition}
                                    onChange={handleInputChange}
                                    className="grow"
                                    placeholder="Edición"
                                    required
                                />
                            </label>
                            <label className="input rounded-3xl w-full bg-white border border-neutral-600 flex items-center">
                                <input
                                    type="text"
                                    name="genre"
                                    value={formData.genre}
                                    onChange={handleInputChange}
                                    className="grow"
                                    placeholder="Género"
                                    required
                                />
                            </label>
                            <label className="input rounded-3xl w-full bg-white border border-neutral-600 flex items-center">
                                <input
                                    type="text"
                                    name="narratorId"
                                    value={formData.narratorId}
                                    onChange={handleInputChange}
                                    className="grow"
                                    placeholder="ID del Autor"
                                    required
                                />
                            </label>
                            <label className="input rounded-3xl w-full bg-white border border-neutral-600 flex items-center">
                                Duración del audiolibro  {audioDuration} segundos
                            </label>
                        </div>
                        <div>
                            <label className="rounded-3xl w-full bg-white flex items-center">
                                <input
                                    type="file"
                                    name="audioFile"
                                    onChange={handleAudioChange}
                                    className="hidden"
                                    required
                                />
                                <span className="btn btn-outline btn-primary cursor-pointer w-full text-center py-2 rounded-3xl">
                                    {selectedAudioName || 'Seleccionar Audio'}
                                </span>
                            </label>
                            <div className="flex flex-col items-center my-10">
                                <ImageToBase64 onBase64Generated={handleBase64Generated} />
                                {frontPageBase64 && (
                                    <div className="mt-4 max-w-lg mx-auto">
                                        <img src={frontPageBase64} alt="Portada" className="rounded-3xl border" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-outline btn-accent rounded-3xl w-1/5 my-10">
                        Crear Audiolibro
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

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
    deweyIndex: string;
    authorId: string;
    pdfFile: File | null;
    bookCover: string;
}

export default function CreateBook() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        isbn10: "",
        isbn13: "",
        published: "",
        edition: "",
        deweyIndex: "",
        authorId: "",
        pdfFile: null,
        bookCover: "",
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookCoverBase64, setBookCoverBase64] = useState("");
    const [selectedPdfName, setSelectedPdfName] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = event.target;
        if (name === "pdfFile" && files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleBase64Generated = (base64: string) => {
        setBookCoverBase64(base64);
        setFormData({ ...formData, bookCover: base64 });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (value) {
                formDataToSend.append(key, value as Blob | string);
            }
        });

        try {
            const response = await fetch("http://localhost:5125/api/Book/CreateBook", {
                method: "POST",
                body: formDataToSend,
            });

            if (!response.ok) {
                const responseText = await response.text();
                setErrorMessage(`Error al crear el libro: ${responseText}`);
                setIsModalOpen(true);
                return;
            }

            alert("Libro creado exitosamente");
            setFormData({
                name: "",
                isbn10: "",
                isbn13: "",
                published: "",
                edition: "",
                deweyIndex: "",
                authorId: "",
                pdfFile: null,
                bookCover: "",
            });
        } catch (error) {
            setErrorMessage("Error inesperado al conectar con el servidor.");
            setIsModalOpen(true);
        }
    };

    const handlePdfChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedPdfName(file.name);
            handleInputChange(event);
        }
    };

    return (
        <div className="bg-slate-100 pt-28">
            <Navbar />
            <div className="container mx-auto my-20">
                <form onSubmit={handleSubmit} className="mx-20 bg-white shadow-md rounded-lg p-6 text-center">
                    <h2 className="text-2xl font-bold mb-4 text-slate-700">Crear Libro</h2>
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
                                    placeholder="ISBN10"
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
                                    name="deweyIndex"
                                    value={formData.deweyIndex}
                                    onChange={handleInputChange}
                                    className="grow"
                                    placeholder="Índice Dewey"
                                    required
                                />
                            </label>
                            <label className="input rounded-3xl w-full bg-white border border-neutral-600 flex items-center">
                                <input
                                    type="text"
                                    name="authorId"
                                    value={formData.authorId}
                                    onChange={handleInputChange}
                                    className="grow"
                                    placeholder="ID del Autor"
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label className="rounded-3xl w-full bg-white flex items-center">
                                <input
                                    type="file"
                                    name="pdfFile"
                                    onChange={handlePdfChange}
                                    className="hidden"
                                    accept=".pdf"
                                />
                                <span className="btn btn-outline btn-primary cursor-pointer w-full text-center py-2 rounded-3xl">
                                    {selectedPdfName || 'Seleccionar PDF'}
                                </span>
                            </label>
                            <div className="flex flex-col items-center my-10">
                                <ImageToBase64 onBase64Generated={handleBase64Generated} />
                                {bookCoverBase64 && (
                                    <div className="mt-4 max-w-lg mx-auto">
                                        <img src={bookCoverBase64} alt="Portada" className="rounded-3xl border" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-outline btn-accent rounded-3xl w-1/5 my-10">
                        Crear Libro
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

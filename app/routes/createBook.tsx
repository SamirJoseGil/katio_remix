import { ChangeEvent, useState } from "react";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { ImageToBase64 } from "~/components/Base64Util";

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
      bookCover: ""
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookCoverBase64, setBookCoverBase64] = useState("");

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

        // Agregar todos los campos al FormData
        Object.entries(formData).forEach(([key, value]) => {
            if (value) {
                formDataToSend.append(key, value as Blob | string);
            }
        });

        for (let [key, value] of formDataToSend.entries()) {
            console.log(`${key}: ${value}`);
        }
        

        try {
            const response = await fetch("http://localhost:5125/api/Book/CreateBook", {
                method: "POST",
                body: formDataToSend,
            });

            if (!response.ok) {
                const responseText = await response.text();
                console.error("Error del servidor:", response.status, responseText);
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
            console.error("Error de conexión:", error);
            setErrorMessage("Error inesperado al conectar con el servidor.");
            setIsModalOpen(true);
        }
    };

    return (
        <div className="bg-slate-100 pt-16">
            <Navbar />
            <div className="container mx-auto my-20">
                <form onSubmit={handleSubmit} className="mx-20 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Crear Libro</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">ISBN</label>
                                <input
                                    type="text"
                                    name="isbn10"
                                    value={formData.isbn10}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">ISBN13</label>
                                <input
                                    type="text"
                                    name="isbn13"
                                    value={formData.isbn13}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Fecha de Publicación</label>
                                <input
                                    type="date"
                                    name="published"
                                    value={formData.published}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Edición</label>
                                <input
                                    type="text"
                                    name="edition"
                                    value={formData.edition}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Índice Dewey</label>
                                <input
                                    type="text"
                                    name="deweyIndex"
                                    value={formData.deweyIndex}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Autor ID</label>
                                <input
                                    type="text"
                                    name="authorId"
                                    value={formData.authorId}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Archivo PDF</label>
                                <input
                                    type="file"
                                    name="pdfFile"
                                    accept="application/pdf"
                                    onChange={handleInputChange}
                                    className="file-input file-input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Portada</label>
                                <ImageToBase64 onBase64Generated={handleBase64Generated} />
                                {bookCoverBase64 && (
                                    <div>
                                        <img src={bookCoverBase64} alt="Portada" className="mt-4" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
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

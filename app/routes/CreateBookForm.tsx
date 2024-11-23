import { Form } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";

export default function CreateBook() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-auto max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">Crear Libro</h1>
                <Form method="post" encType="multipart/form-data">
                    <div className="form-control mb-4">
                        <label className="label">Nombre</label>
                        <input type="text" name="name" placeholder="Nombre del libro" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">ISBN10</label>
                        <input type="text" name="isbn10" placeholder="ISBN-10" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">ISBN13</label>
                        <input type="text" name="isbn13" placeholder="ISBN-13" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">Fecha de Publicación</label>
                        <input type="date" name="published" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">Edición</label>
                        <input type="text" name="edition" placeholder="Edición" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">Índice Dewey</label>
                        <input type="text" name="dewey" placeholder="Índice Dewey" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">Autor ID</label>
                        <input type="text" name="authorId" placeholder="Author id" className="input input-bordered" required />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">Archivo PDF</label>
                        <input type="file" name="pdfFile" accept="application/pdf" className="file-input file-input-bordered" required />
                    </div>
                    <div className="form-control">
                        <button type="submit" className="btn btn-primary w-full">Crear</button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export const action = async ({ request }: { request: Request }) => {
    const formData = await request.formData();

    try {
        const response = await fetch("http://localhost:5125/api/Book/CreateBook", {
            method: "POST",
            body: formData,
        });

        const responseText = await response.text(); // Logs detallados
        console.log("Respuesta del servidor:", responseText);

        if (!response.ok) {
            console.error("Error del servidor:", response.status, responseText);
            return json({ error: `Error al crear el libro: ${responseText}` }, { status: response.status });
        }

        return redirect("/CreateBookForm");
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        return json({ error: "Error inesperado al conectar con el servidor" }, { status: 500 });
    }
};
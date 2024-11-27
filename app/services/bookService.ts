export async function getAllBooks() {
    const response = await fetch("http://localhost:5125/api/Book/GetBooks");
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const book = await response.json();
    return book;
}

export async function search(searchTerm: string) {
    const response = await fetch(`http://localhost:5125/api/Book/SearchBook?searchTerm=${searchTerm}`);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const book = await response.json();
    return book;
}

export async function getBookByName(name: string) {
    const response = await fetch(`http://localhost:5125/api/Book/GetBookByName?name=${name}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const book = await response.json();
    return book;
}

export async function getBookById(id: number) {
    const response = await fetch(`http://localhost:5125/api/Book/GetBookById?Id=${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const book = await response.json();
    return book;
}

export async function createBook(formData: FormData) {
    const response = await fetch("http://localhost:5125/api/Book/CreateBook", {
        method: "POST",
        body: formData,
    });

    const responseText = await response.text();

    if (!response.ok) {
        console.error("Error del servidor:", response.status, responseText);
        throw new Error(`Error al crear el libro: ${responseText}`);
    }

    return responseText;
}

export async function getByAuthorId(id: number) {
    const response = await fetch(`http://localhost:5125/api/Book/GetBookByAuthor?AuthorId=${id}`);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const book = await response.json();
    return book;
}
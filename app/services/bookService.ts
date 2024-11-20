export async function getAllBooks() {
    const response = await fetch("http://localhost:5125/api/Book/GetBooks");
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    console.log(response);
    const book = await response.json();
    return book;
}

export async function search(searchTerm: string) {
    const response = await fetch(`http://localhost:5125/api/Book/SearchBook?searchTerm=${searchTerm}`, {
    });
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
    const response = await fetch(`http://localhost:5125/api/Book/GetBookById?Id=${id}`)
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const book = await response.json();
    return book
}
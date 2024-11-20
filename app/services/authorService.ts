export async function getAllAuthors() {
    const response = await fetch("http://localhost:5125/api/Author/GetAuthors");
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const authors = await response.json();
    return authors;
}

export async function search(searchTerm: string) {
    const response = await fetch(`http://localhost:5125/api/Author/search?searchTerm=${searchTerm}`, {
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const author = await response.json();
    return author;
}

export async function getAuthorByName(name: string) {
    const response = await fetch(`http://localhost:5125/api/Author/GetAuthorByName?name=${name}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const author = await response.json();
    return author;
}

export async function getAuthorById(id: number) {
    const response = await fetch(`http://localhost:5125/api/Author/GetAuthorById?Id=${id}`)
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const author = await response.json();
    return author
}
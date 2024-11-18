export async function getAllBooks()
{
    const books = fetch("http://localhost:5170/api/Books/index");
    return books;
}
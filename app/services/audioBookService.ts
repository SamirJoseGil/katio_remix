export async function getAllAudioBooks() {
    const response = await fetch("http://localhost:5125/api/AudioBook/GetAudioBooks");
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const audioBooks = await response.json();
    return audioBooks;
}

export async function search(searchTerm: string) {
    const response = await fetch(`http://localhost:5125/api/AudioBook/SearchAudioBook?searchTerm=${searchTerm}`, {
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const audioBook = await response.json();
    return audioBook;
}

export async function getAudioBookByName(name: string) {
    const response = await fetch(`http://localhost:5125/api/AudioBook/GetAudioBookByName?name=${name}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const audioBook = await response.json();
    return audioBook;
}

export async function getAudioBookById(id: number) {
    const response = await fetch(`http://localhost:5125/api/AudioBook/FindAudioBookById?id=${id}`)
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const audioBook = await response.json();
    return audioBook
}

export async function getAudioBookByNarratorId(id: number) {
    const response = await fetch(`http://localhost:5125/api/AudioBook/FindAudioBookByNarrator?narratorId=${id}`, {
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const audioBook = await response.json();
    return audioBook;
}
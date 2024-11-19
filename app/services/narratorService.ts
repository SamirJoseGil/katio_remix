export async function getAllNarrators() {
    const response = await fetch("http://localhost:5125/api/Narrator/GetNarrators");
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const narrators = await response.json();
    return narrators;
}

export async function search(searchTerm: string) {
    const response = await fetch(`http://localhost:5125/api/Narrator/search?searchTerm=${searchTerm}`, {
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const narrator = await response.json();
    return narrator;
}

export async function getNarratorByName(name: string) {
    const response = await fetch(`http://localhost:5125/api/Narrator/GetNarratorByName?name=${name}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const narrator = await response.json();
    return narrator;
}

export async function getNarratorById(id: number) {
    const response = await fetch(`http://localhost:5125/api/Narrator/GetNarratorById?Id=${id}`)
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const narrator = await response.json();
    return narrator
}
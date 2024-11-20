export interface Data<T> {
    message: string;
    statusCode: string;
    totalElements: number;
    responseElements: T[];
} 

export interface Author {
    id: number;
    name: string;
    lastName: string;
    country: string;
    birthDate: string;
    profilePicture: string;
    biography: string;
}

<<<<<<< Updated upstream
=======
export interface Book {
    id: number;
    name: string;
    isbN10: string;
    isbN13: string;
    edition: string;
    published: string;
    bookCover: string;
}

>>>>>>> Stashed changes
export interface Narrator {
    id: number;
    name: string;
    lastName: string;
    genre: string;
}

export interface Audiobook {
    id: number;
    name: string;
    isbN10: string;
    isbN13: string;
    published: string;
    edition: string;
    genre: string;
    lenghtInSeconds: number;
    path: string;
    frontPage: string;
}
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

export interface Book {
    id: number;
    name: string;
    isbN10: string;
    isbN13: string;
    edition: string;
    published: string;
    bookCover: string;
    authorId: number;
    author: Author;
    description: string;
}

export interface Narrator {
    id: number;
    name: string;
    lastName: string;
    genre: string;
    profilePicture: string;
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
    frontPage: string;
    narratorId: number;
    narrator: Narrator;
}
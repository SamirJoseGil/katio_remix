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
}

export interface Narrator {
    id: number;
    name: string;
    lastName: string;
    genre: string;
}

export interface Audiobook {
    id: number;
    name: string;
    isbn10: string;
    isbn13: string;
    published: string;
    edition: string;
    genre: string;
    lenghtInSeconds: number;
    path: string;
    frontPage: string;
}
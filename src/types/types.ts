export interface Book {
  id: string;
  book_title: string;
  author: string;
  genre: string;
  publication_date: string;
  price: number;
}

export interface Filters {
  book_title: string;
  author: string;
  genre: string;
}

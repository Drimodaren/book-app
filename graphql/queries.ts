import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      book_title
      author
      genre
      publication_date
      price
    }
  }
`;
export const ADD_BOOK = gql`
  mutation AddBook(
    $book_title: String!
    $author: String!
    $genre: String!
    $publication_date: String!
    $price: Float!
  ) {
    addBook(
      book_title: $book_title
      author: $author
      genre: $genre
      publication_date: $publication_date
      price: $price
    ) {
      id
      book_title
      author
      genre
      publication_date
      price
    }
  }
`;

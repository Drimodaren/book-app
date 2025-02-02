import { ApolloServer, gql } from 'apollo-server';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { nanoid } from 'nanoid';
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const booksFile = path.join(__dirname, 'books.json');

const loadBooks = () => JSON.parse(fs.readFileSync(booksFile, 'utf8'));
const saveBooks = (books) => fs.writeFileSync(booksFile, JSON.stringify({ books }, null, 2));

const typeDefs = gql`
  type Book {
    id: ID!
    book_title: String!
    author: String!
    genre: String!
    publication_date: String!
    price: Float!
  }

  input BookInput {
    book_title: String!
    author: String!
    genre: String!
    publication_date: String!
    price: Float!
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
  }

  type Mutation {
    addBook(book: BookInput!): Book!
    updateBook(id: ID!, book: BookInput!): Book!
    deleteBook(id: ID!): ID!
  }
`;

const resolvers = {
  Query: {
    books: () => loadBooks().books,
    book: (_, { id }) => _.find(loadBooks().books, { id }),
  },
  Mutation: {
    addBook: (_, { book }) => {
      console.log('Получен запрос addBook:', book);

      if (!book.book_title || !book.author || !book.genre || !book.price) {
        throw new Error('Все поля обязательны!');
      }

      const books = loadBooks().books;
      const newBook = { id: nanoid(), ...book };
      books.push(newBook);
      saveBooks(books);
      console.log('Книга добавлена:', newBook);
      return newBook;
    },
    updateBook: (_, { id, book }) => {
      let books = loadBooks().books;
      const bookIndex = books.findIndex((b) => b.id === id);
      if (bookIndex === -1) return null;

      books[bookIndex] = { ...books[bookIndex], ...book };
      saveBooks(books);
      return books[bookIndex];
    },
    deleteBook: (_, { id }) => {
      let books = loadBooks().books;
      const bookIndex = books.findIndex((b) => b.id === id);
      if (bookIndex === -1) return null;

      saveBooks(books);
      return id;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

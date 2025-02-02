import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { gql } from '@apollo/client';
import client from '../apolloClient.ts';
import { Book, Filters } from '../types/types.ts';

interface BooksState {
  books: Book[];
  loading: boolean;
  filters?: Filters;
  error?: string;
}

const initialState: BooksState = {
  books: [],
  loading: true,
  filters: {
    book_title: '',
    author: '',
    genre: 'Все жанры',
  },
};

const GET_BOOKS = gql`
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

const ADD_BOOK = gql`
  mutation AddBook($book: BookInput!) {
    addBook(book: $book) {
      id
      book_title
      author
      genre
      publication_date
      price
    }
  }
`;

const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;

const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $book: BookInput!) {
    updateBook(id: $id, book: $book) {
      id
      book_title
      author
      genre
      publication_date
      price
    }
  }
`;

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const { data } = await client.query({ query: GET_BOOKS });
  return data.books;
});

export const addBook = createAsyncThunk(
  'books/addBook',
  async (book: Omit<Book, 'id'>, { rejectWithValue }) => {
    try {
      const { data } = await client.mutate({
        mutation: ADD_BOOK,
        variables: { book },
      });
      return data.addBook;
    } catch (error: unknown) {
      console.error('Ошибка при добавлении книги:', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error');
    }
  },
);

export const deleteBook = createAsyncThunk('books/deleteBook', async (id: string) => {
  await client.mutate({
    mutation: DELETE_BOOK,
    variables: { id },
  });
  return id;
});

export const updateBook = createAsyncThunk(
  'books/updateBook',
  async ({ id, book }: { id: string; book: Book }) => {
    const { data } = await client.mutate({
      mutation: UPDATE_BOOK,
      variables: { id, book },
    });
    return data.updateBook;
  },
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(addBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.books.push(action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteBook.fulfilled, (state, action: PayloadAction<string>) => {
        state.books = state.books.filter((book) => book.id !== action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action: PayloadAction<Book>) => {
        const index = state.books.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      });
  },
});

export const { setFilters } = booksSlice.actions;
export default booksSlice.reducer;

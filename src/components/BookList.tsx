import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store.ts';
import { fetchBooks } from '../store/booksSlice.ts';
import { Button, Row, Col, Spin } from 'antd';
import BookCard from './BookCard.tsx';
import BookModalDelete from './BookModalDelete.tsx';
import BookFilters from './BookFilters.tsx';

const BookList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { books, loading, filters } = useSelector((state: RootState) => state.books);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const filteredBooks = books.filter((book) => {
    const { book_title = '', author = '', genre = 'Все жанры' } = filters ?? {};
    return (
      book.book_title.toLowerCase().includes(book_title.toLowerCase()) &&
      book.author.toLowerCase().includes(author.toLowerCase()) &&
      (genre === 'Все жанры' || book.genre === genre)
    );
  });

  return (
    <>
      <Button type="primary" onClick={() => setModalOpen(true)} style={{ marginBottom: '20px' }}>
        Добавить книгу
      </Button>
      <BookFilters />

      {loading ? (
        <Spin size="large" />
      ) : filteredBooks.length > 0 ? (
        <Row gutter={[16, 16]}>
          {filteredBooks.map((book) => (
            <Col key={book.id} xs={24} sm={12} md={8} lg={6}>
              <BookCard book={book} />
            </Col>
          ))}
        </Row>
      ) : (
        <p style={{ textAlign: 'center' }}>Книги не найдены</p>
      )}

      <BookModalDelete open={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default BookList;

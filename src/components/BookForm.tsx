import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { Form, Input, Button } from 'antd';
import { Book } from '../types/types.ts';

const ADD_BOOK = gql`
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
    }
  }
`;

const BookForm: React.FC = () => {
  const [addBook] = useMutation<{ addBook: Book }>(ADD_BOOK);

  const onFinish = (values: Omit<Book, 'id'>) => {
    addBook({ variables: values });
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="book_title" label="Название" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="author" label="Автор" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="genre" label="Жанр" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="publication_date" label="Дата публикации" rules={[{ required: true }]}>
        <Input type="date" />
      </Form.Item>
      <Form.Item name="price" label="Цена" rules={[{ required: true }]}>
        <Input type="number" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Добавить книгу
      </Button>
    </Form>
  );
};

export default BookForm;

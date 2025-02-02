import React, { useState } from 'react';
import { Card, Button, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store.ts';
import { deleteBook } from '../store/booksSlice.ts';
import { Book } from '../types/types.ts';
import EditBookModal from './EditBookModal.tsx';
import {
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  return (
    <>
      <Card
        title={<Text strong>{book.book_title}</Text>}
        style={{
          width: 320,
          borderRadius: '10px',
          background: '#fdfdfd',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.2s',
        }}
        hoverable
        actions={[
          <Button
            key="edit"
            type="link"
            icon={<EditOutlined />}
            onClick={() => setEditModalOpen(true)}
            style={{ color: '#1890ff', fontWeight: 'bold' }}
          >
            Редактировать
          </Button>,
          <Button
            key="delete"
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => dispatch(deleteBook(book.id))}
            style={{ fontWeight: 'bold' }}
          >
            Удалить
          </Button>,
        ]}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <UserOutlined style={{ marginRight: 8, color: '#1890ff', fontSize: '16px' }} />
          <Text>
            <b>Автор:</b> {book.author}
          </Text>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <BookOutlined style={{ marginRight: 8, color: '#52c41a', fontSize: '16px' }} />
          <Text>
            <b>Жанр:</b> {book.genre}
          </Text>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CalendarOutlined style={{ marginRight: 8, color: '#faad14', fontSize: '16px' }} />
          <Text>
            <b>Год:</b> {book.publication_date}
          </Text>
        </div>
      </Card>

      <EditBookModal book={book} open={isEditModalOpen} onClose={() => setEditModalOpen(false)} />
    </>
  );
};

export default BookCard;

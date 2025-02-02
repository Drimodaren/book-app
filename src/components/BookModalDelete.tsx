import React from 'react';
import { Modal, Form, Input, Button, message, DatePicker, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store.ts';
import { addBook } from '../store/booksSlice.ts';
import dayjs from 'dayjs';

interface Props {
  open: boolean;
  onClose: () => void;
}

const BookModalDelete: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const error = useSelector((state: RootState) => state.books.error);

  const onFinish = async (values: {
    book_title: string;
    author: string;
    genre: string;
    publication_date: dayjs.Dayjs;
    price: number;
  }) => {
    try {
      const newBook = {
        book_title: values.book_title,
        author: values.author,
        genre: values.genre,
        publication_date: values.publication_date.format('YYYY-MM-DD'), // Преобразуем в строку
        price: values.price,
      };

      await dispatch(addBook(newBook)).unwrap();
      message.success('Книга успешно добавлена!');
      form.resetFields();
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(`Ошибка при добавлении книги: ${error.message}`);
        console.error('Ошибка GraphQL:', error);
      } else {
        message.error('Неизвестная ошибка при добавлении книги');
        console.error('Неизвестная ошибка:', error);
      }
    }
  };

  return (
    <Modal title="Добавить книгу" open={open} onCancel={onClose} footer={null} destroyOnClose>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="Название книги"
          name="book_title"
          rules={[{ required: true, message: 'Введите название книги!' }]}
        >
          <Input placeholder="Введите название книги..." />
        </Form.Item>

        <Form.Item
          label="Автор"
          name="author"
          rules={[{ required: true, message: 'Введите имя автора!' }]}
        >
          <Input placeholder="Введите автора..." />
        </Form.Item>

        <Form.Item
          label="Жанр"
          name="genre"
          rules={[{ required: true, message: 'Выберите жанр!' }]}
        >
          <Select placeholder="Выберите жанр">
            <Select.Option value="Fiction">Художественная литература</Select.Option>
            <Select.Option value="Non-Fiction">Документальная</Select.Option>
            <Select.Option value="Science Fiction">Фантастика</Select.Option>
            <Select.Option value="Mystery">Детектив</Select.Option>
            <Select.Option value="Romance">Роман</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Дата публикации"
          name="publication_date"
          rules={[{ required: true, message: 'Выберите дату!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Цена"
          name="price"
          rules={[
            { required: true, message: 'Введите цену!' },
            { type: 'number', min: 0, message: 'Цена должна быть положительной!' },
          ]}
        >
          <Input type="number" placeholder="Введите цену..." />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Сохранить
        </Button>
      </Form>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </Modal>
  );
};

export default BookModalDelete;

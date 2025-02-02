import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store.ts';
import { updateBook } from '../store/booksSlice.ts';
import { Book } from '../types/types.ts';

interface Props {
  open: boolean;
  onClose: () => void;
  book: Book;
}

const EditBookModal: React.FC<Props> = ({ open, onClose, book }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.setFieldsValue(book);
    }
  }, [open, book, form]);

  const onFinish = async (values: Book) => {
    try {
      await dispatch(updateBook({ id: book.id, book: values })).unwrap();
      message.success('Книга успешно обновлена!');
      form.resetFields();
      onClose();
    } catch (error) {
      message.error('Ошибка при обновлении книги!');
      console.error('Ошибка GraphQL:', error);
    }
  };

  return (
    <Modal title="Редактировать книгу" open={open} onCancel={onClose} footer={null}>
      <Form layout="vertical" form={form} onFinish={onFinish} initialValues={book}>
        <Form.Item
          label="Название книги"
          name="book_title"
          rules={[{ required: true, message: 'Пожалуйста, введите название книги' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Автор"
          name="author"
          rules={[{ required: true, message: 'Пожалуйста, введите автора' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Жанр"
          name="genre"
          rules={[{ required: true, message: 'Пожалуйста, введите жанр' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Дата публикации"
          name="publication_date"
          rules={[{ required: true, message: 'Пожалуйста, введите дату публикации' }]}
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item
          label="Цена"
          name="price"
          rules={[{ required: true, message: 'Пожалуйста, введите цену' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Сохранить
        </Button>
      </Form>
    </Modal>
  );
};

export default EditBookModal;

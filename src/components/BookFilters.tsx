import React, { useState } from 'react';
import { Input, Select, Button, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/booksSlice.ts';

const { Option } = Select;

const genres = ['Все жанры', 'Fiction', 'Non-Fiction', 'Science Fiction', 'Romance', 'Mystery'];

const BookFilters: React.FC = () => {
  const dispatch = useDispatch();
  const [filters, setLocalFilters] = useState({
    book_title: '',
    author: '',
    genre: 'Все жанры',
  });

  const handleChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setLocalFilters(newFilters);
    dispatch(setFilters(newFilters));
  };

  const resetFilters = () => {
    const defaultFilters = { book_title: '', author: '', genre: 'Все жанры' };
    setLocalFilters(defaultFilters);
    dispatch(setFilters(defaultFilters));
  };

  return (
    <Row gutter={[16, 16]} style={styles.container}>
      <Col xs={24} sm={8}>
        <Input
          placeholder="Поиск по названию"
          value={filters.book_title}
          onChange={(e) => handleChange('book_title', e.target.value)}
        />
      </Col>
      <Col xs={24} sm={8}>
        <Input
          placeholder="Поиск по автору"
          value={filters.author}
          onChange={(e) => handleChange('author', e.target.value)}
        />
      </Col>
      <Col xs={24} sm={6}>
        <Select
          style={{ width: '100%' }}
          value={filters.genre}
          onChange={(value) => handleChange('genre', value)}
        >
          {genres.map((genre) => (
            <Option key={genre} value={genre}>
              {genre}
            </Option>
          ))}
        </Select>
      </Col>
      <Col xs={24} sm={2}>
        <Button onClick={resetFilters} block danger>
          Сброс
        </Button>
      </Col>
    </Row>
  );
};

const styles = {
  container: {
    marginBottom: '20px',
  } as React.CSSProperties,
};

export default BookFilters;

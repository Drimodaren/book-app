import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import { Book } from '../types/types.ts';
import ReactECharts from 'echarts-for-react';

const Statistics: React.FC = () => {
  const books: Book[] = useSelector((state: RootState) => state.books.books);

  const genresCount = books.reduce(
    (acc, book) => {
      acc[book.genre] = (acc[book.genre] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const genresChart = {
    title: { text: 'Книги по жанрам' },
    xAxis: { type: 'category', data: Object.keys(genresCount) },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: Object.values(genresCount) }],
  };

  return <ReactECharts option={genresChart as any} />;
};

export default Statistics;

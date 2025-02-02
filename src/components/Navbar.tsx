import React, { useState } from 'react';
import { Menu, Button, Typography } from 'antd';
import { BookOutlined, BarChartOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  const items = [
    {
      key: '/home',
      label: (
        <Typography.Text style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOutlined /> Книги
        </Typography.Text>
      ),
    },
    {
      key: '/statistics',
      label: (
        <Typography.Text style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BarChartOutlined /> Статистика
        </Typography.Text>
      ),
    },
  ];
  const handleClick = (e: { key: string }) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={styles.navbar}>
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        style={styles.menu}
        items={items}
      />
      <Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout}>
        Выйти
      </Button>
    </div>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  } as React.CSSProperties,
  menu: {
    flexGrow: 1,
  } as React.CSSProperties,
};

export default Navbar;

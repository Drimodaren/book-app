import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values: { username: string; password: string }) => {
    setLoading(true);

    setTimeout(() => {
      if (values.username === 'admin' && values.password === '1234') {
        localStorage.setItem('token', 'mock_token_123456');
        message.success('Успешный вход!');
        navigate('/home');
      } else {
        message.error('Неверные данные! Попробуйте еще раз.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Title level={2} style={{ textAlign: 'center', color: '#1890ff' }}>
          Авторизация
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Имя пользователя"
            name="username"
            rules={[{ required: true, message: 'Введите имя пользователя!' }]}
          >
            <Input placeholder="имя для входа admin" />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Введите пароль!' }]}
          >
            <Input.Password placeholder="пароль для входа 1234" />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block>
            Войти
          </Button>
        </Form>
      </Card>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  } as React.CSSProperties,
  card: {
    width: 350,
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  } as React.CSSProperties,
};

export default Login;

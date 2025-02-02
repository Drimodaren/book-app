import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.tsx';
import AuthorizationPage from './pages/AuthorizationPage.tsx';
import Navbar from './components/Navbar.tsx';
import Statistics from './pages/Statistics.tsx';

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route path="/" element={<AuthorizationPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router future={{ v7_startTransition: true }}>
        <AppContent />
      </Router>
    </Provider>
  );
};

export default App;

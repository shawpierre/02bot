import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { WalletProvider } from './contexts/WalletContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ToastContainer } from './components/common/Toast/Toast';
import { Header } from './components/layout/Header/Header';
import { Loading } from './components/common/Loading/Loading';
import { HomePage } from './pages/HomePage/HomePage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { ConfessPage } from './pages/ConfessPage/ConfessPage';
import { ListenPage } from './pages/ListenPage/ListenPage';
import { SecretDetailPage } from './pages/SecretDetailPage/SecretDetailPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading fullscreen />;
  }

  if (!user && !isGuestMode()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Guest Route Component (redirect if logged in)
function GuestRoute({ children }: { children: React.ReactNode }) {
  const { user, isGuest, loading } = useAuth();

  if (loading) {
    return <Loading fullscreen />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

// Check if current mode is guest
function isGuestMode(): boolean {
  return sessionStorage.getItem('guest_mode') === 'true';
}

function AppRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
        />
        <Route
          path="/confess"
          element={
            <ProtectedRoute>
              <ConfessPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listen"
          element={
            <ProtectedRoute>
              <ListenPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/secret/:id"
          element={
            <ProtectedRoute>
              <SecretDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <WalletProvider>
            <NotificationProvider>
              <AppRoutes />
            </NotificationProvider>
          </WalletProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;

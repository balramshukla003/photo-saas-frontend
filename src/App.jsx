import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import LoginPage from './pages/LoginPage';
import PhotoPage from './pages/PhotoPage';
import ProfilePage from './pages/ProfilePage';
import { NotFoundPage } from './pages/ErrorPages';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Skip to main content — WCAG 2.1 criterion 2.4.1 */}
        <a href="#main-content" className="skip-link">Skip to main content</a>

        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected */}
          <Route
            path="/photo"
            element={
              <PrivateRoute>
                <PhotoPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          {/* Redirects */}
          <Route path="/"  element={<Navigate to="/photo" replace />} />
          <Route path="*"  element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLicense } from '../../hooks/useLicense';
import Topbar from '../layout/Topbar';

export default function PrivateRoute({ children }) {
  const { token, user } = useAuth();
  const { isActive, isExpired } = useLicense();
  const location = useLocation();

  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-dvh flex flex-col bg-surface-50">
      <Topbar />
      <main id="main-content" className="flex-1 w-full" tabIndex={-1}>
        {isExpired && (
          <div role="alert" aria-live="assertive" className="bg-danger-500 text-white text-center text-sm font-semibold py-2.5 px-4">
            ⚠ Your license has expired. Contact your administrator to renew.
          </div>
        )}
        {!isExpired && !isActive && (
          <div role="alert" aria-live="assertive" className="bg-warning-500 text-white text-center text-sm font-semibold py-2.5 px-4">
            ⚠ Your license is inactive. Please contact support.
          </div>
        )}
        {children}
      </main>
    </div>
  );
}

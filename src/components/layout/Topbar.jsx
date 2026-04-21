import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LicenseBadge } from '../ui/Feedback';
import { useLicense } from '../../hooks/useLicense';

export default function Topbar() {
  const { user, logout } = useAuth();
  const { isActive, isExpired, daysRemaining } = useLicense();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const navLinks = [
    { to: '/photo', label: 'Photo Print', icon: <CameraIcon /> },
    { to: '/profile', label: 'My Profile', icon: <UserIcon /> },
  ];

  const isActive_ = (to) => location.pathname === to;

  return (
    <header
      role="banner"
      className="topbar sticky top-0 z-50 w-full bg-white border-b border-ink-100 shadow-win-sm"
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4">

          {/* Logo */}
          <Link
            to="/photo"
            aria-label="PhotoPrint — Go to home"
            className="flex items-center gap-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded"
          >
            <span aria-hidden="true" className="flex items-center justify-center w-8 h-8 rounded-md bg-brand-700 text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </span>
            <span className="text-base font-bold text-ink-900 hidden xs:block">PhotoPrint</span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                aria-current={isActive_(to) ? 'page' : undefined}
                className={[
                  'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600',
                  isActive_(to)
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-ink-500 hover:text-ink-900 hover:bg-surface-100',
                ].join(' ')}
              >
                <span aria-hidden="true">{icon}</span>
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LicenseBadge isActive={isActive} isExpired={isExpired} daysRemaining={daysRemaining} />

            {/* User menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen(o => !o)}
                aria-expanded={menuOpen}
                aria-haspopup="true"
                aria-label={`User menu for ${user?.fullName || user?.email}`}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ink-700 hover:bg-surface-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              >
                <span aria-hidden="true" className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-700 text-white text-xs font-bold">
                  {(user?.fullName || user?.email || '?')[0].toUpperCase()}
                </span>
                <span className="hidden sm:block max-w-[120px] truncate font-semibold">{user?.fullName || user?.email}</span>
                <ChevronDown aria-hidden="true" />
              </button>

              {menuOpen && (
                <div
                  role="menu"
                  aria-label="User options"
                  className="absolute right-0 top-full mt-1 w-52 bg-white border border-ink-100 rounded-lg shadow-win-lg z-50 overflow-hidden animate-slide-up"
                  onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setMenuOpen(false); }}
                >
                  <div className="px-4 py-3 border-b border-ink-100">
                    <p className="text-xs text-ink-300 font-medium">Signed in as</p>
                    <p className="text-sm text-ink-900 font-semibold truncate mt-0.5">{user?.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-ink-700 hover:bg-surface-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                  >
                    <UserIcon aria-hidden="true" /> My Profile
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-danger-700 hover:bg-danger-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger-500"
                  >
                    <LogoutIcon aria-hidden="true" /> Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Toggle navigation"
              className="md:hidden p-2 rounded-md text-ink-500 hover:text-ink-900 hover:bg-surface-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              aria-expanded={menuOpen}
            >
              <HamburgerIcon aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <nav
        aria-label="Mobile navigation"
        className={`md:hidden border-t border-ink-100 bg-white transition-all duration-200 ${menuOpen ? 'block' : 'hidden'}`}
      >
        {navLinks.map(({ to, label, icon }) => (
          <Link
            key={to}
            to={to}
            aria-current={isActive_(to) ? 'page' : undefined}
            onClick={() => setMenuOpen(false)}
            className={[
              'flex items-center gap-3 w-full px-6 py-3.5 text-sm font-semibold border-b border-ink-100/50',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-600',
              isActive_(to) ? 'text-brand-700 bg-brand-50' : 'text-ink-700 hover:bg-surface-50',
            ].join(' ')}
          >
            <span aria-hidden="true">{icon}</span>
            {label}
          </Link>
        ))}
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-6 py-3.5 text-sm font-semibold text-danger-700 hover:bg-danger-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-danger-500"
        >
          <LogoutIcon aria-hidden="true" /> Sign Out
        </button>
      </nav>
    </header>
  );
}

const CameraIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const UserIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const LogoutIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const ChevronDown = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>;
const HamburgerIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;

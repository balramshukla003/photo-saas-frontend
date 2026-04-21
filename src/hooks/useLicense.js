import { useAuth } from '../context/AuthContext';

export function useLicense() {
  const { user, isLicenseActive } = useAuth();
  const license = user?.license;

  return {
    isActive:      isLicenseActive,
    isExpired:     license?.isExpired ?? true,
    daysRemaining: license?.daysRemaining ?? 0,
    plan:          license?.plan ?? '-',
    expiresAt:     license?.expiresAt ?? null,
    issuedAt:      license?.issuedAt ?? null,
    isWarning:     !license?.isExpired && (license?.daysRemaining ?? 0) <= 7,
  };
}

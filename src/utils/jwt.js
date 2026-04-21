// ── JWT decode (no external lib) ─────────────────────────────────────────
export function decodeJwt(token) {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export function isTokenExpired(token) {
  const payload = decodeJwt(token);
  if (!payload?.exp) return true;
  return Date.now() >= payload.exp * 1000;
}

// ── Extract user from JWT claims ──────────────────────────────────────────
export function extractUserFromToken(token) {
  const p = decodeJwt(token);
  if (!p) return null;

  const expiresAt    = new Date(p.license_expires);
  const issuedAt     = new Date(p.license_issued);
  const now          = new Date();
  const isExpired    = expiresAt < now;
  const isActive     = p.license_active === 'true' && !isExpired;
  const daysRemaining = isExpired ? 0 : Math.floor((expiresAt - now) / 86400000);

  return {
    id:       p.sub,
    email:    p.email,
    fullName: p.full_name,
    license: {
      isActive,
      plan:         p.license_plan,
      issuedAt,
      expiresAt,
      isExpired,
      daysRemaining,
    },
  };
}

// ── Format date ───────────────────────────────────────────────────────────
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

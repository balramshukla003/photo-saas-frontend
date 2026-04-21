const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7001';

// ── Core fetch wrapper ────────────────────────────────────────────────────
async function request(path, options = {}, token = null) {
  const headers = { ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  // Handle 401/403 globally
  if (res.status === 401 || res.status === 403) {
    const data = await res.json().catch(() => ({}));
    throw new ApiError(res.status, data.message || 'Access denied.');
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new ApiError(res.status, data.message || 'Request failed.');
  }

  // Handle empty body (204)
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

// ── Auth ──────────────────────────────────────────────────────────────────
export const authApi = {
  login: (email, password) =>
    request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
};

// ── User ──────────────────────────────────────────────────────────────────
export const userApi = {
  profile: (token) => request('/api/user/profile', {}, token),
};

// ── Photo ─────────────────────────────────────────────────────────────────
export const photoApi = {
  process: (file, token) => {
    const form = new FormData();
    form.append('file', file);
    return request('/api/photo/process', { method: 'POST', body: form }, token);
  },
};

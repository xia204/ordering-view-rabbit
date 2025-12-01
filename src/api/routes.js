// Centralized API route definitions

// Base URLs - adjust these as needed
export const API_BASES = {
  AUTH: 'https://ms-auth-17nt.onrender.com/api',
  ORDERS: 'https://localhost:7224/api/v1',
  SIGNAL: 'https://localhost:7229',
  PRODUCTS: 'https://localhost:7229/api/v1',
  // Add other base URLs here: PAYMENTS, MESSAGES, etc
}

// Endpoints
export const API_ROUTES = {
  AUTH: {
    LOGIN: `${API_BASES.AUTH}/Auth/login`,
    // Add other auth endpoints as necessary, e.g. register, refresh
  },
  ORDER: {
    CREATE: `${API_BASES.ORDERS}/Order`,
    GET_BY_ID: (id) => `${API_BASES.ORDERS}/Order/${id}`,
    LIST: `${API_BASES.ORDERS}/Order`,
    // Add other order endpoints
  },
  PRODUCTS: {
    CREATE: `${API_BASES.PRODUCTS}/Order`,
    LIST: `${API_BASES.PRODUCTS}/Product`,
    DETAIL: (id) => `${API_BASES.PRODUCTS}/Product/${id}`,
  },
}

// Default export for convenience
export default API_ROUTES

export const DEFAULT_HOME_REDIRECT = '/home';

export const publicRoutes = new Set([
  '/login',
  '/welcome',
  '/register',
  '/forget',
  '/login',
  '/category',
  '/about',
  '/product',
  '/thank-you',
  '/category',
]);

export const protectRoute = new Set(['/lk', '/checkout']);
export const apiAuthPrefix = '/api/auth';

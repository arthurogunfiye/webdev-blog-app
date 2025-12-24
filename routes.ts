export const publicRoutes = [
  '/',
  '/email-verification',
  '/password-email-form',
  '/password-reset-form',
  /^\/blog\/posts\/\d+$/,
  /^\/blog\/details\/[\w-]+$/
];
export const authRoutes = ['/login', '/register'];
export const apiAuthPrefix = '/api/auth';
export const LOGIN_REDIRECT = '/blog/posts/1';

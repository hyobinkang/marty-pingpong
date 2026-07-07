// Basic Auth gate for the private A24 demo deployment.
// Vercel runs this on every request before serving index.html.
// Credentials: id "a24" / password below — change PASS before deploying.

const USER = 'a24';
const PASS = 'supreme1952';

export const config = {
  matcher: '/(.*)',
};

export default function middleware(req) {
  const auth = req.headers.get('authorization') || '';
  const expected = 'Basic ' + btoa(USER + ':' + PASS);

  if (auth === expected) {
    return; // authenticated — let the request through
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Marty Supreme Demo"',
      'Cache-Control': 'no-store',
    },
  });
}

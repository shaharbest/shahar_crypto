import { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import { useUser, useLoggingIn } from './hooks/users';
import AppLayout from './layout';

const Home = lazy(() => import('./pages/home'));
const Coins = lazy(() => import('./pages/coins'));
const TodoList = lazy(() => import('./pages/todos'));
const Login = lazy(() => import('./pages/login'));

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const loggingIn = useLoggingIn();

  if (loggingIn || user === undefined) return <div>Logging in...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AppLayout />
      </Suspense>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/coins', element: <Coins /> },
      {
        path: '/todos',
        element: (
          <ProtectedRoute>
            <TodoList />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;

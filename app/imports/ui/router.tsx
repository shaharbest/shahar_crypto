import { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import { useUser, useLoggingIn } from './hooks/users';
import AppLayout from './layout';

const Home = lazy(() => import('./pages/home'));
const TodoList = lazy(() => import('./pages/todos'));
const Boards = lazy(() => import('./pages/colabBoards'));
const Board = lazy(() => import('./pages/colabBoard'));
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
      { path: 'login', element: <Login /> },
      {
        path: "boards",
        children: [
          { index: true, element: <Boards /> },
          { path: ":id", element: <Board /> },
          { path: ':id/notes/:noteId', element: <Board /> },
        ],
      },
      {
        path: 'todos',
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

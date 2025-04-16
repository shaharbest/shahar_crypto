import { createBrowserRouter, Navigate } from 'react-router';
import AppLayout from './layout';
import Home from './pages/home';
import Coins from './pages/coins';
import TodoList from './pages/todos';
import Login from './pages/login';
import Register from './pages/register';
import { useUser } from './hooks/users';

const ProtectedRoute = ({ children }) => {
  const user = useUser();
  if (user === undefined) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/coins', element: <Coins /> },
      { path: '/todos', element: <ProtectedRoute><TodoList /></ProtectedRoute> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
]);

export default router;

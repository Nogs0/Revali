import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './lib/react-query';
import { Login } from './pages/login';
import { Homepage } from './pages/homepage';
import { Donation } from './pages/donation';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/authContext';
import ProtectedRoute from './components/protectedRoute';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/homepage',
    element: <ProtectedRoute element={<Homepage />} />
  },
  {
    path: '/homepage/donation',
    element: <ProtectedRoute element={<Donation />} />
  },
]);

export function App() {
  return (  
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster invert richColors />
      </AuthProvider>
    </QueryClientProvider>
  );
}

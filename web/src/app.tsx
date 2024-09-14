import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './lib/react-query';
import { Login } from './pages/login';
import { Homepage } from './pages/homepage';
import { Donation } from './pages/donation';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/authContext';
import ProtectedRoute from './components/protectedRoute';
import { Landingpage } from './pages/landingpage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Landingpage/>
  },
  {
    path: '/login',
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

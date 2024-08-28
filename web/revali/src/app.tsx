import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Login } from "./pages/login"
import { Homepage } from "./pages/homepage"
import { QueryClientProvider } from "react-query"
import { queryClient } from "./lib/react-query"
import { Donation } from "./pages/donation"
import { Toaster } from 'sonner'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Login/>
  },
  {
    path: '/homepage',
    element: <Homepage/>
  },
  {
    path: '/homepage/donation',
    element: <Donation/>
  },
])


export function App() {
  return(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
      <Toaster invert richColors />
    </QueryClientProvider>
  )  
}


import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Blog from './pages/Blog';
import Blogs from './pages/Blogs';
import Publish from './pages/Publish';
import { useAuthContext } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const { authUser } = useAuthContext(); // Get authUser from AuthContext
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" replace /> : <Signup />}
        />
        <Route
          path="/signin"
          element={authUser ? <Navigate to="/" replace /> : <Signin />}
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={authUser ? <Blogs /> : <Navigate to="/signin" replace />}
        />
        <Route
          path="/blog/:id"
          element={authUser ? <Blog /> : <Navigate to="/signin" replace />}
        />
        <Route
          path="/blogs"
          element={authUser ? <Blogs /> : <Navigate to="/signin" replace />}
        />
        <Route
          path="/publish"
          element={authUser ? <Publish /> : <Navigate to="/signin" replace />}
        />
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;


import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PostLogin from './pages/PostLogin';
import Login from './pages/Login';
import Register from './pages/Register';
import TrackingScreen from './pages/TrackingScreen';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PostLogin />
  },
  {
    path: 'tracking',
    element: <TrackingScreen />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }

])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;


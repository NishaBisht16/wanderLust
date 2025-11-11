import { Suspense, lazy } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from './store/Auth';
import Loader from './components/Loader/Loader';
import LoaderConnector from './components/Loader/LoaderConnector';
import { LoaderProvider } from './components/Loader/LoaderContext';

const HomeScreen = lazy(() => import('./pages/Home'));
const Show = lazy(() => import('./pages/Show'));
const CreateList = lazy(() => import('./pages/Create'));
const Edit = lazy(() => import('./pages/Edit'));
const ErrorPage = lazy(() => import('./pages/Error'));
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  return (
    <AuthProvider>
      <LoaderProvider>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <Loader />
          <LoaderConnector />

          <CustomRoutes />

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </GoogleOAuthProvider>
      </LoaderProvider>
    </AuthProvider>
  );
}

function CustomRoutes() {
  const { isToken } = useAuth();
  const token = isToken || localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/show/:id" element={token ? <Show /> : <Navigate to="/login" />} />
          <Route path="/create" element={token ? <CreateList /> : <Navigate to="/login" />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

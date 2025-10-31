import logo from './logo.svg';
import './App.css';
import HomeScreen from './pages/Home';
import Show from './pages/Show';
import CreateList from './pages/Create';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Edit from './pages/Edit';
import Error from './pages/Error';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { AuthProvider, useAuth } from './store/Auth';
import { Navigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from '@react-oauth/google';
const token = localStorage.getItem('token');

const CLIENT_ID= process.env.REACT_APP_GOOGLE_CLIENT_ID
console.log("client id",CLIENT_ID)




function App() {
  return (
 
      <AuthProvider>
        <GoogleOAuthProvider clientId='142893536267-mqkgjue0mrl6eehsdc5rtl2ap3f7apup.apps.googleusercontent.com'>
          <Customroute />
        </GoogleOAuthProvider>
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
      </AuthProvider>

  );
}

const Customroute = () => {
  const { isToken } = useAuth()
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeScreen />}></Route>
          <Route path='/show/:id' element={ token?<Show /> : <Navigate to="/login"/>}></Route>
          <Route path="/create" element={token ? <CreateList /> : <Navigate to="/login" />} />
          <Route path='/Edit' element={<Edit />}></Route>
          <Route path='/Error' element={<Error />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
          <Route path='/resetpassword/:token' element={<ResetPassword/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

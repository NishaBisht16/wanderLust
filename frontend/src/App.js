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
import { AuthProvider, useAuth } from './store/Auth';
import { Navigate } from 'react-router-dom';
const token = localStorage.getItem('token');


function App() {
  return (
    <AuthProvider>
      <Customroute />
    </AuthProvider>

  )

}

const Customroute = () => {
  const { isToken } = useAuth()
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeScreen />}></Route>
          <Route path='/show/:id' element={<Show />}></Route>
          <Route path="/create" element={token ? <CreateList /> : <Navigate to="/login" />} />
          <Route path='/Edit' element={<Edit />}></Route>
          <Route path='/Error' element={<Error />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

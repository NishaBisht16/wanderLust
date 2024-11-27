import logo from './logo.svg';
import './App.css';
import HomeScreen from './pages/Home';
import Show from './pages/Show';
import CreateList from './pages/Create';
import { Route,BrowserRouter, Routes} from 'react-router-dom';
import Edit from './pages/Edit';
import Error from './pages/Error';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
      <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeScreen/>}></Route>
        <Route path='/show/:id' element={<Show/>}></Route>
        <Route path='/create' element={<CreateList/>}></Route>
        <Route path='/Edit' element={<Edit/>}></Route>
        <Route path='/Error' element={<Error/>}></Route>
      </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;

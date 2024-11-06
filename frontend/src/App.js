import logo from './logo.svg';
import './App.css';
import HomeScreen from './pages/Home';
import Show from './pages/Show';
import CreateList from './pages/Create';
import { Route,BrowserRouter, Routes} from 'react-router-dom';

function App() {
  return (
      <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeScreen/>}></Route>
        <Route path='/show/:id' element={<Show/>}></Route>
        <Route path='/create' element={<CreateList/>}></Route>
      </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;

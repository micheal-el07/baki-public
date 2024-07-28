import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import LoginSignup from './Pages/LoginSignup.jsx';
import AddEdit from './Pages/AddEdit.jsx';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/loginsignup' element={<LoginSignup />} />
          <Route path='/add' element={<AddEdit category={"add"} />} />
          <Route path='/edit' element={<AddEdit category={"edit"} />}>
            <Route path=':transactionId' element={<AddEdit category={"edit"} />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

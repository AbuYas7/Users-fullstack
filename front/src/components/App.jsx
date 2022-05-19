import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Account from './Account/Account';
import './App.css';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import Users from './Users/Users';

function App() {
const token = useSelector((state) => state.application.token);


  if (token) {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
           <Route path='/people' element={<Users/>}/>
           <Route path="/" element={<Navigate to="/people"/>} />
           <Route path='/signin' element={<Navigate to='/'/>}/>
           <Route path='/user/:id' element={<Account/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
  } else {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
           <Route path='/' element={<SignUp/>}/>
           <Route path='/signin' element={<SignIn/>}/>
           <Route path='/people' element={<Users/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

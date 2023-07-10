import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Cars from './Cars';
import Login from './Login';
import Register from './Register';
import Add from './Add';

function App() {
  return (
      <div className="App vh-100 d-flex align-items-center justify-content-center">
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/cars" Component={Cars} />
            <Route path="/add" Component={Add} />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;

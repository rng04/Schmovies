import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import NoPage from './pages/NoPage' 
import Login from './pages/Login';
import DetailPage from './components/page/moviepage/DetailPage';
import Register from './pages/Register';
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from './context/userContext';
import Dashboard from './pages/Dashboard';

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Navbar/>
        <Toaster position='bottom-right' toastOptions={{duration: 2000}}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/> 
          <Route path="/about" element={<About/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/movies/:id" element={<DetailPage/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;

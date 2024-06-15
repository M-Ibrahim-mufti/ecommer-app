import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Authentication from './Views/Authentication/Authentication';
import Dashboard from './Views/Dashboard/Dashboard';
import Navbar from './Views/Dashboard/DashComponents/Navbar/Navbar'
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [current_user, setCurrent_User] = useState(JSON.parse(localStorage.getItem('User')))
    const tokenRefresh = async () => {
        const method = '/token-refresh';
        const url = process.env.REACT_APP_SERVER_URL + method

        axios.defaults.withCredentials = true;
        const response = await axios.get(url);
        console.log(response)
        if (response.data.success) {
            setCurrent_User(JSON.parse(localStorage.getItem('User')));
        } else {
            localStorage.clear();
        }
    }

    useEffect(() => {
        tokenRefresh();
    },[])
    return (
        <BrowserRouter>
            { current_user ? < Navbar user={current_user} /> : ''}  
            <Routes>
                <Route path='/' user={current_user}  element={current_user ? <Dashboard/> : <Navigate to='/Authentication'/>} ></Route>
                <Route path='/Authentication' element={!current_user ? <Authentication/> : <Navigate to="/" />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Authentication from './Views/Authentication/Authentication';
import Dashboard from './Views/Dashboard/Dashboard';
import Navbar from './Views/Dashboard/DashComponents/Navbar/Navbar'
import { useEffect, useState } from 'react';
import axios from 'axios';
import ShowAllProducts from './Views/Product/ShowAllProduct';
import Sidebar from './Views/Dashboard/DashComponents/Sidebar/sidebar';
import Cart from './Views/Dashboard/DashComponents/Cart/Cart';
import Profile from './Views/User/Profile/Profile';
import NewProduct from './Views/Product/NewProduct';

function App() {
    const [current_user, setCurrent_User] = useState(JSON.parse(localStorage.getItem('User')))
    const tokenRefresh = async () => {
        try {
            const method = '/token-refresh';
            const url = process.env.REACT_APP_SERVER_URL + method
            axios.defaults.withCredentials = true;
            const response = await axios.get(url);
            if (response.status === 200) {
                console.log(response.data.message)
                localStorage.setItem('User',JSON.stringify(response.data));
                setCurrent_User(JSON.parse(localStorage.getItem('User')));
            }
        } catch(err) {
            if (err.response) {
                if (err.response.status === 402) {
                    console.log(err.response.data.message);
                    localStorage.clear();
                    setCurrent_User(null)
                } else {
                    console.log("status", err.response.status);
                }
            }
        }
    }

    useEffect(() => {
        const tokenRefreshCall = setInterval(() =>{
            console.log("token access called");
            tokenRefresh();
        }, 12 * 60 * 1000);

        tokenRefresh();

        return () => clearInterval(tokenRefreshCall);
    },[])
    return (
        <BrowserRouter>
            { current_user ? <Navbar user={current_user} /> : null }
            <div className='flex'>
                { current_user ? <Sidebar user={current_user} /> : null }
                <div className='flex-grow'>
                    <Routes>
                        <Route path='/' element={current_user ? <Dashboard /> : <Navigate to='/Authentication' />} />
                        <Route path='/Authentication' element={!current_user ? <Authentication /> : <Navigate to="/" />} />
                        <Route path='/product/user-products' element={current_user ? <ShowAllProducts /> : <Navigate to="/Authentication" />} />
                        <Route path='/product/add-product' element={current_user ? <NewProduct /> : <Navigate to="/Authentication" />} />
                        <Route path='/user/profile/:id' element={current_user ? <Profile /> : < Navigate to="/Authentication" /> } />
                    </Routes>
                </div>
            </div>
            { current_user ? <Cart /> : null}
        </BrowserRouter>
    );
}

export default App;

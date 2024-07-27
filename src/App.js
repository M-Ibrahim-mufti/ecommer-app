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
import MyProductList from './Views/User/MyProduct/MyProduct';
import NotficationMessages from './utils/notifications';
import ShowProduct from './Views/Product/ShowProduct';

function AppContent() {
    const [notification, setNotification] = useState({type:'', message:''});
    const navigate = useNavigate();
    const [current_user, setCurrent_User] = useState(JSON.parse(localStorage.getItem('User')))
    const tokenRefresh = async () => {
        try {
            const method = '/token-refresh';
            const url = process.env.REACT_APP_SERVER_URL + method
            axios.defaults.withCredentials = true;
            const response = await axios.get(url);
            if (response.status === 200) {
                console.log(response.data)
                localStorage.setItem('User',JSON.stringify(response.data));
                setCurrent_User(JSON.parse(localStorage.getItem('User')));
            }
        } catch(err) {
            if (err.response) {
                if (err.response.status === 402) {
                    console.log(err.response.data.message);
                    localStorage.clear();
                    setCurrent_User(null)
                    navigate('/');
                    
                } else {
                    console.log("status", err.response.status);
                }
            } else {
                setCurrent_User(null);
                navigate('/')
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

    const triggerNotification = (type, message) => {
        setNotification({type, message});

        setTimeout(() => {
            setNotification({type: '', message: ''});
        },4000)
    }

    return(
        <div>
            { current_user ? <Navbar user={current_user} /> : null }
            <NotficationMessages type={notification.type} message={notification.message}/>
            <div className='flex'>
                { current_user ? <Sidebar user={current_user} /> : null }
                <div className='flex-grow'>
                    <Routes>
                        <Route path='/' element={current_user ? <Dashboard triggerNotification={triggerNotification}  /> : <Navigate to='/Authentication' />} />
                        <Route path='/Authentication' element={!current_user ? <Authentication triggerNotification={triggerNotification}  /> : <Navigate to="/" />} />
                        <Route path='/product/user-products' element={current_user ? <ShowAllProducts triggerNotification={triggerNotification}  /> : <Navigate to="/Authentication" />} />
                        <Route path='/product/add-product' element={current_user ? <NewProduct triggerNotification={triggerNotification}  current_user={current_user} /> : <Navigate to="/Authentication" />} />
                        <Route path='/user/profile/:id' element={current_user ? <Profile triggerNotification={triggerNotification}   /> : < Navigate to="/Authentication" /> } />
                        <Route path='/user/your-products/:id' element={current_user ? <MyProductList triggerNotification={triggerNotification} /> : <Navigate to='/Authentication' />} ></Route>
                        <Route path='/product/:id' element={current_user ? <ShowProduct triggerNotification={triggerNotification}/> : <Navigate to='/Authetication' /> }></Route>
                    </Routes>
                </div>
            </div>
            { current_user ? <Cart /> : null}
        </div>
    )
}


function App() {

   
    return (
        <BrowserRouter>
            <AppContent/>
        </BrowserRouter>
    );
}

export default App;

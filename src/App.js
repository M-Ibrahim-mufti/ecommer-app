
// imports
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from './slicer/userSlicer'
import { setNotification } from './slicer/notificationSlicer'
import lodaerSlicer, { showLoader, hideLoader } from './slicer/lodaerSlicer';

//Components 
import Authentication from './Views/Authentication/Authentication';
import Dashboard from './Views/Dashboard/Dashboard';
import Navbar from './Views/Dashboard/DashComponents/Navbar/Navbar'
import axios from 'axios';
import ShowAllProducts from './Views/Product/ShowAllProduct';
import Sidebar from './Views/Dashboard/DashComponents/Sidebar/sidebar';
import Cart from './Views/Dashboard/DashComponents/Cart/Cart';
import Profile from './Views/User/Profile/Profile';
import NewProduct from './Views/Product/NewProduct';
import MyProductList from './Views/User/MyProduct/MyProduct';
import NotficationMessages from './utils/notifications';
import ShowProduct from './Views/Product/ShowProduct';
import Loader from './utils/loader';

function AppContent() {
    const notification = useSelector((state) => state.notification);
    const currentUser = useSelector((state) => state.user);
    const loader = useSelector((state) => state.loader);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)

    const tokenRefresh = async () => {
        try {
            const method = '/token-refresh';
            const url = process.env.REACT_APP_SERVER_URL + method;
            axios.defaults.withCredentials = true;
            const response = await axios.get(url);
            if (response.status === 200) {
                localStorage.setItem('User', JSON.stringify(response.data));
                const user = JSON.parse(localStorage.getItem('User')).user;
                dispatch(setCurrentUser(user));
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status === 402) {
                    localStorage.clear();
                    dispatch(setCurrentUser(null));
                    navigate('/');
                } else {
                    console.log("status", err.response.status);
                }
            } else {
                dispatch(setCurrentUser(null));
                navigate('/');
            }
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 200);
        }
    };

    useEffect(() => {
        const tokenRefreshCall = setInterval(() => {
            console.log("token access called");
            tokenRefresh();
        }, 12 * 60 * 1000);
        tokenRefresh();
        return () => clearInterval(tokenRefreshCall);
    }, []);

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                dispatch(setNotification({ type: '', message: '' }));
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [notification, dispatch]);


    return (
        <div>
            {!loading && currentUser ? <Navbar /> : null}
            <NotficationMessages type={notification.type} message={notification.message} />
            <div className='flex'>
                <Loader/>
                {!loading && currentUser ? <Sidebar /> : null}
                <div className='flex-grow'>
                    <Routes>
                        <Route path='/' element={currentUser ? <Dashboard /> : <Navigate to='/Authentication' />} />
                        <Route path='/Authentication' element={!currentUser ? <Authentication /> : <Navigate to="/" />} />
                        <Route path='/product/user-products' element={currentUser ? <ShowAllProducts /> : <Navigate to="/Authentication" />} />
                        <Route path='/product/add-product' element={currentUser ? <NewProduct /> : <Navigate to="/Authentication" />} /> 
                        <Route path='/user/profile/:id' element={currentUser ? <Profile /> : <Navigate to="/Authentication" />} /> 
                        <Route path='/user/your-products/:id' element={currentUser ? <MyProductList /> : <Navigate to='/Authentication' />} /> 
                        <Route path='/product/:id' element={currentUser ? <ShowProduct /> : <Navigate to='/Authentication' />} /> 
                    </Routes>
                </div>
            </div>
            {currentUser ? <Cart /> : null}
        </div>
    );
}

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </Provider>
    );
}

export default App;

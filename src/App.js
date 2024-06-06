import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Authentication from './Views/Authentication/Authentication';
import Dashboard from './Views/Dashboard/Dashboard';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Dashboard/> } ></Route>
                <Route path='/Authentication' element={ <Authentication/> }></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

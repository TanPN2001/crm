import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes/routes';
import HomePage from './page/HomePage/HomePage';
import { ReactNode } from 'react';
import 'antd/dist/antd.css';
import Login from './page/Login/Login';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthState } from './atom';
import { json } from 'stream/consumers';
import OrderList from './components/Content/Orders/OrderLists/OrderLists';
import Register from './page/Register/Register';
import CreateOrder from './components/Create/CreateOrder/CreateOrder';
import ProductsList from './components/Content/Products/ProductsList/ProductsList';
import CreateProduct from './components/Create/CreateProduct/CreateProduct';


function App() {
    return (
        <div className="App">
            <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage><div></div></HomePage>}></Route>
                <Route path='/login' element={<Login></Login>}></Route>
                <Route path='/register' element={<Register></Register>}></Route>
               
                <Route path='/order' element={<HomePage><OrderList></OrderList></HomePage>}></Route>

                <Route path='/product' element={<HomePage><ProductsList></ProductsList></HomePage>}></Route>
                
            </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

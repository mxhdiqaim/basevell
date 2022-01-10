import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AdminRoute from './components/admin/AdminRoute';

import OrderHistory from './components/pages/OrderHistory';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';

import ShippingAddressScreen from './screens/ShippingAddressScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';

import Search from './components/layouts/Search';

import { listProductCategories } from './actionsReducers/product/productActions';

import Map from './components/maps/Map';
import SupportScreen from './components/pages/Support';

// Components
import ChatBox from './components/chatbox/ChatBox';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import Cart from './components/pages/Cart';
import Navbar from './components/layouts/Navbar';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import ProductList from './components/pages/ProductList';
import OrderList from './components/pages/OrderList';
import Product from './components/pages/Product';
import PrivateRoute from './components/routing/PrivateRoute';
import Order from './components/pages/Order';

// Styles
import './App.css';

const App = () => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className='grid-container'>
        <Navbar />
        <main>
          <Routes>
            <Route path='/seller/:id' element={<SellerScreen />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/cart/:id' element={<Cart />}></Route>
            <Route path='/product/:id' element={<Product />} exact></Route>
            <Route
              path='/product/:id/edit'
              element={ProductEditScreen}
              exact></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/shipping' element={<ShippingAddressScreen />}></Route>
            <Route path='/payment' element={<PaymentMethodScreen />}></Route>
            <Route path='/placeorder' element={<PlaceOrderScreen />}></Route>
            <Route path='/order/:id' element={<Order />}></Route>
            <Route path='/orderhistory' element={<OrderHistory />}></Route>
            <Route path='/search/name' element={<Search />} exact></Route>
            <Route path='/search/name/:name' element={<Search />} exact></Route>
            <Route
              path='/search/category/:category'
              element={<Search />}
              exact></Route>
            <Route
              path='/search/category/:category/name/:name'
              element={<Search />}
              exact></Route>
            <Route
              path='/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber'
              element={<Search />}
              exact></Route>

            <Route
              path='/profile'
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path='/map'
              element={
                <PrivateRoute>
                  <Map />
                </PrivateRoute>
              }
            />

            <Route
              path='/productlist'
              element={
                <AdminRoute>
                  <ProductList />
                </AdminRoute>
              }
            />

            <Route
              path='/productlist/pageNumber/:pageNumber'
              element={
                <AdminRoute>
                  <ProductList />
                </AdminRoute>
              }
            />
            <Route
              path='/orderlist'
              element={
                <AdminRoute>
                  <OrderList />
                </AdminRoute>
              }
            />
            <Route
              path='/userlist'
              element={
                <AdminRoute>
                  <UserListScreen />
                </AdminRoute>
              }
            />
            <Route
              path='/user/:id/edit'
              element={
                <AdminRoute>
                  <UserEditScreen />
                </AdminRoute>
              }
            />
            <Route
              path='/dashboard'
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
            <Route
              path='/support'
              element={
                <AdminRoute>
                  <SupportScreen />
                </AdminRoute>
              }
            />
            <Route
              path='/productlist/seller'
              element={
                <SellerRoute>
                  <ProductList />
                </SellerRoute>
              }
            />
            <Route
              path='/orderlist/seller'
              element={
                <SellerRoute>
                  <OrderList />
                </SellerRoute>
              }
            />

            <Route path='/' element={<Home />} exact></Route>
          </Routes>
        </main>
        <footer className='row center'>
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          <div>All right reserved</div>{' '}
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;

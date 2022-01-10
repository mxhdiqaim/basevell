import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import Product from '../Product';

import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actionsReducers/product/productActions';
import { listTopSellers } from '../../actionsReducers/auth/authActions';
import { Link } from 'react-router-dom';

// Components
import Spinner from '../layouts/Spinner';
import Alert from '../layouts/Alert';

const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  const userTopSellersList = useSelector(state => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);
  return (
    <div>
      <h2>Top Sellers</h2>
      {loadingSellers ? (
        <Spinner />
      ) : errorSellers ? (
        <Alert variant='danger'>{errorSellers}</Alert>
      ) : (
        <>
          {sellers.length === 0 && <Alert>No Seller Found</Alert>}
          <Carousel showArrows autoPlay showThumbs={false}>
            {sellers.map(seller => (
              <div key={seller._id}>
                <Link to={`/seller/${seller._id}`}>
                  <img src={seller.seller.logo} alt={seller.seller.name} />
                  <p className='legend'>{seller.seller.name}</p>
                </Link>
              </div>
            ))}
          </Carousel>
        </>
      )}
      <h2>Featured Products</h2>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <>
          {products.length === 0 && <Alert>No Product Found</Alert>}
          <div className='row center'>
            {products.map(product => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
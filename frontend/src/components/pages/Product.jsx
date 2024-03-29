import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Actions
import {
  createReview,
  detailsProduct,
} from '../../actionsReducers/product/productActions';

// components
import Spinner from '../layouts/Spinner';
import Alert from '../layouts/Alert';
import Rating from '../layouts/Rating';

import { PRODUCT_REVIEW_CREATE_RESET } from '../../actionsReducers/types';
import formatter from '../../utils/formatter';

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const { id: productId } = params;

  const [qty, setQty] = useState(1);
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector(state => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);
  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };
  const submitHandler = e => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name }),
      );
    } else {
      alert('Please enter comment and rating');
    }
  };
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <div>
          <Link to='/'>Back to result</Link>
          <div className='row top'>
            <div className='col-2'>
              <img className='large' src={product.image} alt={product.name} />
            </div>
            <div className='col-1'>
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}></Rating>
                </li>
                <li>Pirce : {formatter.format(product.price)}</li>
                <li>
                  Description:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className='col-1'>
              <div className='card card-body'>
                <ul>
                  <li>
                    Seller{' '}
                    <h2>
                      <Link to={`/seller/${product.seller._id}`}>
                        {product.seller.seller.name}
                      </Link>
                    </h2>
                    <Rating
                      rating={product.seller.seller.rating}
                      numReviews={product.seller.seller.numReviews}></Rating>
                  </li>
                  <li>
                    <div className='row'>
                      <div>Price</div>
                      <div className='price'>
                        {formatter.format(product.price)}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className='row'>
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className='text-success'>In Stock</span>
                        ) : (
                          <span className='text-danger'>Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className='row'>
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={e => setQty(e.target.value)}>
                              {[...Array(product.countInStock).keys()].map(
                                x => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ),
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className='bg-primary text-light transition hover:bg-secondary block'>
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h2 id='reviews'>Reviews</h2>
            {product.reviews.length === 0 && <Alert>There is no review</Alert>}
            <ul>
              {product.reviews.map(review => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=' '></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className='form' onSubmit={submitHandler}>
                    <div>
                      <h2>Write a customer review</h2>
                    </div>
                    <div className='lg:flex'>
                      <div className='lg:w-1/2'>
                        <label>Rating</label>
                        <select
                          id='rating'
                          value={rating}
                          className='border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary'
                          onChange={e => setRating(e.target.value)}>
                          <option value=''>Select...</option>
                          <option value='1'>1- Poor</option>
                          <option value='2'>2- Fair</option>
                          <option value='3'>3- Good</option>
                          <option value='4'>4- Very good</option>
                          <option value='5'>5- Excelent</option>
                        </select>
                      </div>
                      <div className='lg:w-1/2'>
                        <label>Comment</label>
                        <textarea
                          id='comment'
                          value={comment}
                          className='border-1 shadow appearance-none border rounded w-full py-5 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary h-80'
                          onChange={e => setComment(e.target.value)}></textarea>
                      </div>
                    </div>
                    <div className='w-full'>
                      <button
                        className='bg-primary w-full lg:w-1/5 hover:bg-secondary transition text-light'
                        type='submit'>
                        Submit
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <Spinner />}
                      {errorReviewCreate && (
                        <Alert variant='danger'>{errorReviewCreate}</Alert>
                      )}
                    </div>
                  </form>
                ) : (
                  <p className='py-3'>
                    Please{' '}
                    <Link
                      to='/login'
                      className='bg-primary p-3 rounded text-white hover:text-white transition hover:bg-secondary'>
                      Sign In
                    </Link>{' '}
                    to write a review
                  </p>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-google-charts';
import { summaryOrder } from '../../actionsReducers/order/orderActions';

// components
import Spinner from '../layouts/Spinner';
import Alert from '../layouts/Alert';

// methods
import formatter from '../../utils/formatter';

export default function DashboardScreen() {
  const orderSummary = useSelector(state => state.orderSummary);
  const { loading, summary, error } = orderSummary;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(summaryOrder());
  }, [dispatch]);
  return (
    <div>
      <div className='row'>
        <h1>Dashboard</h1>
      </div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <>
          <ul className='row summary'>
            <li>
              <div className='summary-title color1'>
                <span>
                  <i className='fa fa-users' /> Users
                </span>
              </div>
              <div className='summary-body'>{summary.users[0].numUsers}</div>
            </li>
            <li>
              <div className='summary-title color2'>
                <span>
                  <i className='fa fa-shopping-cart' /> Orders
                </span>
              </div>
              <div className='summary-body'>
                {summary.orders[0] ? summary.orders[0].numOrders : 0}
              </div>
            </li>
            <li>
              <div className='summary-title color3'>
                <span>
                  <i className='fa fa-money' /> Sales
                </span>
              </div>
              <div className='summary-body'>
                {summary.orders[0]
                  ? formatter.format(summary.orders[0].totalSales.toFixed(2))
                  : 0}
              </div>
            </li>
          </ul>
          <div>
            <div>
              <h2>Sales</h2>
              {summary.dailyOrders.length === 0 ? (
                <Alert>No Sale</Alert>
              ) : (
                <Chart
                  width='100%'
                  height='400px'
                  chartType='AreaChart'
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Date', 'Sales'],
                    ...summary.dailyOrders.map(x => [x._id, x.sales]),
                  ]}
                />
              )}
            </div>
          </div>
          <div>
            <h2>Categories</h2>
            {summary.productCategories.length === 0 ? (
              <Alert>No Category</Alert>
            ) : (
              <Chart
                width='100%'
                height='400px'
                chartType='PieChart'
                loader={<div>Loading Chart</div>}
                data={[
                  ['Category', 'Products'],
                  ...summary.productCategories.map(x => [x._id, x.count]),
                ]}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

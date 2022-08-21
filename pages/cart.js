import React, { useContext } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast } from 'react-toastify';
import Currency from 'react-currency-formatter';
import { StarIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/outline';

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    toast.success('Product updated in the cart');
  };
  return (
    <Layout title='Shopping Cart'>
      <div className='lg:flex max-w-screen-2xl mx-auto"'>
        <div className=' m-5 shadow-sm'>
          <Image
            src='https://links.papareact.com/ikj'
            width={1020}
            height={250}
            objectFit='contain'
          />
          <div className='flex flex-col p-5 space-y-10 bg-white'>
            <h1 className='text-3xl border-b pb-4'>
              {cartItems.length === 0
                ? 'Your Amazon Basket is empty.'
                : 'Shopping Basket'}
            </h1>

            {cartItems.map((item) => (
              <div className='grid grid-cols-5' key={item._id}>
                <Image
                  src={item.image}
                  height={200}
                  width={200}
                  objectFit='contain'
                />
                <div className='col-span-3 mx-5'>
                  <p>{item.name}</p>
                  <div className='flex'>
                    {Array(4)
                      .fill()
                      .map((_, i) => (
                        <StarIcon key={i} className='h-5 text-yellow-500' />
                      ))}
                  </div>
                  <p className='text-xs my-2 line-clamp-3'>
                    {item.description}
                  </p>
                  <Currency quantity={item.price} currency='USD' />

                  <div className='flex items-center space-x-2'>
                    <img
                      loading='lazy'
                      className='w-12'
                      src='https://links.papareact.com/fdw'
                      alt=''
                    />
                    <p className='text-xs text-gray-500'>
                      FREE Next-day Delivery
                    </p>
                  </div>
                </div>
                <div className='col-span-1 flex justify-around items-center '>
                  <select
                    className=' button'
                    value={item.quantity}
                    onChange={(e) => updateCartHandler(item, e.target.value)}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    className='button'
                    onClick={() => removeItemHandler(item)}
                  >
                    <TrashIcon color='black' width={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='card md:h-32 md:w-1/3 p-5'>
          <ul>
            <li>
              <div className='pb-3 text-xl'>
                Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                {cartItems
                  .reduce((a, c) => a + c.quantity * c.price, 0)
                  .toFixed(2)}
              </div>
            </li>
            <li>
              <button
                onClick={() => router.push('login?redirect=/shipping')}
                className='primary-button w-full'
              >
                Check Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });

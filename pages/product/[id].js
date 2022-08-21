import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';

import { Store } from '../../utils/Store';

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  if (!product) {
    return <Layout title='Produt Not Found'>Produt Not Found</Layout>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout title={product.name}>
      <div className='container m-auto mt-4 px-4'>
        <div className='py-2 '>
          <Link href='/'>back to products</Link>
        </div>
        <div className='grid md:grid-cols-4 md:gap-3'>
          <div className='md:col-span-2'>
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              layout='responsive'
              objectFit='contain'
            />
          </div>
          <div>
            <ul className=' space-y-2'>
              <li>
                <h1 className='text-2xl font-bold'>{product.name}</h1>
              </li>
              <li className='text-lg'>Category: {product.category}</li>
              <li className='text-lg'>Brand: {product.brand}</li>
              <li className='text-lg'>
                {product.rating} of {product.numReviews} reviews
              </li>
              <li>Description: {product.description}</li>
            </ul>
          </div>
          <div>
            <div className='card p-5'>
              <div className='mb-2 flex justify-between'>
                <div>Price</div>
                <div>${product.price}</div>
              </div>
              <div className='mb-2 flex justify-between'>
                <div>Status</div>
                <div>
                  {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                </div>
              </div>
              <button
                className='primary-button w-full'
                onClick={addToCartHandler}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ params: { id } }) => {
  //fetch products
  const { data } = await axios.get(`http://localhost:3000/api/products/${id}`);

  return {
    props: {
      product: data, // Beacuse the api response for filters in an array,
    },
  };
};

export const getStaticPaths = async () => {
  // retrive all the possible paths
  const { data } = await axios.get('http://localhost:3000/api/products');

  return {
    paths: data.map((product) => ({
      params: { id: String(product._id) },
    })),
    fallback: 'blocking',
  };
};

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const { slug } = params;

//   await db.connect();
//   const product = await Product.findOne({ slug }).lean();
//   await db.disconnect();
//   return {
//     props: {
//       product: product ? db.convertDocToObj(product) : null,
//     },
//   };
// }

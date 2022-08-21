/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import Link from 'next/link';

export default function ProductItem({ product, addToCartHandler }) {
  //const [hasPrime] = useState(Math.random() < 0.5);
  return (
    <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
      <Link href={`/product/${product._id}`} passHref>
        <a>
          <p className='absolute top-2 right-2 text-xs italic text-gray-400'>
            {product.category}
          </p>
          <Image
            src={product.image}
            height={250}
            width={250}
            layout='responsive'
            objectFit='contain'
            alt='image'
          />

          <h4 className='my-3'>{product.name}</h4>

          <div className='flex'>
            {Array(4)
              .fill()
              .map((_, i) => (
                <StarIcon className='h-5 text-yellow-500' key={i} />
              ))}
          </div>
          <p className='text-xs my-2 line-clamp-2'>{product.description}</p>
          <div className='mb-5'>
            <Currency quantity={product.price} currency='USD' />
          </div>

          <div className='flex items-center space-x-2 -mt-5'>
            <img
              className='w-12'
              src='https://links.papareact.com/fdw'
              alt=''
            />
            <p className='text-xs text-gray-500'>FREE Next-Day Delivery</p>
          </div>
        </a>
      </Link>
      <button
        onClick={() => addToCartHandler(product)}
        className='mt-auto button'
      >
        Add to Basket
      </button>
    </div>
  );
}

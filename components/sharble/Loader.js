import React from 'react';

function Loader() {
  return (
    <>
      <div className='bg-gray-100'>
        <div className=' rounded relative'>
          <div className='rounded-full bg-indigo-200 w-[190px] h-[190px] relative flex justify-center items-center mx-auto animate-spin'>
            <svg
              className='absolute top-[2px] right-0'
              width={76}
              height={97}
              viewBox='0 0 76 97'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <mask id='path-1-inside-1_2495_2146' fill='white'>
                <path d='M76 97C76 75.6829 69.2552 54.9123 56.7313 37.6621C44.2074 20.4118 26.5466 7.56643 6.27743 0.964994L0.0860505 19.9752C16.343 25.2698 30.5078 35.5725 40.5526 49.408C50.5974 63.2436 56.007 79.9026 56.007 97H76Z' />
              </mask>
              <path
                d='M76 97C76 75.6829 69.2552 54.9123 56.7313 37.6621C44.2074 20.4118 26.5466 7.56643 6.27743 0.964994L0.0860505 19.9752C16.343 25.2698 30.5078 35.5725 40.5526 49.408C50.5974 63.2436 56.007 79.9026 56.007 97H76Z'
                stroke='#4338CA'
                strokeWidth={40}
                mask='url(#path-1-inside-1_2495_2146)'
              />
            </svg>
            <div className='rounded-full bg-white w-[150px] h-[150px]' />
          </div>
          <p className='absolute mx-auto inset-x-0 my-auto inset-y-[80px] text-base font-medium text-gray-800 text-center'>
            Loading ...
          </p>
        </div>
      </div>
    </>
  );
}

export default Loader;

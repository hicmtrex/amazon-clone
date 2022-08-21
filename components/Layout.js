import Head from 'next/head';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Banner from './Banner';
import Footer from './Footer';
import Navbar from './Layout/Navbar';

export default function Layout({ title, children }) {
  const router = useRouter();
  const isHome = router.pathname === '/';
  return (
    <>
      <Head>
        <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
        <meta name='description' content='Ecommerce Website' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <ToastContainer position='bottom-center' limit={1} />

      <div className='flex min-h-screen flex-col justify-between '>
        <Navbar />
        {isHome && (
          <div className='container m-auto mt-4 px-4'>
            <Banner />
          </div>
        )}

        <main className='container m-auto mt-4 px-4'>{children}</main>
        <Footer />
      </div>
    </>
  );
}

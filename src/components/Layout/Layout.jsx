import { Suspense } from 'react';
import Loader from '../Loader/Loader';
import AppBar from '../AppBar/AppBar';

const Layout = ({ children }) => {
  return (
    <>
      <AppBar />
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </>
  );
};

export default Layout;

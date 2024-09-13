import { useSelector } from 'react-redux';
import { selectAuthIsLoggedIn } from '../../redux/auth/selectors';

const HomePage = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  return isLoggedIn ? (
    <p>This is Home page</p>
  ) : (
    <>
      <h1>Welcome to my Phone book. Let&#x2019;s go started</h1>
      <p>Please register your account or log in</p>
    </>
  );
};

export default HomePage;

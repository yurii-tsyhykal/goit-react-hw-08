import { lazy, useEffect } from 'react';
import './App.css';
// import ContactForm from './components/ContactForm/ContactForm';
// import ContactList from './components/ContactList/ContactList';
// import SearchBox from './components/SearchBox/SearchBox';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchContacts } from './redux/contactsOps';
// import {
//   selectIsError,
//   selectIsLoading,
// } from './redux/contactsSlice/contactsSlice';
// import Loader from './components/Loader/Loader';
// import Error from './components/Error/Error';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RestrictedRoute } from './components/RestrictedRoute/RestrictedRoute';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import Layout from './components/Layout/Layout';
import { userRefresh } from './redux/auth/operations';
import {
  selectAuthIsLoggedIn,
  selectAuthIsRefreshing,
} from './redux/auth/selectors';
import Loader from './components/Loader/Loader';
import { fetchContacts } from './redux/contacts/operations';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegistrationPage = lazy(() =>
  import('./pages/RegistrationPage/RegistrationPage')
);

function App() {
  const isRefreshing = useSelector(selectAuthIsRefreshing);
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedIn) dispatch(fetchContacts());
    dispatch(userRefresh());
  }, [dispatch, isLoggedIn]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={<RestrictedRoute component={<RegistrationPage />} />}
        />
        <Route
          path="/login"
          element={<RestrictedRoute component={<LoginPage />} />}
        />
        <Route
          path="/contacts"
          element={<PrivateRoute component={<ContactsPage />} />}
        />
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </Layout>
  );
}

export default App;

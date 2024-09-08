import { useEffect } from 'react';
import './App.css';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from './redux/contactsOps';
import {
  selectIsError,
  selectIsLoading,
} from './redux/contactsSlice/contactsSlice';
import Loader from './components/Loader/Loader';
import Error from './components/Error/Error';

function App() {
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <>
      {isError !== null ? (
        <Error />
      ) : (
        <div>
          <h1>Phonebook</h1>
          <ContactForm />
          <SearchBox />
          {isLoading ? <Loader /> : <ContactList />}
        </div>
      )}
    </>
  );
}

export default App;

import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
import { selectFilteredContacts } from '../../redux/contactsSlice/contactsSlice';

const ContactList = () => {
  const filterContacts = useSelector(selectFilteredContacts);
  return (
    <ul className={css.contactsList}>
      {filterContacts.map(({ id, ...contact }) => (
        <li key={id} className={css.listItem}>
          <Contact id={id} {...contact} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;

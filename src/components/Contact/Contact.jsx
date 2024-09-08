import css from './Contact.module.css';
import { RiContactsFill } from 'react-icons/ri';
import { IoCall } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';

const Contact = ({ id, name, number, }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className={css.userData}>
        <p>
          <RiContactsFill className={css.userIcon} />
          {name}
        </p>
        <p>
          <IoCall className={css.telIcon} />
          {number}
        </p>
      </div>
      <button
        type="button"
        className={css.deleteBtn}
        onClick={() => dispatch(deleteContact(id))}
      >
        Delete
      </button>
    </>
  );
};

export default Contact;

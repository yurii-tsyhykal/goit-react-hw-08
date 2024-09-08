import { ErrorMessage, Field, Form, Formik } from 'formik';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';

const ContactForm = () => {
  const dispatch = useDispatch();
  const nameField = nanoid();
  const numberField = nanoid();
  const validation = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    number: Yup.string()
      .required('Required')
      .matches(
        /^\d{3}-\d{2}-\d{2}$/,
        'Phone number must be in the format ***-**-**'
      ),
  });

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      onSubmit={handleSubmit}
      validationSchema={validation}
    >
      <Form className={css.form}>
        <label htmlFor={nameField} className={css.nameLabel}>
          Name
        </label>
        <Field
          className={css.contactName}
          type="text"
          name="name"
          id={nameField}
        />
        <ErrorMessage className={css.error} name="name" component="span" />
        <label htmlFor={numberField} className={css.numberLabel}>
          Number
        </label>
        <Field
          className={css.contactNumber}
          type="text"
          name="number"
          id={numberField}
        />
        <ErrorMessage className={css.error} name="number" component="span" />
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;

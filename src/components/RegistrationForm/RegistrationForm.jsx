import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import css from './RegistrationForm.module.css';
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { userRegister } from '../../redux/auth/operations';

const ProfileValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'The profile name must be at least 2 characters')
    .max(50, 'The profile name must be less than 50 characters')
    .test('is-valid-name', 'Must be letters or "X Æ A-12"Hi Elon""', value => {
      const validRegularName = /^[A-Za-z\s]+$/.test(value);
      const isElonMuskSon = value === 'X Æ A-12';
      return validRegularName || isElonMuskSon;
    }),
  email: Yup.string()
    .email('Email must be in valid format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(7, 'The password must be at least 7 characters'),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPswrdId = useId();

  const handleSubmit = (values, actions) => {
    const { passwordConfirm, ...newUser } = values;
    dispatch(userRegister(newUser));

    actions.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ProfileValidationSchema}
    >
      {({ errors }) => (
        <div className={css.formBox}>
          <Form className={css.form}>
            <div className={css.formInputBox}>
              <label htmlFor={nameId} className={css.formRegLabel}>
                Name
              </label>
              <Field
                className={css.formInput}
                type="text"
                name="name"
                id={nameId}
                placeholder="Adrian Cross"
              />

              <ErrorMessage
                className={css.error}
                name="name"
                component="span"
              />
            </div>
            <div className={css.formInputBox}>
              <label htmlFor={emailId} className={css.formRegLabel}>
                Email
              </label>
              <Field
                className={css.formInput}
                type="email"
                name="email"
                id={emailId}
                placeholder="across@mail.com"
              />

              <ErrorMessage
                className={css.error}
                name="email"
                component="span"
              />
            </div>
            <div className={css.formInputBox}>
              <label htmlFor={passwordId} className={css.formRegLabel}>
                Password
              </label>
              <Field
                className={css.formInput}
                type="password"
                name="password"
                id={passwordId}
                placeholder="examplepwd12345"
              />

              <ErrorMessage
                className={css.error}
                name="password"
                component="span"
              />
            </div>
            <div className={css.LastFormInputBox}>
              <label htmlFor={confirmPswrdId} className={css.formRegLabel}>
                Confirm password
              </label>
              <Field
                className={css.formInput}
                type="password"
                name="passwordConfirm"
                id={confirmPswrdId}
              />

              <ErrorMessage
                className={css.error}
                name="passwordConfirm"
                component="span"
              />
            </div>
            <button
              disabled={Object.keys(errors).length > 0}
              type="submit"
              className={css.formBtn}
            >
              Registration
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default RegistrationForm;

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import css from './LoginForm.module.css';
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/auth/operation';

const ProfileValidationSchema = Yup.object().shape({
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

const LoginForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: '',
    passwordConfirm: '',
  };
  const emailId = useId();
  const passwordId = useId();
  const confirmPswrdId = useId();

  const handleSubmit = (values, actions) => {
    const { passwordConfirm, ...user } = values;
    dispatch(userLogin(user));
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
              <label htmlFor={emailId} className={css.formLogLabel}>
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
              <label htmlFor={passwordId} className={css.formLogLabel}>
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
              <label htmlFor={confirmPswrdId} className={css.formLogLabel}>
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
              Log In
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default LoginForm;

import * as Yup from 'yup';

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  role: Yup.string()
    .oneOf(['user', 'admin'], 'You must select a role')
    .required('Role is required'),

  technologies: Yup.array().when('role', ([role], schema) => {
    if (role === 'user') {
      return schema.of(Yup.string()).min(1, 'One technology is required');
    }
    return schema.notRequired();
  }),
});

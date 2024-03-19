import * as Yup from 'yup';

import roles from '../../../config/Roles';

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
    .oneOf(Object.values(roles), 'You must select a role')
    .required('Role is required'),

  technologies: Yup.array().when('role', ([role], schema) => {
    if (role === roles.STUDENT) {
      return schema.of(Yup.string()).min(1, 'One technology is required');
    }
    return schema.notRequired();
  }),
});

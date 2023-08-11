import React from 'react';
// import { Button } from 'reactstrap';
import { useLogin } from 'tapis-hooks/authenticator';
import { Redirect } from 'react-router-dom';
// import { useTapisConfig } from 'tapis-hooks/context';
// import { FormikInput } from 'tapis-ui/_common';
// import { SubmitWrapper } from 'tapis-ui/_wrappers';
// import { Formik, Form } from 'formik';
// import * as Yup from 'yup';

const Login: React.FC = () => {
  const { login, isLoading, error } = useLogin();
  login("test", "test");
//   const { accessToken } = useTapisConfig();

//   const onSubmit = ({
//     username,
//     password,
//   }: {
//     username: string;
//     password: string;
//   }) => login(username, password);

//   const loginSchema = Yup.object({
//     username: Yup.string().required(),
//     password: Yup.string().required(),
//   });

//   const initialValues = {
//     username: '',
//     password: '',
//   };

  return (
    <Redirect to="/mesonet"></Redirect>
  );
};

export default Login;

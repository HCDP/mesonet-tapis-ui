import React, { useEffect } from 'react';
import { useLogin } from 'tapis-hooks/authenticator';
import { Redirect } from 'react-router-dom';
import { QueryWrapper } from 'tapis-ui/_wrappers';

const Login: React.FC = () => {
  const { login, isLoading, error, isSuccess } = useLogin();
  
  useEffect(() => {
    console.log("logging in");
    login();
    return () => {
    };
  // eslint-disable-next-line
  }, []);

  return (
      <QueryWrapper isLoading={isLoading} error={error}>
        {isSuccess && <Redirect to="/mesonet"></Redirect>}
        <div>Test</div>
      </QueryWrapper>
  );
};

export default Login;

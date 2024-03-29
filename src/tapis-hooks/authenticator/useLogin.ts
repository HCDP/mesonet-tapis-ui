import { useMutation } from 'react-query';
import { Tokens } from '@tapis/tapis-typescript';
import { login } from 'tapis-api/authenticator';
import { useTapisConfig } from 'tapis-hooks';

// type LoginHookParams = {
//   username: string;
//   password: string;
// };

const useLogin = () => {

  const { setAccessToken, basePath } = useTapisConfig();

  // On successful login, save the token to the TapisContext state
  const onSuccess = (response: Tokens.RespRefreshToken) => {
    setAccessToken(response?.result?.access_token);
  };

  // The useMutation react-query hook is used to call operations that make server-side changes
  // (Other hooks would be used for data retrieval)
  //
  // In this case, loginHelper is called to perform the operation, with an onSuccess callback
  // passed as an option
  const { mutate, isLoading, isError, isSuccess, error } = useMutation<
    Tokens.RespRefreshToken,
    Error
  >(
    [basePath],
    () => login(basePath),
    { onSuccess }
  );

  // Return hook object with loading states and login function
  return {
    isLoading,
    isError,
    isSuccess,
    error,
    login: () => {
      // Call mutate to trigger a single post-like API operation
      return mutate();
    },
    logout: () => setAccessToken(null),
  };
};

export default useLogin;

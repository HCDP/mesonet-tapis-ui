import { Tokens } from '@tapis/tapis-typescript';
import { apiGenerator, errorDecoder } from 'tapis-api/utils';
import config from './config.json';

const login = (
  basePath: string
): Promise<Tokens.RespRefreshToken> => {
  const reqRefreshToken: Tokens.ReqRefreshToken = {
    refresh_token: config.refresh_token
  };
  const request: Tokens.RefreshTokenRequest = {
    reqRefreshToken,
  };

  const api: Tokens.TokensApi = apiGenerator<Tokens.TokensApi>(
    Tokens,
    Tokens.TokensApi,
    basePath,
    null
  );

  async function performLogin() {
    const response = await errorDecoder(() => api.refreshToken(request));
    return response;
  }

  return performLogin();
};

export default login;

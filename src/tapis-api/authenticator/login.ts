import { Tokens } from '@tapis/tapis-typescript';
import { apiGenerator, errorDecoder } from 'tapis-api/utils';

const login = (
  basePath: string
): Promise<Tokens.RespRefreshToken> => {
  const reqRefreshToken: Tokens.ReqRefreshToken = {
    refresh_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI2MzQzYzE3MC03NjBjLTQxZDYtYjhkMC1jYTcyYmIwODg1NDIiLCJpc3MiOiJodHRwczovL2Rldi5kZXZlbG9wLnRhcGlzLmlvL3YzL3Rva2VucyIsInN1YiI6InRlc3R1c2VyMkBkZXYiLCJ0YXBpcy9pbml0aWFsX3R0bCI6MzE1MzYwMDAsInRhcGlzL3RlbmFudF9pZCI6ImRldiIsInRhcGlzL3Rva2VuX3R5cGUiOiJyZWZyZXNoIiwiZXhwIjoxNzIzMjUzNTU2LCJ0YXBpcy9hY2Nlc3NfdG9rZW4iOnsianRpIjoiY2NhOWI4M2ItMzBkYy00YzdkLWE3MTgtMDBhYjI4OTNjODY1IiwiaXNzIjoiaHR0cHM6Ly9kZXYuZGV2ZWxvcC50YXBpcy5pby92My90b2tlbnMiLCJzdWIiOiJ0ZXN0dXNlcjJAZGV2IiwidGFwaXMvdGVuYW50X2lkIjoiZGV2IiwidGFwaXMvdG9rZW5fdHlwZSI6ImFjY2VzcyIsInRhcGlzL2RlbGVnYXRpb24iOmZhbHNlLCJ0YXBpcy9kZWxlZ2F0aW9uX3N1YiI6bnVsbCwidGFwaXMvdXNlcm5hbWUiOiJ0ZXN0dXNlcjIiLCJ0YXBpcy9hY2NvdW50X3R5cGUiOiJ1c2VyIiwidGFwaXMvY2xpZW50X2lkIjoibWVzb25ldCIsInRhcGlzL2dyYW50X3R5cGUiOiJyZWZyZXNoX3Rva2VuIiwidGFwaXMvcmVmcmVzaF9jb3VudCI6MiwidHRsIjoxNDQwMH19.xIrOlqptya6lRRGPOAO866rJCI7-0lAGLDdFRl0sdHl23jlkkgAwdaJxgzp6aV89_Ay3LiMV1ydwgYhzyvnm541BCpbObJC67sjRLHcsPoilshOPWfXwP8b4e2TJgathLjnpPBd18SvWpdHuHoi1BRsvFOFwSBcsKuUjhcey2jpxrCb8zsn7eqI9hKlcjFSOyb2gJvzFfjdRuP8c0SysKoAjKmcdOHc7gpNSl3dQZN08MTz9nLzuRmOunbjlOTUBG1_Q_MI7_b2aBm-rfGiQntIIa2yk5SEvzqIUtkIU_0d_GtXz-Pcv0iRAP8WNXNTNXcTxzqYOgC8LC-kvjWOJDw"
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
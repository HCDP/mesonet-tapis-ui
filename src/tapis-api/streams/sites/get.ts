import { Streams } from '@tapis/tapis-typescript';
import { apiGenerator, errorDecoder } from 'tapis-api/utils';

const get = (
  params: Streams.GetSiteRequest,
  basePath: string,
  jwt: string
) => {
  const api: Streams.SitesApi = apiGenerator<Streams.SitesApi>(
    Streams,
    Streams.SitesApi,
    basePath,
    jwt
  );
  return errorDecoder<Streams.RespGetSite>(() => api.getSite(params));
};

export default get;

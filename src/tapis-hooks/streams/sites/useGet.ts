import { useQuery } from 'react-query';
import { get } from 'tapis-api/streams/sites';
import { Streams } from '@tapis/tapis-typescript';
import { useTapisConfig } from 'tapis-hooks';
import QueryKeys from './queryKeys';

const useGet = (params: Streams.GetSiteRequest) => {
  const { accessToken, basePath } = useTapisConfig();
  const result = useQuery<Streams.RespGetSite, Error>(
    [QueryKeys.list, params, accessToken],
    // Default to no token. This will generate a 403 when calling the list function
    // which is expected behavior for not having a token
    () => get(params, basePath, accessToken?.access_token || ''),
    {
      enabled: !!accessToken,
    }
  );
  return result;
};

export default useGet;

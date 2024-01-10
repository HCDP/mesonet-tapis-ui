import { useList } from 'tapis-hooks/streams/variables';
import React from 'react';
import { QueryWrapper } from 'tapis-ui/_wrappers';
import { Streams } from '@tapis/tapis-typescript';
import Variables from '../_components/Variables';

const Layout: React.FC<{
  projectId: string;
  siteId: string;
  instrumentId: string;
  start?: Date;
  end?: Date;
  limit?: number;
  offset?: number;
}> = ({ projectId, siteId, instrumentId, start, end, limit, offset }) => {
  let payload: Streams.ListVariablesRequest = {
    projectId,
    siteId,
    instId: instrumentId
  };
  const { data, isLoading, error } = useList(payload);

  const variables = data?.result ?? [];

  return (
    <QueryWrapper isLoading={isLoading} error={error}>
      <Variables
        variables={variables}
        projectId={projectId}
        siteId={siteId}
        instrumentId={instrumentId}
        start={start}
        end={end}
        limit={limit}
        offset={offset}
      ></Variables>
    </QueryWrapper>
  );
};

export default Layout;

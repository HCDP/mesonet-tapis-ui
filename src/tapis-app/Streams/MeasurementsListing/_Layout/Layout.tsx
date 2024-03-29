import { useList } from 'tapis-hooks/streams/variables';
import { useGet } from 'tapis-hooks/streams/sites';
import React, { useState } from 'react';
import { QueryWrapper } from 'tapis-ui/_wrappers';
import { Streams } from '@tapis/tapis-typescript';
import Variables from '../_components/Variables';
import Toolbar from '../_components/Toolbar';
import styles from './Layout.module.scss';

const Layout: React.FC<{
  projectId: string;
  siteId: string;
  instrumentId: string;
  start?: Date;
  end?: Date;
  limit?: number;
  offset?: number;
}> = ({ projectId, siteId, instrumentId }) => {
  let listVarPayload: Streams.ListVariablesRequest = {
    projectId,
    siteId,
    instId: instrumentId
  };
  let getSitePayload: Streams.GetSiteRequest = {
    projectId,
    siteId
  };
  const listVarData = useList(listVarPayload);
  const getSiteData = useGet(getSitePayload);

  const variables = listVarData.data?.result ?? [];

  const [start, setStart] = useState<Date | undefined>(() => {
    const now = new Date();
    now.setHours(now.getHours() - 12);
    return now;
  });
  const [end, setEnd] = useState<Date | undefined>(() => new Date());

  const [limit, setLimit] = useState<number | undefined>(undefined);
  const [offset, setOffset] = useState<number | undefined>(undefined);

  return (
    <div className={styles['body-wrapper']}>
      <QueryWrapper isLoading={listVarData.isLoading && getSiteData.isLoading} error={listVarData.error || getSiteData.error}>
        <div className={styles['station-header']}>
          Station {getSiteData.data?.result?.site_id}, {getSiteData.data?.result?.site_name}
        </div>
        <Toolbar
          start={start}
          end={end}
          setStart={setStart}
          setEnd={setEnd}
          setLimit={setLimit}
          setOffset={setOffset}
        />
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
    </div>
    
  );
};

export default Layout;

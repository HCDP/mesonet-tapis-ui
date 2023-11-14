import { useList } from 'tapis-hooks/streams/measurements';
import Measurements from '../_components/Measurements';
import React from 'react';
import styles from './Layout.module.scss';
import { QueryWrapper } from 'tapis-ui/_wrappers';
import { Streams } from '@tapis/tapis-typescript';
import DownloadVariables from '../_components/DownloadVariables';

const Layout: React.FC<{
  projectId: string;
  siteId: string;
  instrumentId: string;
  start?: Date;
  end?: Date;
  limit?: number;
  offset?: number;
}> = ({ projectId, siteId, instrumentId, start, end, limit, offset }) => {
  let payload: Streams.ListMeasurementsRequest = {
    projectId,
    siteId,
    instId: instrumentId,
  };
  if (start) {
    payload.startDate = start.toISOString();
  }
  if (end) {
    payload.endDate = end.toISOString();
  }
  if (limit !== undefined) {
    payload.limit = limit;
  }
  if (offset !== undefined) {
    payload.offset = offset;
  }

  const { data, isLoading, error } = useList(payload);

  const { instrument, site, measurements_in_file, ...measurements } =
    data?.result ?? {};

  const variables = Object.keys(measurements);

  return (
    <QueryWrapper isLoading={isLoading} error={error}>
      <div className={styles['variable-list']}>
        {variables.length ? (
          <>
            <div className={styles['download-button']}>
              <DownloadVariables measurements={measurements} text="Download All Data" />
            </div>
            <div className={styles['list']}>
              {variables.map((variable: string, index: number) => {
                const id = `${index}`;
                let variableMeasurements = measurements[variable];
                return (
                  <Measurements
                    key={id}
                    id={id}
                    variable={variable}
                    graphWidth={600}
                    measurements={variableMeasurements}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <i>No measurements found</i>
        )}
      </div>
    </QueryWrapper>
  );
};

export default Layout;

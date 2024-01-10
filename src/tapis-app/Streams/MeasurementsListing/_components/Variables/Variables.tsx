import { useList } from 'tapis-hooks/streams/measurements';
import Measurements from '../Measurements';
import React from 'react';
import styles from './Variables.module.scss';
import { QueryWrapper } from 'tapis-ui/_wrappers';
import { Streams } from '@tapis/tapis-typescript';
import DownloadVariables from '../DownloadVariables';

const Variables: React.FC<{
  variables: Streams.Variable[]
  projectId: string;
  siteId: string;
  instrumentId: string;
  start?: Date;
  end?: Date;
  limit?: number;
  offset?: number;
}> = ({ projectId, siteId, instrumentId, start, end, limit, offset, variables }) => {

  let variableMap: {[varID: string]: Streams.Variable} = {}
  for(let variable of variables) {
    if(variable.var_id) {
      variableMap[variable.var_id] = variable;
    }
  }

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

  
  const variableNames = Object.keys(measurements);

  return (
    <QueryWrapper isLoading={isLoading} error={error}>
      <div className={styles['variable-list']}>
        {variableNames.length ? (
          <>
            <div className={styles['download-all-button']}>
              <DownloadVariables
                variables={variableNames}
                measurements={measurements}
                fileName={instrumentId}
                text="Download All Data"
              />
            </div>
            {variableNames.map((variable: string, index: number) => {
                const id = `${index}`;
                let variableMeasurements = measurements[variable];
                return (
                  <div className={styles['measurements-list']}>
                    <div className={styles['download-variable-button']}>
                      <DownloadVariables
                        variables={[variable]}
                        measurements={measurements}
                        fileName={`${instrumentId}_${variable}`}
                        text="Download Variable"
                      />
                    </div>
                      <Measurements
                        unit={variableMap[variable].unit}
                        key={id}
                        id={id}
                        variable={variable}
                        graphWidth={600}
                        measurements={variableMeasurements}
                      />
                  </div>
                );
              })}
          </>
        ) : (
          <i>No measurements found</i>
        )}
      </div>
    </QueryWrapper>
  );
};

export default Variables;

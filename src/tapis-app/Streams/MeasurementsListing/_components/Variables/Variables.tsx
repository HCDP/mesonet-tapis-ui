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

  
  const variableIDs = Object.keys(measurements);

  return (
    <QueryWrapper isLoading={isLoading} error={error} altMessage="No data found">
      <div className={styles['variable-list']}>
        {variableIDs.length ? (
          <>
            <div className={styles['download-all-button']}>
              <DownloadVariables
                variables={variableIDs}
                measurements={measurements}
                fileName={instrumentId}
                text="Download All Data"
              />
            </div>
            {variableIDs.map((varID: string) => {
                let variableMeasurements = measurements[varID];
                const { unit, var_name } = variableMap[varID];
                return (
                  <div className={styles['measurements-list']}>
                    <Measurements
                      unit={unit}
                      key={varID!}
                      id={varID!}
                      variable={var_name!}
                      graphWidth={800}
                      measurements={variableMeasurements}
                      downloadName={`${siteId}_${varID}`}
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

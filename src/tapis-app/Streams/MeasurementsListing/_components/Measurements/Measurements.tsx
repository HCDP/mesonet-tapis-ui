import React, { useEffect, useState } from 'react';
import styles from './Measurements.module.scss';
import { v4 as uuidv4 } from 'uuid';
import MeasurementsPlot from '../MeasurementsPlot';

const Measurements: React.FC<{
  variable: string;
  graphWidth: number;
  id: string;
  measurements: { [datetime: string]: number };
}> = ({ variable, graphWidth, id, measurements }) => {
  let plotlyLayout: Partial<Plotly.Layout> = {
    width: graphWidth,
    height: 400,
  };
  const [showGraph, setGraph] = useState<boolean>(false);
  const [measurementsList, setMeasurementsList] = useState<string[]>([]);
  const [measurementsCollapsed, setMeasurementsCollapsed] =
    useState<boolean>(true);
  const [fullMeasurementsList, setFullMeasurementsList] = useState<string[]>(
    []
  );
  const [collapsedMeasurementsList, setCollapsedMeasurementsList] = useState<
    string[]
  >([]);
  const [variableLabel, setVariableLabel] = useState<string>('');

  useEffect(() => {
    let fullMeasurements = Object.entries(measurements).map(
      (entry: [string, number]) => {
        let date = entry[0].replace('T', ' ');
        return `${date}: ${entry[1]}`;
      }
    );
    let collapsedMeasurements: string[] = fullMeasurements;
    if (fullMeasurements.length > 5) {
      collapsedMeasurements = [
        fullMeasurements[0],
        fullMeasurements[1],
        '...',
        fullMeasurements[fullMeasurements.length - 2],
        fullMeasurements[fullMeasurements.length - 1],
      ];
    }
    setMeasurementsList(
      measurementsCollapsed ? collapsedMeasurements : fullMeasurements
    );
    setFullMeasurementsList(fullMeasurements);
    setCollapsedMeasurementsList(collapsedMeasurements);
  }, [measurements, measurementsCollapsed]);

  useEffect(() => {
    let capitalizedVariable = `${variable
      .charAt(0)
      .toUpperCase()}${variable.slice(1)}`;
    setVariableLabel(capitalizedVariable);
  }, [variable]);

  const toggleGraph = () => {
    setGraph(!showGraph);
  };

  const toggleMeasurements = () => {
    setMeasurementsCollapsed(!measurementsCollapsed);
    setMeasurementsList(
      measurementsCollapsed ? fullMeasurementsList : collapsedMeasurementsList
    );
  };

  //place "Show/Hide Graph" button above
  //collapse measurements and expand on click
  //allow multiple graphs to be expanded at once
  return (
    <li className={styles.li}>
      <div className={styles['graph-toggle']} onClick={toggleGraph}>
        <div className={styles['graph-toggle-label']}>
          {showGraph ? 'Hide Graph' : 'Show Graph'}
        </div>
      </div>
      <div
        id={id}
        className={
          styles['graph-container'] +
          (showGraph ? ` ${styles['graph-container-expand']}` : '')
        }
      >
        <div id={`${id}_size_wrapper`}>
          <MeasurementsPlot measurements={measurements} layout={plotlyLayout} />
        </div>
      </div>
      <div>
        <div className={styles['variable-label']}>
          {`${variableLabel}`}
        </div>
      </div>
      <div className={styles['measurements-list']} onClick={toggleMeasurements}>
        {measurementsList.map((entry: string) => {
          return <div key={uuidv4()}>{entry}</div>;
        })}
      </div>
    </li>
  );
};

export default Measurements;

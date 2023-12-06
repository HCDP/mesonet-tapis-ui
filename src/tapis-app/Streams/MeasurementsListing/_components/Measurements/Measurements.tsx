import React, { useEffect, useState } from 'react';
import styles from './Measurements.module.scss';
import { v4 as uuidv4 } from 'uuid';
import MeasurementsPlot from '../MeasurementsPlot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

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

  const [showVariable, setShowVariable] = useState<boolean>(true);

  const [showGraph, setGraph] = useState<boolean>(true);
  const [measurementsList, setMeasurementsList] = useState<JSX.Element[]>([]);
  const [measurementsCollapsed, setMeasurementsCollapsed] =
    useState<boolean>(true);
  const [fullMeasurementsList, setFullMeasurementsList] = useState<JSX.Element[]>(
    []
  );
  const [collapsedMeasurementsList, setCollapsedMeasurementsList] = useState<
    JSX.Element[]
  >([]);
  const [variableLabel, setVariableLabel] = useState<string>('');

  useEffect(() => {
    let fullMeasurements = Object.entries(measurements).map(
      (entry: [string, number]) => {
        let date = entry[0].replace('T', ' ');
        return (
          <tr>
            <td>{date}</td>
            <td>{entry[1]}</td>
          </tr>
        );
      }
    );
    let collapsedMeasurements: JSX.Element[] = fullMeasurements;
    if (fullMeasurements.length > 5) {
      collapsedMeasurements = [
        fullMeasurements[0],
        fullMeasurements[1],
        <tr>
          <td>...</td>
          <td></td>
        </tr>,
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

  const toggleVariable = () => {
    setShowVariable(!showVariable);
  };

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
      <div className={styles['variable-toggle']} onClick={toggleVariable}>
        <div className={styles['variable-toggle-label']}>
          <FontAwesomeIcon
            className={
              styles['variable-toggle-caret'] +
              (showVariable ? '' : ` ${styles['variable-toggle-caret-expand']}`)
            }
            icon={faCaretDown}
            size="lg"
          />
          {`${variableLabel}`}
        </div>
      </div>
      <div
        id={`${id}_size_wrapper`}
        className={
          styles['variable-container'] +
          (showVariable ? ` ${styles['variable-container-expand']}` : '')
        }
      >
        <div>
          <MeasurementsPlot measurements={measurements} layout={plotlyLayout} />
        </div>
        <div className={styles['variable-control']}>
          <table className={styles['measurements-list']} onClick={toggleMeasurements}>
            <thead>
              <tr>
                <th>Date-time</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {measurementsList.map((entry: JSX.Element) => {
                return entry;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </li>
  );
};

export default Measurements;

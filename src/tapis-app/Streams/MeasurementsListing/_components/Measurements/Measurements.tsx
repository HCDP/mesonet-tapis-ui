import React, { useEffect, useState } from 'react';
import styles from './Measurements.module.scss';
import { v4 as uuidv4 } from 'uuid';
import MeasurementsPlot from '../MeasurementsPlot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { formatDateTime, utc2hst } from 'utils/timeFormat';
import DownloadVariables from '../DownloadVariables';

type MeasurementsType = { [datetime: string]: number };

function convert(measurements: MeasurementsType): MeasurementsType {
  let converted: MeasurementsType  = {};
  for(let timestamp in measurements) {
    converted[utc2hst(timestamp)] = measurements[timestamp];
  }
  return converted;
}

const Measurements: React.FC<{
  unit: string | undefined;
  variable: string;
  graphWidth: number;
  id: string;
  downloadName:string,
  measurements: { [datetime: string]: number };
}> = ({ variable, graphWidth, id, measurements, unit, downloadName }) => {
  let plotlyLayout: Partial<Plotly.Layout> = {
    width: graphWidth,
    height: 600,
    xaxis: {
      title: {
        text: "Timestamp"
      }
    },
    yaxis: {
      title: {
        text: `${variable}` + (unit ? ` (${unit})` : "")
      }
    }
  };
  

  const [hstMeasurements, setHstMeasurements] = useState<{ [datetime: string]: number }>({});
  useEffect(() => {
    let hstMeasurements = convert(measurements);
    setHstMeasurements(hstMeasurements)
  }, [measurements])

  const [showVariable, setShowVariable] = useState<boolean>(true);
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
    let fullMeasurements = Object.entries(hstMeasurements).map(
      (entry: [string, number]) => {
        let date = formatDateTime(new Date(entry[0]));
        return (
          <tr key={uuidv4()}>
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
        <tr key={uuidv4()}>
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
  }, [measurements, measurementsCollapsed, hstMeasurements]);

  useEffect(() => {
    let capitalizedVariable = `${variable
      .charAt(0)
      .toUpperCase()}${variable.slice(1)}`;
    setVariableLabel(capitalizedVariable);
  }, [variable]);

  const toggleVariable = () => {
    setShowVariable(!showVariable);
  };

  const stopProp = (e: any) => {
    e.stopPropagation();
  }

  const toggleMeasurements = () => {
    setMeasurementsCollapsed(!measurementsCollapsed);
    setMeasurementsList(
      measurementsCollapsed ? fullMeasurementsList : collapsedMeasurementsList
    );
  };
  let fileMeasurements: any = {};
  fileMeasurements[id] = measurements;
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
        <div className={styles['download-variable-button']} onClick={stopProp}>
          <DownloadVariables
            variables={[id]}
            measurements={fileMeasurements}
            fileName={downloadName}
            text="Download Variable"
          />
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
          <MeasurementsPlot 
            measurements={hstMeasurements}
            layout={plotlyLayout} />
        </div>
        <div className={styles['variable-control']}>
          <table className={styles['measurements-list']} onClick={toggleMeasurements}>
            <thead>
              <tr key={uuidv4()}>
                <th>Date-time</th>
                <th>Value {unit ? `(${unit})` : ""}</th>
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

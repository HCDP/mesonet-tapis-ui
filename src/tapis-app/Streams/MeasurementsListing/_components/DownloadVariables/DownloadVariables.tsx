import { localizeTimestamp } from 'utils/timeFormat';
import styles from './DownloadVariables.module.scss';
import { useState } from 'react';

const download = (variables: string[], measurements: { [key: string]: any; }, fileName: string, format: string, location: string) => {
  let stringified = "";
  let extracted: { [key: string]: any; } = {};
  for (let variable of variables) {
    extracted[variable] = {};
    //localize timestamps
    for(let timestamp in measurements[variable]) {
      extracted[variable][localizeTimestamp(location, timestamp)] = measurements[variable][timestamp];
    }
  }
  
  const lformat = format.toLowerCase();
  if (format === "JSON") {
    stringified = JSON.stringify(extracted);
  } else if (format === "CSV") {
    // TODO: convert to CSV string
    // get object keys, already done: variables
    // get dates (measurements[variable])
    // get values (measurements[date][variable])
    // store into array of arrays: key, date, value
    const CSVarr = [];
    for (let variable in extracted) {
      const dates = Object.keys(extracted[variable]);
      for (let date of dates) {
        CSVarr.push([variable, date, extracted[variable][date]]);
      }
    }
    stringified = CSVarr.map((row: any[]) => {
      return row.join(',');
    }).join('\n');
  } else {
    console.log("ERROR: Download format not recognized.");
    return;
  }
  const blob = new Blob([stringified], { type: `text/${lformat}` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = `${fileName}.${lformat}`;
  link.href = url;
  link.click();
  window.URL.revokeObjectURL(url);
}

const DownloadVariables: React.FC<{
  location: string;
  variables: string[];
  measurements: {
    [key: string]: any;
  }
  fileName: string;
  title?: string;
  text?: string;
}> = ({ variables, measurements, fileName, title, text, location }) => {
  const [ format, setFormat ] = useState('CSV');
  return (
    <div className={styles['wrapper']}>
      <button
        onClick={() => download(variables, measurements, fileName, format, location)}
        title={title ? title : `Download ${variables.length === 1 ? "this variable" : "all selected variables"} as a single ${format} file`}
      >
        {text}
      </button>
      <div className={styles['dropdown']}>
        <select onChange={(event) => {
          const format = event.target.value;
          setFormat(format);
        }}>
          <option value="CSV">CSV</option>
          <option value="JSON">JSON</option>
        </select>
      </div>
    </div>
  );
};

export default DownloadVariables;

import styles from './DownloadVariables.module.scss';
import { useState } from 'react';

const download = (variables: string[], measurements: { [key: string]: any; }, fileName: string, format: string) => {
  let stringified = "";
  let extracted: { [key: string]: any; } = {};
  for (let variable of variables) {
    extracted[variable] = measurements[variable];
  }
  const lformat = format.toLowerCase();
  console.log("Download data: ", format);
  if (format === "JSON") {
    stringified = JSON.stringify(extracted);
  } else if (format === "CSV") {
    // TODO: convert to CSV string
    return;
  } else {
    console.log("Download format not recognized.");
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
  variables: string[];
  measurements: {
    [key: string]: any;
  }
  fileName: string;
  title?: string;
  text?: string;
}> = ({ variables, measurements, fileName, title, text }) => {
  const [ format, setFormat ] = useState('JSON');
  return (
    <div className={styles['wrapper']}>
      <button
        onClick={() => download(variables, measurements, fileName, format)}
        title={title ? title : `Download ${variables.length === 1 ? "this variable" : "all selected variables"} as a single ${format} file`}
      >
        {text}
      </button>
      <div className={styles['dropdown']}>
        <select onChange={(event) => {
          const format = event.target.value;
          setFormat(format);
        }}>
          <option value="JSON">JSON</option>
          <option value="CSV">CSV</option>
        </select>
      </div>
    </div>
  );
};

export default DownloadVariables;

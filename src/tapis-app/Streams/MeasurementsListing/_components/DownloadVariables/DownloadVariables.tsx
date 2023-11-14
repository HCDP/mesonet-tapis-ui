import Button from 'tapis-app/_components/Button';
import styles from './DownloadVariables.module.scss';
import { useState } from 'react';

const download = (measurements: {[key: string]: any; }, format: string) => {
  console.log("Download data: ", format)
}

const DownloadVariables: React.FC<{
  measurements: {
    [key: string]: any;
  }
  text: string;
}> = ({ text, measurements }) => {
  const [ format, setFormat ] = useState('JSON');
  return (
    <div className={styles['wrapper']}>
      <Button onClick={() => download(measurements, format)} text={text} />
      <div className={styles['dropdown']}>
        <select id="format-select" onChange={() => {
          const format = (document.getElementById("format-select") as HTMLSelectElement).value;
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

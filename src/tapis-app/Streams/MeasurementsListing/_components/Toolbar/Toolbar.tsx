import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import styles from './Toolbar.module.scss';
import { Moment } from 'moment-timezone';
import { date2Moment, getNow, moment2Date } from 'utils/timeFormat';

const Toolbar: React.FC<{
  location: string;
  start: Moment | undefined;
  end: Moment | undefined;
  setStart: (start: Moment) => void;
  setEnd: (end: Moment) => void;
  setLimit: (limit: number | undefined) => void;
  setOffset: (offset: number | undefined) => void;
}> = ({ setStart, setEnd, setLimit, setOffset, start, end, location }) => {
  const [limitInput, setLimitInput] = useState<string>('');
  const [offsetInput, setOffsetInput] = useState<string>('');

  const createLimit = (event: any) => {
    let value = event.target.value;
    setLimitInput(value);
  };

  const createOffset = (event: any) => {
    let value = event.target.value;
    setOffsetInput(value);
  };

  const validateLimit = (event: any) => {
    let value: number | undefined = parseInt(event.target.value);
    if (isNaN(value)) {
      value = undefined;
    }
    if (value !== undefined && value < 1) {
      value = 1;
    }
    setLimitInput(value?.toString() || '');
    setLimit(value);
  };

  const validateOffset = (event: any) => {
    let value: number | undefined = parseInt(event.target.value);
    if (isNaN(value)) {
      value = undefined;
    }
    if (value !== undefined && value < 0) {
      value = 0;
    }
    setOffsetInput(value?.toString() || '');
    setOffset(value);
  };
  
  return (
    <div className={styles['control-bar']}>
      <div className={styles['control']}>
        Start Date
        <div>
          <DateTimePicker onChange={(date: Date) => setStart(date2Moment(date, location))} value={moment2Date(start!)} />
        </div>
      </div>
      <div className={styles['control']}>
        End Date
        <div>
          <DateTimePicker onChange={(date: Date) => setEnd(date2Moment(date, location))} value={moment2Date(end!)} />
        </div>
      </div>
      <div className={styles['control']}>
        Limit
        <div>
          <input
            className={styles['numeric-input']}
            type="number"
            value={limitInput}
            onChange={createLimit}
            onBlur={validateLimit}
          />
        </div>
      </div>
      <div className={styles['control']}>
        Offset
        <div>
          <input
            className={styles['numeric-input']}
            type="number"
            value={offsetInput}
            onChange={createOffset}
            onBlur={validateOffset}
          />
        </div>
      </div>
      <button onClick={() => setEnd(getNow(location))} title="Refresh to display data up until your current time">Refresh Latest Data</button>
    </div>
  );
};

export default Toolbar;

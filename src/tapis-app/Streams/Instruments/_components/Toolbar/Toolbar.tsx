import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import styles from './Toolbar.module.scss';

const Toolbar: React.FC<{
  start: Date | undefined;
  end: Date | undefined;
  setStart: (start: Date) => void;
  setEnd: (end: Date) => void;
  setLimit: (limit: number | undefined) => void;
  setOffset: (offset: number | undefined) => void;
}> = ({ setStart, setEnd, setLimit, setOffset, start, end }) => {
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
  
  const Button: React.FC<{
    onClick: () => void;
    text: String;
  }> = ({ onClick, text }) => {
    return (
      <button className={styles['button']} onClick={onClick}>{text}</button>
    );
  }

  return (
    <div className={styles['control-bar']}>
      <div className={styles['control']}>
        Start Date
        <div>
          <DateTimePicker onChange={setStart} value={start} />
        </div>
      </div>
      <div className={styles['control']}>
        End Date
        <div>
          <DateTimePicker onChange={setEnd} value={end} />
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
      <Button onClick={() => setEnd(new Date())} text="Refresh Latest Data" />
    </div>
  );
};

export default Toolbar;

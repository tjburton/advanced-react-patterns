import React, { useContext } from 'react';

import { MediumClapContext } from './context';

import styles from '../index.css';

const CountTotal = () => {
  const { countTotal, setRef } = useContext(MediumClapContext);

  return (
    <span ref={setRef} data-refkey='clapTotalRef' className={styles.total}>
      {countTotal}
    </span>
  );
};

export default CountTotal;

import React, { useState } from 'react';

import MediumClap from './03-components/MediumClap';
import ClapIcon from './03-components/ClapIcon';
import ClapCount from './03-components/ClapCount';
import CountTotal from './03-components/CountTotal';

import styles from './index.css';

MediumClap.Icon = ClapIcon;
MediumClap.Count = ClapCount;
MediumClap.Total = CountTotal;

const Usage = () => {
  const [count, setCount] = useState(0);

  const handleClap = (clapState) => {
    setCount(clapState.count);
  };

  return (
    <div style={{ width: '100%' }}>
      <MediumClap onClap={handleClap}>
        <MediumClap.Icon />
        <MediumClap.Count />
        <MediumClap.Total />
      </MediumClap>
      {!!count && (
        <div className={styles.info}>{`You have clapped ${count} times`}</div>
      )}
    </div>
  );
};

export default Usage;

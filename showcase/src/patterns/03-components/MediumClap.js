import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from 'react';

import useClapAnimation from './useClapAnimation';
import { Provider } from './context';

import styles from '../index.css';

const initialState = {
  count: 0,
  countTotal: 267,
  isClicked: false,
};

const MediumClap = ({ children, onClap }) => {
  const MAXIMUM_USER_CLAP = 50;
  const [clapState, setClapState] = useState(initialState);
  const { count, countTotal, isClicked } = clapState;

  const [{ clapRef, clapCountRef, clapTotalRef }, setRefState] = useState({});

  const setRef = useCallback((node) => {
    setRefState((prevRefState) => ({
      ...prevRefState,
      [node.dataset.refkey]: node,
    }));
  }, []);

  const animationTimeline = useClapAnimation({
    clapEl: clapRef,
    clapCountEl: clapCountRef,
    clapTotalEl: clapTotalRef,
  });

  // Used to stop the useEffect below to be invoked on first render.
  const componentJustMounted = useRef(true);

  useEffect(() => {
    if (!componentJustMounted.current) onClap && onClap(clapState);
    componentJustMounted.current = false;
  }, [count]);

  const handleClapClick = () => {
    animationTimeline.replay();

    setClapState((prevState) => ({
      count: Math.min(prevState.count + 1, MAXIMUM_USER_CLAP),
      countTotal:
        count < MAXIMUM_USER_CLAP
          ? prevState.countTotal + 1
          : prevState.countTotal,
      isClicked: true,
    }));
  };

  const memoizedValue = useMemo(
    () => ({
      ...clapState,
      setRef,
    }),
    [clapState, setRef]
  );

  return (
    <Provider value={memoizedValue}>
      <button
        ref={setRef}
        data-refkey='clapRef'
        className={styles.clap}
        onClick={handleClapClick}
      >
        {children}
      </button>
    </Provider>
  );
};

export default MediumClap;

import React, { useState, useEffect, useMemo } from 'react';

import GraphicLoader from './Graphic';
import SequenceLoader from './Sequence';

import { useStore } from 'store';

import { calcPrimes, getPrime, noop, asyncComponentLoader } from 'utils';
import config from 'config';

const Sequence = asyncComponentLoader(SequenceLoader);
const Graphic = asyncComponentLoader(GraphicLoader);

const DataVisualisation = props => {

  const {
    state: { primeNumbers, primeLowerBound, primeUpperBound, customSequence, range: { from, to }},
    actions: { setIsRunnerActive, showNotification },
    effects: { calculate },
  } = useStore();

  const [data, setData] = useState({});

  const primeLowerBoundCalc = useMemo(
    _ => calcRes(calculate.primeLowerBound, primeLowerBound.show, config.formulas.primeLowerBound, from, to),
    [from, to, primeLowerBound.show, calculate.primeLowerBound],
  );
  const primeUpperBoundCalc = useMemo(
    _ => calcRes(calculate.primeUpperBound, primeUpperBound.show, config.formulas.primeUpperBound, from, to),
    [from, to, primeUpperBound.show, calculate.primeUpperBound],
  );
  const customSequenceCalc = useMemo(
    _ => calcRes(calculate.customSequence, customSequence.show, customSequence.formula, from, to),
    [customSequence.formula, from, to, customSequence.show, calculate.customSequence],
  );
  const primes = useMemo(
    _ => primeNumbers.show ? calcPrimes(getPrime, from, to) : noop(),
    [from, to, primeNumbers.show],
  );

  useEffect(_ => {
    setIsRunnerActive(true);
    Promise.all([
      primeLowerBoundCalc,
      primeUpperBoundCalc,
      customSequenceCalc,
    ])
    .then(([{ value: primeLowerBound }, { value: primeUpperBound }, { value: customSequence }]) => {
      setData({ from, to, primeLowerBound, primeUpperBound, customSequence, primeNumbers: primes });
    })
    .catch(({ error }) => showNotification({ message: error, variant: 'error' }))
    .finally(_ => setIsRunnerActive(false));
  }, [
    setIsRunnerActive,
    showNotification,
    primeLowerBoundCalc,
    primeUpperBoundCalc,
    customSequenceCalc,
    primes, from, to,
  ]);

  return <>
    {
      props.active === 'graphic'
        ? <Graphic data={data} />
        : <Sequence data={data} />
    }
  </>
};

function calcRes(calculator, isActive, formula, from, to, fnName = config.defaultFnName) {
  return isActive ? calculator(formula, { from, to }, fnName) : _ => ({});
}

export default DataVisualisation;

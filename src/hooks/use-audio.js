import {useEffect, useContext, createContext} from 'react';

const context = new (window.AudioContext || window.webkitAudioContext)(),
  master = new GainNode(context),
  analyzer = new AnalyserNode(context, {
    fftSize: 8192,
    smoothingTimeConstant: 0.9,
    minDecibels: -80,
    maxDecibels: -30
  });
master.connect(context.destination);
master.connect(analyzer);

const globals = createContext({
  context,
  master,
  analyzer
});

/**
 * Grants a component access to a shared AudioContext.
 */
export default () => {
  const {context, master, analyzer} = useContext(globals);
  useEffect(() => async () => {
    await context.close();
  }, [context]);
  return {context, master, analyzer};
};

import {useEffect} from 'react';

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

let resumeId = setInterval(() => {
  if (context.state === "suspended") {
    context.resume().catch(() => {});
  } else {
    clearInterval(resumeId);
  }
}, 500);

/**
 * Grants a component access to a shared AudioContext.
 */
export default () => {
  useEffect(() => async () => {
    await context.close();
  }, [context]);
  return {context, master, analyzer};
};

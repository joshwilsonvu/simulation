import React, {useRef, useState, useCallback} from 'react';
import useAudio from '../hooks/use-audio';
import useAnimationFrame from '../hooks/use-animation-frame';

export const TimeAnalyzer = ({width, height}) => {
  const {analyzer} = useAudio();
  const timeRef = useRef(null);
  const [shown, setShown] = useState(false);

  const getTimeData = useCallback(() => {
    let time = new Uint8Array(analyzer.fftSize);
    analyzer.getByteTimeDomainData(time);
    return time;
  }, [analyzer]);

  const plot = useCallback(time => {
    if (time && timeRef.current) {
      const c = timeRef.current;
      const height = c.height;
      const width = c.width;
      const ctxt = c.getContext('2d');
      const n = Math.min(time.length, width);

      // draw time data
      ctxt.lineWidth = 2;
      ctxt.strokeStyle = '#555';
      ctxt.clearRect(0, 0, width, height);
      ctxt.beginPath();
      ctxt.moveTo(0, height / 2);
      for (let i = 0; i < n; i += 0.5) {
        const x = i * width / n;
        const point = time[Math.round(i * time.length / n)];
        const y = (point / 255) * height;
        ctxt.lineTo(x, y);
      }
      ctxt.lineTo(width, height / 2);
      ctxt.stroke();
    }
  }, []);

  useAnimationFrame(() => {
    if (shown) {
      plot(getTimeData());
    }
  });


  return (
    <>
      <div>
        <button onClick={() => setShown(!shown)}>{shown ? 'Hide' : 'Show'} Signal</button>
      </div>
      {shown ? <canvas width={width} height={height} style={{border: '1px solid gray'}} ref={timeRef}/> : null}
    </>
  );
};

export const FreqAnalyzer = ({width, height}) => {
  const {analyzer} = useAudio();
  const freqRef = useRef(null);
  const [shown, setShown] = useState(false);

  const getFreqData = useCallback(() => {
    let freq = new Uint8Array(analyzer.fftSize);
    analyzer.getByteFrequencyData(freq);
    return freq;
  }, [analyzer]);

  const plot = useCallback(freq => {
    if (freq && freqRef.current) {
      const c = freqRef.current;
      const height = c.height;
      const width = c.width;
      const expMaxX = Math.log2(freq.length / 2);
      const ctxt = c.getContext('2d');

      // draw frequency data
      ctxt.lineWidth = 1;
      ctxt.strokeStyle = '#555';
      ctxt.fillStyle = '#555';
      ctxt.clearRect(0, 0, width, height);
      ctxt.beginPath();
      ctxt.moveTo(0, height);
      for (let i = 1; i < freq.length / 2; ++i) {
        // log x axis
        const x = (Math.log2(i) / expMaxX) * width;
        const point = freq[i];
        const y = ((255 - point) / 255) * height;
        ctxt.lineTo(x, y);
      }
      ctxt.lineTo(width, height);
      ctxt.closePath();
      ctxt.stroke();
      ctxt.fill();
    }
  }, []);

  useAnimationFrame(() => {
    if (shown) {
      plot(getFreqData());
    }
  });

  return (
    <>
      <div>
        <button onClick={() => setShown(!shown)}>{shown ? 'Hide' : 'Show'} Frequencies</button>
      </div>
      {shown ? <canvas width={width} height={height} ref={freqRef} style={{
        border: '1px solid gray',
        width: width,
        height: height
      }}/> : null}
    </>
  );
};
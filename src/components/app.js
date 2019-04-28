import React, {useState, useCallback, useRef} from 'react';
import {Helmet} from 'react-helmet-async';

import {Root, AudioDiv} from './layouts';

import Piano from './piano';
import Audio from './audio';
import useClientRect from '../hooks/use-client-rect';
import KarplusStrong from '../worklets/karplus-strong.worklet';
import useEventListener from '@use-it/event-listener';
import {TimeAnalyzer, FreqAnalyzer} from './analyzers';


const If = ({cond, ...rest}) => (cond ? <React.Fragment {...rest}/> : <></>);


export const App = () => {
  const [loaded, setLoaded] = useState(false);

  useEventListener('load', () => setLoaded(true));

  const audio = useRef(null);
  const [rect, containerRef] = useClientRect();
  const playNote = useCallback(note => {
    audio.current.playNote(note);
  }, [audio]);
  const stopNote = useCallback(note => {
    audio.current.stopNote(note);
  }, [audio]);

  return (
    <>
      <Helmet key={window.location.href}>
        <title>Simulation</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,700"/>
      </Helmet>
      <If cond={loaded}>
        <Root>
          <h3>Music Simulation</h3>
          <p>Let&apos;s make some music.</p>
          <p>This simulation uses the <a href="https://en.wikipedia.org/wiki/Karplus%E2%80%93Strong_string_synthesis">Karplus
            Strong</a> algorithm to synthesize a plucked string.</p>
          <p>Use the keyboard below to play notes, and try modifying the algorithm parameters. You can view the signals
            using the signal and frequency viewers.</p>
          <div style={{width: "100%"}} ref={containerRef}>
            <Piano playNote={playNote} stopNote={stopNote} width={rect.width}/>
          </div>
          <br/>
          <TimeAnalyzer width={rect.width} height={160}/>
          <FreqAnalyzer width={rect.width} height={160}/>
          <AudioDiv>
            <Audio module={KarplusStrong} name="karplus-strong" ref={audio}
                   disabled={audio.current && !audio.current.isLoaded()}/>
          </AudioDiv>
        </Root>
      </If>
    </>
  );
};

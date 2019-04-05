import React, {useEffect, useState, useCallback, useRef} from 'react';
import {Helmet} from 'react-helmet-async';

import {Root} from './layouts';

import Piano from './piano';
import Audio from './audio';
import useClientRect from '../hooks/use-client-rect';
import KarplusStrong from '../worklets/karplus-strong.worklet';
import useEventListener from '@use-it/event-listener';


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
          <h4>Hello world!</h4>
          <p>Use the keyboard below to play notes.</p>
          <div style={{width: '100%', maxWidth: '30rem', minHeight: '10rem'}} ref={containerRef}>
            <Piano playNote={playNote} stopNote={stopNote} width={rect.width}/>
          </div>
          <Audio module={KarplusStrong} name="karplus-strong" ref={audio} disabled={audio.current && !audio.current.isLoaded()}/>
        </Root>
      </If>
    </>
  );
};

import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';

import {Root} from './layouts';

import Volume from './volume';
import Piano from './piano';
import connect from 'react-redux/es/connect/connect';
import {noteOn, noteOff} from '../actions/actions';

const If = ({cond, ...rest}) => (cond ? <React.Fragment {...rest}/> : <></>);


export const App = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => window.addEventListener('load', e => setLoaded(true)), []);
  return (
    <>
      <Helmet>
        <title>Simulation</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,700"/>
      </Helmet>
      <If cond={loaded}>
        <Root>
          <h4>Hello world!</h4>
          <p>Use the slider below to change the master volume.</p>
          <Volume/>
          <p>Use the keyboard below to play notes.</p>
          <div style={{width: '100%', maxWidth: '30rem'}}>
            <Piano/>
          </div>
        </Root>
      </If>
    </>
  );
};

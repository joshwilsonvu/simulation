import React from 'react';
import {Helmet} from 'react-helmet';

import {Root} from './layouts';

import Volume from './volume';


export const App = ({classes}) => (
  <>
    <Helmet>
      <title>Simulation</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,700"/>
    </Helmet>
    <Root>
      <h4>Hello world!</h4>
      <p>Use the slider below to change the master volume.</p>
      <Volume/>
    </Root>
  </>
);

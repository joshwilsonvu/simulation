import React from 'react';
import styled from 'styled-components';
import {Helmet} from 'react-helmet';
import {Typography, Paper, withStyles} from '@material-ui/core';

import Volume from './volume';

const styles = {
  root: {
    margin: '2rem',
    padding: '2rem',
    maxWidth: '30rem',
    textAlign: 'center'
  }
};

export const App = withStyles(styles)(props => (
  <>
    <Helmet>
      <title>Simulation</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
    </Helmet>
    <Paper className={props.classes.root}>
      <Typography variant="h4" gutterBottom>Hello world!</Typography>
      <Typography>Use the slider below to change the master volume.</Typography>
      <Volume/>
    </Paper>
  </>
));

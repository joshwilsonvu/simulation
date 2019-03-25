import React from 'react';
import {connect} from 'react-redux';
import {Posts} from './posts';
import {Entry} from './entry';
import {Login} from './login';

export const Main = connect(
  store => ({
    username: store.session.username
  })
)(props => (
  <>
    {
      props.username ? <Entry/> : <Login/>
    }
    <Posts/>
  </>
));
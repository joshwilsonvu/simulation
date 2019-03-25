import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {PostBase, PostBody, PostMedia} from './layouts';
import {Confirm} from './confirmation';
import {sessionBegin} from '../actions/session';

const Input = styled.input`
  margin: 0.5rem;
  border: hidden;
  outline: none;
  font-family: inherit;
  background-color: ${props => props.theme.postColor};
  :invalid {
    background-color: ${props => props.theme.errorColor};
  }
`;

const NoWrap = styled.span`
  white-space: nowrap;
`;

class LoginBase extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
  }

  render() {
    return (
      <form onSubmit={event => {
        event.preventDefault();
        this.props.onSubmit(this.state.username, this.state.password);
      }}>
        <PostBase>
          <PostBody>
            <div>
              <NoWrap>
                <label htmlFor="username">Username:&nbsp;</label>
                <Input id="username" name="username" type="text" required maxLength={32} pattern="^[0-9a-zA-Z]+$"
                       value={this.state.username}
                       onChange={event => this.setState({username: event.target.value})}/>
              </NoWrap>
            </div>
            <div>
              <NoWrap>
                <label htmlFor="password">Password:&nbsp;</label>
                <Input id="password" name="password" type="password" required minLength={6} maxLength={32}
                       value={this.state.password}
                       onChange={event => this.setState({password: event.target.value})}/>
              </NoWrap>
            </div>
            <div>
              {
                this.props.error
                  ? 'That username and password combination isn\'t on file — try again.'
                  : 'Login with an existing username and password, or sign up for a new account.'
              }
            </div>
          </PostBody>
          <PostMedia>
            <Confirm confirmProps={{type: 'submit'}}/>
          </PostMedia>
        </PostBase>
      </form>
    );
  }
}

export const Login = connect(
  state => ({
    error: state.session.error
  }),
  dispatch => ({
    onSubmit: (username, password) => dispatch(sessionBegin(username, password))
  })
)(LoginBase);

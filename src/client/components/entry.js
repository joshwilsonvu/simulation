import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {postCreate} from '../actions/post';
import {PostBase, PostBody, PostMedia} from './layouts';
import {Confirm} from './confirmation';
import {validatePost} from '../../shared/index';

const TextArea = styled.textarea`
  min-height: 3rem;
  width: 100%;
  margin: 0 0.5rem 0 0;
  border: hidden;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  background-color: ${props => props.theme.postColor};
  resize: vertical;
`;

class EntryBase extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    const valid = validatePost(this.state.text) === undefined;
    return (
      <form onSubmit={event => {
        event.preventDefault();
        if (valid) {
          this.props.post(this.state.text);
          this.setState({text: ''});
        }
      }}>
        <PostBase>
          <PostBody>
            <TextArea autoFocus name="text"
                      placeholder={'Talk about something...'}
                      onChange={event => this.setState({text: event.target.value})} value={this.state.text}/>
          </PostBody>
          <PostMedia>
            <Confirm confirmProps={{type: 'submit'}} onDeny={event => this.setState({text: ''})}/>
          </PostMedia>
        </PostBase>
      </form>
    );
  }
}

// Only works if logged in
export const Entry = connect(
  undefined,
  dispatch => ({
    post: text => dispatch(postCreate(text))
  })
)(
  EntryBase
);
import styled from 'styled-components';

export const Root = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  border-style: hidden;
  padding: 0;
  margin: 0 auto;
  background-color: ${props => props.theme.backgroundColor}
`;

export const AudioDiv = styled.div`
  width: 100%;
  maxWidth: ${props => props.theme.maxWidth};
  minHeight: 160px;
`;
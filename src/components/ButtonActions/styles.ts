import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: ${props => props.color ? props.color : "#171717"};
  height: 45px;
  width: 50px;
  border-radius: 5px;
  border: 0;
  padding: 0 5px;
  margin: 0.1rem;
  color: #fff;
  font-weight: 500;
  transition: background-color 0.2s;
  &:hover {
    background: ${shade(0.2, '#9400D3')};
  }
`;

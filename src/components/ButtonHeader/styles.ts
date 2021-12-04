import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #9400D3;
  height: 30px;
  border-radius: 5px;
  border: 0;
  padding: 5px 16px;
  color: #fff;
  width: 100%;
  margin-top: 16px;
  transition: background-color 0.2s;
  &:hover {
    background: ${shade(0.2, '#171717')};
  }
`;

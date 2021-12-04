import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: auto auto auto 0;
`;

export const Items = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 50px;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 800;
    color: #9400D3;
  }

  img {
    width: 5rem;
    padding: 0.7rem;
  }

  span {
    font-weight: 500;
    color: #9400D3;
  }
`;

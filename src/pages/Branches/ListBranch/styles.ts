import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 0 25px;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-bottom: 2rem;
`;

export const ContainerButton = styled.div`
  margin: auto 1rem auto 1rem;
`;

export const Table = styled.table`
  width: 60%;
  border-collapse: separate;
  border-spacing: 0 1em;

  td {
    padding: 2px 10px 2px 10px;
    background-color: #E2E2E2;
    color: #000;
  }
`;

export const TextId = styled.td`
  font-size: 0.7rem;
  text-align: left;
  max-width: 50px;
  width: auto;
  min-width: 10px;
`;

export const TextName = styled.td`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: left;
`;

export const TextNumber = styled.td`
  font-size: 0.8rem;
  text-align: end;
`;

export const Buttons = styled.td`
  max-width: 110px;
  width: auto;
  min-width: 10px;
`;

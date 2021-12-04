import React from 'react';
import Logo from '../../assets/images/logo-white.svg'
import { Container, Items } from './styles';

const Title: React.FC = () => (
  <Container>
    <Items>
      <h1>Cabelex</h1>
      <img src={Logo} alt="Logo Cabelex" />
      <span>Venda de produtos de beleza</span>
    </Items>
  </Container>
);
export default Title;

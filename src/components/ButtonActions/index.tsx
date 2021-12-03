import React, { ButtonHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
import { Link } from 'react-router-dom';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  icon?: React.ComponentType<IconBaseProps>;
  to: string;
};

const ButtonActions: React.FC<ButtonProps> = ({
  children,
  loading,
  icon: Icon,
  to,
  ...rest
}) => {
  return (
    <Link to={to}>
      <Container type="button" {...rest}>
        {loading ? 'Carregando...' : children}
        {Icon && <Icon size={20} />}
      </Container>
    </Link>
  );
};

export default ButtonActions;

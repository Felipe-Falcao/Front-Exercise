/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import Button from '../../../components/Button';
import { useToast } from '../../../hooks/toast';

import { ParamTypes } from '../../../interfaces/params';

import { Container, AnimationContainer, Header } from './styles';

const DeleteBranch: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { id } = useParams<ParamTypes>();
  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(async () => {
    try {
      formRef.current?.setErrors({});

      // await api.delete(`/branches/delete/${id}`);

      history.push(`/listBranch`);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao editar filial',
        description: 'Ocorreu ao editar uma filial, tente novamente.',
      });
    }
  }, [addToast, history, id]);

  return (
    <Container>
      <Header>
        <Link to="/listBranch">
          <FiArrowLeft size={40} />
        </Link>
      </Header>
      <AnimationContainer>
        <h1>Deseja excluir filial ?</h1>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Button type="submit">Sim</Button>
        </Form>
        <Link to="/listBranch">
          <Button color="#171717" type="button">Não</Button>
        </Link>
      </AnimationContainer>
    </Container>
  );
};

export default DeleteBranch;

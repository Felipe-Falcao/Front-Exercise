/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import Button from '../../../components/Button';

import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

import { ParamDoubleIdTypes } from '../../../interfaces/params';

import {
  Container,
  AnimationContainer,
  Header,
  DeleteContainer,
} from './styles';

const DeleteEmployee: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { branch_id, id } = useParams<ParamDoubleIdTypes>();

  const history = useHistory();

  const handleSubmit = useCallback(async () => {
    try {
      formRef.current?.setErrors({});

      // await api.delete(`/employees/delete/${branch_id}/${id}`);

      addToast({
        type: 'success',
        title: 'Funcionário removido com sucesso',
        description: 'O funcionário selecionado foi removido com sucesso.',
      });

      history.push(`/listEmployees/${branch_id}`);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao remover funcionário',
        description: 'Ocorreu ao remover uma funcionário, tente novamente.',
      });
    }
  }, [addToast, branch_id, history, id]);

  return (
    <Container>
      <Header>
        <Link to={`/listEmployees/${branch_id}`}>
          <FiArrowLeft size={40} />
        </Link>
      </Header>
      <AnimationContainer>
        <h1>Deseja excluir funcionário ?</h1>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Button type="submit">Sim</Button>
        </Form>

        <DeleteContainer>
          <Link to={`/listEmployees/${branch_id}`}>
            <Button color="#171717" type="button">Não</Button>
          </Link>
        </DeleteContainer>
      </AnimationContainer>
    </Container>
  );
};

export default DeleteEmployee;

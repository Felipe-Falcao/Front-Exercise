/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import getValidationErrors from '../../../utils/getValidationErrors';
import { BranchFormData } from '../../../interfaces/branches';
import { useToast } from '../../../hooks/toast';
import { useApp } from '../../../hooks/app_context'
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { Container, AnimationContainer, Header } from './styles';

const CreateBranch: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { registerBranch } = useApp();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: BranchFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        registerBranch(data.name);

        history.push('/listBranch');

        addToast({
          type: 'success',
          title: 'Filial cadastrada!',
          description: 'Filial cadastrada com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Header>
        <Link to="/listBranch">
          <FiArrowLeft size={40} />
        </Link>
      </Header>
      <AnimationContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Cadastrar Filial</h1>

          <Input name="name" placeholder="Nome da filial" />

          <Button type="submit">Cadastrar</Button>
        </Form>
      </AnimationContainer>
    </Container>
  );
};

export default CreateBranch;

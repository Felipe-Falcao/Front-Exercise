/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import getValidationErrors from '../../../utils/getValidationErrors';
import { EmployeeFormData } from '../../../interfaces/employees';
import { useToast } from '../../../hooks/toast';
import { useApp } from '../../../hooks/app_context';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { Container, AnimationContainer, Header } from './styles';
import { ParamTypes } from '../../../interfaces/params';

const CreateEmploye: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { id } = useParams<ParamTypes>();

  const { addToast } = useToast();
  const history = useHistory();
  const { registerEmployee } = useApp();

  const handleSubmit = useCallback(
    async (data: EmployeeFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          branch_name: Yup.string().required('Nome da filial obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        registerEmployee(id, data.branch_name, data.name);

        history.push(`/listEmployees/${id}`);

        addToast({
          type: 'success',
          title: 'Funcionário cadastrado!',
          description: 'Funcionário cadastrado com sucesso!',
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
    [addToast, history, id],
  );

  return (
    <Container>
      <Header>
        <Link to={`/listBranch/${id}`}>
          <FiArrowLeft size={40} />
        </Link>
      </Header>
      <AnimationContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Cadastrar Funcionário</h1>

          <Input name="name" placeholder="Nome do Funcionário" />

          <Input name="branch_name" placeholder="Nome da Filial" />

          <Button type="submit">Cadastrar</Button>
        </Form>
      </AnimationContainer>
    </Container>
  );
};

export default CreateEmploye;

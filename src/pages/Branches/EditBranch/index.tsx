/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory, useParams } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

import getValidationErrors from '../../../utils/getValidationErrors';

import { ListBranchesDTO, BranchFormData } from '../../../interfaces/branches';
import { ParamTypes } from '../../../interfaces/params';

import { Container, AnimationContainer, Header } from './styles';

import showBranches from '../../../services/branches/showBranches'

const EditBranch: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { id } = useParams<ParamTypes>();
  const { addToast } = useToast();

  const history = useHistory();
  const [branch, SetBranch] = useState<ListBranchesDTO>();

  useEffect(() => {
    const branchs = showBranches({ id });
    SetBranch(branchs);
  }, [id]);

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
        console.log(data);

        // await api.put(`/branches/update/${id}`, data);

        history.push(`/listEmployees/${id}`);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao editar filial',
          description: 'Ocorreu ao editar uma filial, tente novamente.',
        });
      }
    },
    [addToast, history, id],
  );

  return (
    <Container>
      <Header>
        <Link to={`/listEmployees/${id}`}>
          <FiArrowLeft size={40} />
        </Link>
      </Header>
      <AnimationContainer>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{ name: branch?.name }}
        >
          <h1>Editar Filial</h1>

          <Input name="name" placeholder="Nome da filial" />
          <Input
            name="total_staff"
            value={branch?.total_staff}
            defaultValue={branch?.total_staff}
          />

          <Button type="submit">Editar</Button>
        </Form>
      </AnimationContainer>
    </Container>
  );
};

export default EditBranch;

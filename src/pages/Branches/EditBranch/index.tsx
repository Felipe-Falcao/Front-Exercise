/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { useToast } from '../../../hooks/toast';
import { useApp } from '../../../hooks/app_context';
import getValidationErrors from '../../../utils/getValidationErrors';
import { ListBranchesDTO, BranchFormData, Branch } from '../../../interfaces/branches';
import { ParamTypes } from '../../../interfaces/params';
import { Container, AnimationContainer, Header } from './styles';

import showBranches from '../../../services/branches/showBranches'



const EditBranch: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { id } = useParams<ParamTypes>();
  const { addToast } = useToast();
  const { editBranch, getBranch } = useApp();

  const history = useHistory();
  const [branch, SetBranch] = useState<Branch>();

  useEffect(() => {
    const branchs = getBranch(id);
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

        editBranch(id, data.name);

        history.push(`/listBranch`);
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
        <Link to="/listBranch">
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

          <Button type="submit">Editar</Button>
        </Form>
      </AnimationContainer>
    </Container>
  );
};

export default EditBranch;

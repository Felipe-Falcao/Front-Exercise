/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import getValidationErrors from '../../../utils/getValidationErrors';
import {
  EmployeeFormData,
  ListEmployeesDTO,
} from '../../../interfaces/employees';
import { useToast } from '../../../hooks/toast';
import { useApp } from '../../../hooks/app_context';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { Container, AnimationContainer, Header } from './styles';
import { ParamDoubleIdTypes } from '../../../interfaces/params';

const EditEmployee: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { branch_id, id } = useParams<ParamDoubleIdTypes>();

  const { addToast } = useToast();
  const { getEmployee, editEmployee } = useApp();
  const history = useHistory();

  const [employee, setEmployee] = useState<ListEmployeesDTO>();

  useEffect(() => {
    const employeeData = getEmployee(branch_id, id);
    setEmployee(employeeData);
  }, [branch_id, id]);

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

        editEmployee(data.name, data.branch_name, id);

        history.push(`/listEmployees/${employee?.branch_id}`);

        addToast({
          type: 'success',
          title: 'Dados do funcionário editados!',
          description: 'Dados do funcionário foram editados com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na edição dos dados',
          description:
            'Ocorreu um erro ao fazer a edição dos dados, tente novamente.',
        });
      }
    },
    [addToast, employee?.branch_id, history, id],
  );

  return (
    <Container>
      <Header>
        <Link to={`/listEmployees/${employee?.branch_id}`}>
          <FiArrowLeft size={40} />
        </Link>
      </Header>
      <AnimationContainer>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            name: employee?.name,
            branch_name: employee?.branch_name,
          }}
        >
          <h1>Editar dados</h1>

          <Input name="name" placeholder="Nome do Funcionário" />

          <Input name="branch_name" placeholder="Nome da Filial" />

          <Button type="submit">Editar</Button>
        </Form>
      </AnimationContainer>
    </Container>
  );
};

export default EditEmployee;

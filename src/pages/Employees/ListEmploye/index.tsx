/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import Button from '../../../components/Button';

import CardEmployee from '../../../components/CardEmployee';
import { ListEmployeesDTO } from '../../../interfaces/employees';
import { ParamTypes } from '../../../interfaces/params';
import api from '../../../services/api';

import { Container, Content, ContainerButton, Header } from './styles';

import getListEmployees from '../../../services/employees/getListEmployees';

const ListEmploye: React.FC = () => {
  const [employees, setEmployees] = useState<ListEmployeesDTO[]>([]);
  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    const employeesList = getListEmployees();
    setEmployees(employeesList);

  }, [id]);
  return (
    <Container>
      <Header>
        <Link to="/listBranch">
          <FiArrowLeft size={40} />
        </Link>
        <h1>Funcionários</h1>
      </Header>
      <ContainerButton>
        <Link to={`/createEmployee/${id}`}>
          <Button>Cadastrar funcionário</Button>
        </Link>
      </ContainerButton>
      <Content>
        {employees.map(employee => (
          <CardEmployee
            id={employee.id.substring(0, 6)}
            link={[
              `/editEmployee/${employee.branch_id}/${employee.id}`,
              `/deleteEmployee/${employee.branch_id}/${employee.id}`,
            ]}
            name={employee.name}
            branch={employee.branch_name}
            key={employee.id}
          />
        ))}
      </Content>
    </Container>
  );
};

export default ListEmploye;

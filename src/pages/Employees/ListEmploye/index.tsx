/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import ButtonHeader from '../../../components/ButtonHeader';
import ButtonActions from '../../../components/ButtonActions';
import { ListEmployeesDTO } from '../../../interfaces/employees';
import { ParamTypes } from '../../../interfaces/params';

import { Container, ContainerButton, Header, Table, TextId, TextName, TextNumber, Buttons } from './styles';

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
      <ContainerButton>
        <Link to={`/createEmployee/${id}`}>
          <ButtonHeader>Cadastrar funcionário</ButtonHeader>
        </Link>
      </ContainerButton>
      <Header>
        <Link to="/listBranch">
          <FiArrowLeft size={40} />
        </Link>
        <h1>Funcionários</h1>
      </Header>
      <Table>
        {
          employees.length > 0
            ? employees.map(employee => (
              <tr>
                <TextId>
                  ID {`${employee.id.substring(0, 6)}  ${Math.floor(
                    Math.random() * 65536)}`}
                </TextId>
                <TextName>{employee.name}</TextName>
                <TextNumber>{employee.branch_name}</TextNumber>
                <Buttons>
                  <ButtonActions icon={FiEdit} to={`/editEmployee/${employee.branch_id}/${employee.id}`} />
                  <ButtonActions color="#4B0082" icon={FiTrash2} to={`/deleteEmployee/${employee.branch_id}/${employee.id}`} />
                </Buttons>
              </tr>
            ))
            : <p>Não há funcionários cadastrados no momento.</p>
        }
      </Table>
    </Container>
  );
};

export default ListEmploye;

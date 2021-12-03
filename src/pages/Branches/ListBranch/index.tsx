/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiEdit, FiTrash2 } from 'react-icons/fi';
import getListBranches from '../../../services/branches/getListBranches';

import { ListBranchesDTO } from '../../../interfaces/branches';
import api from '../../../services/api';
import Button from '../../../components/Button';

import { useAuth } from '../../../hooks/auth';

import { Container, ContainerButton, Table, TextId, TextName, TextNumber, Buttons } from './styles';
import ButtonActions from '../../../components/ButtonActions';

const ListBranch: React.FC = () => {
  const [branches, SetBranches] = useState<ListBranchesDTO[]>([]);
  const { signOut } = useAuth();

  useEffect(() => {
    api.get(`/branches/index`).then(response => {
      SetBranches(response.data);
    });

    const getBranches = getListBranches();
    SetBranches(getBranches);
    // getListBranches.then(response => {
    //   SetBranches(response.data);
    // });

  }, []);

  return (
    <Container>
      <h1>Filiais cadastradas</h1>
      <ContainerButton onClick={() => signOut()}>
        <Link to="/">
          <Button>Deslogar</Button>
        </Link>
      </ContainerButton>
      <ContainerButton>
        <Link to="/createBranch">
          <Button>Cadastrar filial</Button>
        </Link>
      </ContainerButton>
      <Table>
        {
          branches.map(branch => (
            <tr>
              <TextId>
                ID {`${branch.id.substring(0, 4)}  ${Math.floor(
                  Math.random() * 65536)}`}
              </TextId>
              <TextName>{branch.name}</TextName>
              <TextNumber>{branch.total_staff} Funcionários</TextNumber>
              <Buttons>
                <ButtonActions icon={FiSearch} to={`/listEmployees/${branch.id}`} />
                <ButtonActions icon={FiEdit} to={`/editBranch/${branch.id}`} />
                <ButtonActions icon={FiTrash2} to={`/deleteBranch/${branch.id}`} />
              </Buttons>
            </tr>
          ))
        }

      </Table>
    </Container>
  );
};

export default ListBranch;

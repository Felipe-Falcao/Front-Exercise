/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiUsers } from 'react-icons/fi';
import { ListBranchesDTO } from '../../../interfaces/branches';
import api from '../../../services/api';
import ButtonHeader from '../../../components/ButtonHeader';
import { useAuth } from '../../../hooks/auth';
import { useApp } from '../../../hooks/app_context';
import { Container, ContainerButton, Table, TextId, TextName, TextNumber, Buttons, Header } from './styles';
import ButtonActions from '../../../components/ButtonActions';

const ListBranch: React.FC = () => {
  const [branches, SetBranches] = useState<ListBranchesDTO[]>([]);
  const { signOut } = useAuth();
  const { getListBranches } = useApp();

  useEffect(() => {
    api.get(`/branches/index`).then(response => {
      SetBranches(response.data);
    });

    const getBranches = getListBranches();
    SetBranches(getBranches);

  }, []);

  return (
    <Container>
      <Header>
        <ContainerButton>
          <Link to="/createBranch">
            <ButtonHeader>Cadastrar filial</ButtonHeader>
          </Link>
        </ContainerButton>
        <ContainerButton>
          <ButtonHeader onClick={() => signOut()}>Deslogar</ButtonHeader>
        </ContainerButton>
      </Header>
      <h1>Filiais cadastradas</h1>
      <Table>
        {
          branches.length > 0
            ?
            branches.map(branch => (
              <tr>
                <TextId>
                  ID {`${branch.id}`}
                </TextId>
                <TextName>{branch.name}</TextName>
                <TextNumber>{branch.total_staff} Funcionários</TextNumber>
                <Buttons>
                  <ButtonActions icon={FiUsers} to={`/listEmployees/${branch.id}`} />
                  <ButtonActions icon={FiEdit} to={`/editBranch/${branch.id}`} />
                  <ButtonActions color="#4B0082" icon={FiTrash2} to={`/deleteBranch/${branch.id}`} />
                </Buttons>
              </tr>
            ))
            : <p>Não há filiais cadastradas no momento.</p>
        }
      </Table>
    </Container>
  );
};

export default ListBranch;

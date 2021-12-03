import { ListBranchesDTO } from '../../interfaces/branches';

interface ReceivedData {
  id: string;
}

export default function getListBranches({ id }: ReceivedData): ListBranchesDTO | undefined {
  let chooseBranch = { id: '', name: '', total_staff: '' };

  const branches = [
    { id: '1', name: 'Barueri', total_staff: '22' },
    { id: '2', name: 'Atalaia', total_staff: '5' },
    { id: '3', name: 'Morumbi', total_staff: '2' },
    { id: '4', name: 'Batistão', total_staff: '47' },
  ]

  for (let i = 0; i < branches.length; i++) {
    if (branches[i].id === id) {
      chooseBranch = branches[i];
    }
  }

  return chooseBranch;
}

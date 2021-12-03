import { ListBranchesDTO } from '../../interfaces/branches';

export default function getListBranches(): ListBranchesDTO[] {
  return [
    { id: '1', name: 'Barueri', total_staff: '22' },
    { id: '2', name: 'Atalaia', total_staff: '5' },
    { id: '3', name: 'Morumbi', total_staff: '2' },
    { id: '4', name: 'Batistão', total_staff: '47' },
  ]
}

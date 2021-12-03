import { ListEmployeesDTO } from "../../interfaces/employees";

export default function getListBranches(): ListEmployeesDTO[] {
  return [
    { id: '1', name: 'Carlos', branch_name: 'Barueri', branch_id: '1' },
    { id: '2', name: 'Maria', branch_name: 'Barueri', branch_id: '1' },
    { id: '3', name: 'Joana', branch_name: 'Morumbi', branch_id: '3' },
    { id: '4', name: 'Priscila', branch_name: 'Barueri', branch_id: '1' },
  ]
}

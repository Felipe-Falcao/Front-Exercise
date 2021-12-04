import { ListEmployeesDTO } from './employees';

export interface ListBranchesDTO {
  id: string;
  name: string;
  total_staff: string;
}

export interface BranchFormData {
  name: string;
}

export interface Branch {
  id: string;
  name: string;
  total_staff: string;
  employees: ListEmployeesDTO[];
}

import React, { createContext, useCallback, useContext, useState } from 'react';
import { Branch } from '../interfaces/branches';
import { ListEmployeesDTO } from '../interfaces/employees';

interface AppContextData {
  getListBranches(): Branch[];
  getBranch(id: string): Branch;
  registerBranch(name: string): void;
  removeBranch(id: string): void;
  editBranch(id: string, name: string): void;
  getListEmployees(branchId: string): ListEmployeesDTO[] | any;
  getEmployee(branchId: string, employeeId: string): ListEmployeesDTO;
  registerEmployee(branchId: string, branchName: string, name: string): void;
  removeEmployee(id: string): void;
  editEmployee(name: string, branchName: string, id: string): void;
}

const AppContext = createContext<AppContextData>({} as AppContextData);

const AppContextProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<Branch[]>([]);
  const [dataEmployees, setDataEmployees] = useState<ListEmployeesDTO[]>([]);

  function updateStaff(id: string): void {
    let index = 0;
    data.find(item => {
      if (item.id === id) {
        index = data.indexOf(item)
        return index;
      }
      return null;
    })
    data[index].total_staff = `${parseInt(data[index].total_staff, 10) + 1}`;
    setData(data);
  }

  function getListBranches(): Branch[] {
    return data;
  }

  function getBranch(id: string): Branch {
    let index = 0;
    data.find(item => {
      if (item.id === id) {
        index = data.indexOf(item)
        return index;
      }
      return null;
    })
    return data[index];
  }

  function registerBranch(name: string): void {
    const id = Math.floor(Math.random() * 65536);
    const staff = 0;
    const registerData = { id: `${id}`, name, total_staff: `${staff}`, employees: [] };
    data.push(registerData);
    setData(data);
  }

  function removeBranch(id: string): void {
    let index = 0;
    data.find(item => {
      if (item.id === id) {
        index = data.indexOf(item)
        return index;
      }
      return null;
    })
    data.splice(index, 1);
    setData(data);
  }

  function editBranch(id: string, name: string): void {
    let index = 0;
    data.find(item => {
      if (item.id === id) {
        index = data.indexOf(item)
        return index;
      }
      return null;
    })
    data[index].name = name;
    setData(data);
  }

  function getListEmployees(branchId: string): ListEmployeesDTO[] | any {
    const list = []
    for (let i = 0; i < dataEmployees.length; i++) {
      if (dataEmployees[i].branch_id === branchId)
        list.push(dataEmployees[i]);
    }
    return list;
  }

  function getEmployee(branchId: string, employeeId: string): ListEmployeesDTO | any {
    let employee = null;
    for (let i = 0; i < dataEmployees.length; i++) {
      if (dataEmployees[i].branch_id === branchId && dataEmployees[i].id === employeeId)
        employee = dataEmployees[i]
    }
    return employee;
  }

  function registerEmployee(branchId: string, branchName: string, name: string): void {
    const registerData = { id: `${Math.floor(Math.random() * 65536)}`, name, branch_name: branchName, branch_id: branchId };
    dataEmployees.push(registerData);
    setDataEmployees(dataEmployees);
    updateStaff(branchId);
  }

  function removeEmployee(id: string): void {
    let index = 0;
    dataEmployees.find(item => {
      if (item.id === id) {
        index = dataEmployees.indexOf(item)
        return index;
      }
      return null;
    })
    dataEmployees.splice(index, 1);
    setDataEmployees(dataEmployees);
  }

  function editEmployee(name: string, branchName: string, id: string): void {
    let index = 0;
    dataEmployees.find(item => {
      if (item.id === id) {
        index = dataEmployees.indexOf(item)
        return index;
      }
      return null;
    })
    dataEmployees[index].name = name;
    dataEmployees[index].branch_name = branchName;
    setDataEmployees(dataEmployees);
  }

  return (
    <AppContext.Provider
      value={{
        getListBranches, getBranch, registerBranch, removeBranch, editBranch,
        getListEmployees, getEmployee, registerEmployee, removeEmployee, editEmployee,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

function useApp(): AppContextData {
  const context = useContext(AppContext);

  return context;
}

export { AppContextProvider, useApp };

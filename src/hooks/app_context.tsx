import React, { createContext, useCallback, useContext, useState } from 'react';
import { ListEmployeesDTO } from '../interfaces/employees';

interface Branch {
  id: string;
  name: string;
  total_staff: string;
  employees: ListEmployeesDTO[];
}

interface AppContextData {
  getListBranches(): Branch[];
  registerBranch(name: string): void;
  removeBranch(id: string): void;
  editBranch(id: string, name: string): void;
}

const AppContext = createContext<AppContextData>({} as AppContextData);

const AppContextProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<Branch[]>([]);

  function getListBranches(): Branch[] {
    return data;
  }

  function registerBranch(name: string): void {
    const registerData = { id: `${Math.floor(Math.random() * 65536)}`, name, total_staff: '0', employees: [] };
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

  return (
    <AppContext.Provider
      value={{ getListBranches, registerBranch, removeBranch, editBranch }}
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

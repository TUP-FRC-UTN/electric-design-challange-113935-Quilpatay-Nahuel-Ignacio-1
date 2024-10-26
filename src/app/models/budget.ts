export interface Budget {
  id?: string;
  client: string;
  date: Date;
  modules: BudgetModule[];
}

export interface BudgetModule {
  moduleType: ModuleType;
  zone: Zone;
}

export enum Zone {
  LIVING = 'Living',
  COMEDOR = 'Comedor',
  KITCHEN = 'Cocina',
  ROOM = 'Dormitorio',
}

export interface ModuleType {
  id: string;
  name: string;
  slots: number;
  price: number;
}

export interface GroupedModules {
  [key: string]: {
    modules: Array<{
      name: string;
      price: number;
      slots: number;
    }>;
  };
}

export interface User {
  id: string;
  name: string;
}

export interface Project {
  id?: number;
  name: string;
  personId: string;
  organization?: string;
  created?: number;
}

export interface ISearchPanel {
  users: User[];
  param: Project;
  setParam: (v: Project) => void;
}

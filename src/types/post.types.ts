export interface IPostChild {
  id: number;
  name: string;
}

export interface IPost {
  id: number;
  name: string;
  alias: string;
  date: string;
  rowCount: number;
  isImportant: boolean;
  childrens: IPostChild[];
} 
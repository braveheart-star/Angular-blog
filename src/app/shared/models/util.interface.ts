export interface LinksMeta {
  first: string;
  previous: string;
  next: string;
  last: string;
}

export interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface File {
  data: any;
  inProgress: boolean;
  progress: number;
}

import { LinksMeta, PaginationMeta } from './util.interface';

export interface UserData {
  items: User[];
  meta: PaginationMeta;
  links: LinksMeta;
}

export interface User {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  // confirmPassword?: string;
  role?: string;
  profileImage?: string;
}

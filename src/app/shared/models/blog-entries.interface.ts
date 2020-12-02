import { User } from './user-data.interface';
import { LinksMeta, PaginationMeta } from './util.interface';

export interface BlogEntry {
  id?: number;
  title?: string;
  slug?: string;
  description?: string;
  body?: string;
  createdAt?: Date;
  updatedAt?: Date;
  likes?: number;
  author?: User;
  headerImage?: string;
  publishedDate?: Date;
  isPublished?: boolean;
}

export interface BlogEntriesData {
  items: BlogEntry[];
  meta: PaginationMeta;
  links: LinksMeta;
}

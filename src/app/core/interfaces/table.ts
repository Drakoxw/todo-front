import { ResponseBase } from "./common";

export interface PageData<T> {
  items: T[],
  totalItems: number,
  page: number,
  pageSize: number
}
export interface PageResponse<T> extends ResponseBase<PageData<T>> {

}

export interface Pagination {
  page: number;
  pageSize: number;
  search: string;
}

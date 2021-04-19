export interface PagedApiResponse<T> {
  info: {
    count: number;
    pages: number;
    next?: string;
    prev?: string;
  };
  results: T[];
}

export interface PagedResponse<T> {
  info: {
    count: number;
    pages: number;
    nextPage?: string;
    prevPage?: string;
  };
  results: T[];
}

/* eslint-disable @typescript-eslint/ban-types */
type Optional<T> = {
  [P in keyof T]?: T[P];
};

export type RequestModel<
  T extends {
    path?: unknown;
    queryParameters?: unknown;
    headers?: unknown;
    payload?: unknown;
  },
> = {
  path?: Optional<T["path"]>;
  queryParameters?: Optional<T["queryParameters"]>;
  headers?: Optional<T["headers"]>;
  payload?: Optional<T["payload"]>;
};

import { AxiosPromise } from "axios";

export interface StandardResponse<T = any> {
  status: "success" | "error";
  message: string | null;
  data: T;
}

export type RequestFn<Request, Response> = (params: Request) => AxiosPromise<Response>;

import { BaseOption } from "./util";

export type User = {
  name: string;
  email: string;
};

export interface UpdateUserPayload extends BaseOption {
  name: string;
}

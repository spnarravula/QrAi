import * as t from "typeorm";

import { Helper } from "./helpers";

type excludedFields =
  | "setCreatedAt"
  | "setUpdatedAt"
  | "createdAt"
  | "updatedAt"
  | "deletedAt"
  | "id";

export type UserAttributes = Omit<User , excludedFields>;

@t.Entity("users")
export class User extends Helper.TimestampWithDeleted {
  public constructor(data?: UserAttributes) {
    super();
    if (!data) return;

    this.name = data.name;
    this.email = data.email;
    this.tokens = data.tokens;
    this.activated = data.activated;
  }

  @t.Column({ type: "varchar", length: 255 })
  name: string;

  @t.Column({ type: "varchar", length: 255 })
  email: string;

  @t.Column("int2")
  tokens: number;

  @t.Column("boolean")
  activated: boolean;
}

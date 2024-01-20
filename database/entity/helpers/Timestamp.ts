import * as t from "typeorm";

import { IDEntity } from "./id";

@t.Entity()
abstract class Base extends IDEntity {
  @t.CreateDateColumn()
  public createdAt: Date;

  @t.UpdateDateColumn()
  public updatedAt: Date;

  @t.BeforeInsert()
  public async setCreatedAt() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @t.BeforeUpdate()
  public async setUpdatedAt() {
    this.updatedAt = new Date();
  }
}

abstract class WithDeleted extends Base {
  @t.DeleteDateColumn()
  public deletedAt: Date;
}

export const Timestamp = {
  Timestamp: Base,
  TimestampWithDeleted: WithDeleted,
};

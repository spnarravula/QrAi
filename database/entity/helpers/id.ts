import * as t from "typeorm";

@t.Entity()
export abstract class IDEntity {
  @t.PrimaryGeneratedColumn()
  id: number;
}

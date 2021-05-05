import { Field } from 'src/repository/field';

export interface Entity {
  tableName(): string;
  primaryKey(): string;
  primaryKeyValue(): any;
  columns(): string[];
  columnValues(): string[];
  populateEntity(fields: Field[], row: any): void;
}

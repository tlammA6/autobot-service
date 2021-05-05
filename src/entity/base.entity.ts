import { Field } from 'src/repository/field';
import { Entity } from './entity';

export abstract class BaseEntity implements Entity {
  id(): number {
    return this[this.primaryKeyValue()];
  }

  tableName(): string {
    const tableName: string[] = this.constructor.name.split(/(?=[A-Z])/);
    // pop to remove the word Entity
    tableName.pop();
    return tableName.join('_').toUpperCase();
  }

  primaryKey(): string {
    return this.tableName() + '_ID';
  }

  primaryKeyValue(): any {
    for (const [key, value] of Object.entries(this)) {
      const column = this.inferColumnName(key);

      if (column == this.primaryKey()) {
        return value;
      }
    }

    return undefined;
  }

  columns(): string[] {
    const columns: string[] = [];

    for (const [key] of Object.entries(this)) {
      if (this.inferColumnName(key) != this.primaryKey()) {
        columns.push(this.inferColumnName(key));
      }
    }

    return columns;
  }

  columnValues(): string[] {
    const values: string[] = [];

    for (const [key, value] of Object.entries(this)) {
      if (this.inferColumnName(key) != this.primaryKey()) {
        values.push(this.inferValueType(value));
      }
    }

    return values;
  }

  populateEntity(fields: Field[], row: any): void {
    const props: string[] = [];

    for (const field of fields) {
      const prop = field.name.replace(/_([a-z])/g, function (g) {
        return g[1].toUpperCase();
      });

      this[prop] = row[field.name];
      props.push(prop);
    }
  }

  private inferColumnName(key: string): string {
    return key
      .split(/(?=[A-Z])/)
      .join('_')
      .toUpperCase();
  }

  private inferValueType(value: string | number): string {
    return typeof value == 'string' ? `'${value}'` : `${value}`;
  }
}

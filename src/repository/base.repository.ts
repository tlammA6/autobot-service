import { Client } from 'pg';
import { Field } from './Field';

export abstract class BaseRepository<Type> {
  abstract createEntity(): Type;

  async create(entity: Type): Promise<Type> | undefined {
    const query =
      `INSERT INTO ${this.tableName(entity)}` +
      `( ${this.tableColumns(entity).join(',')} )` +
      ` VALUES( ${this.tableColumnValues(entity).join(',')})` +
      ` RETURNING ${this.primaryKey(entity)}`;

    return await this.findOne((await this.queryWithResults(query))[0]);
  }

  async findAll(entity: Type): Promise<Type[]> {
    const query = `SELECT * FROM ${this.tableName(entity)}`;

    return await this.queryWithResults(query);
  }

  async findOne(entity: Type): Promise<Type> {
    this.mustHavePrimaryKeyValue(entity);

    const query =
      `SELECT * FROM ` +
      ` ${this.tableName(entity)} ` +
      ` ${this.buildWhereClause(entity)}`;

    return (await this.queryWithResults(query))[0];
  }

  async update(entity: Type): Promise<void> {
    this.mustHavePrimaryKeyValue(entity);

    const setValues: string[] = [];

    for (const [key, value] of Object.entries(entity)) {
      if (this.inferColumnName(key) != this.primaryKey(entity)) {
        setValues.push(
          `${this.inferColumnName(key)} = ${this.inferValueType(value)}`,
        );
      }
    }

    const query =
      `UPDATE ${this.tableName(entity)}  ` +
      ` SET ${setValues.join(', ')} ` +
      ` ${this.buildWhereClause} `;

    await this.queryNoReturn(query);
  }

  async delete(entity: Type): Promise<void> {
    this.mustHavePrimaryKeyValue(entity);

    const query =
      `DELETE FROM ` +
      ` ${this.tableName(entity)} ` +
      ` ${this.buildWhereClause(entity)}`;

    await this.queryNoReturn(query);
  }

  private async createClient(): Promise<Client> {
    const client: Client = new Client();
    await client.connect();
    return client;
  }

  private async queryNoReturn(query: string): Promise<void> {
    console.log(`Query: ${query}`);
    const client: Client = await this.createClient();
    await client
      .query(query)
      .then((result) => console.log(result))
      .catch((e) => console.error(e.stack))
      .then(() => client.end());
  }

  private async queryWithResults(query: string): Promise<Type[]> {
    console.log(`Query: ${query}`);

    const client: Client = await this.createClient();
    const entities: Type[] = [];
    await client
      .query(query)
      .then((result) => {
        const rows = result.rows;
        rows.forEach((row) => {
          entities.push(
            this.populateEntity(this.createEntity(), result.fields, row),
          );
        });
      })
      .catch((e) => console.error(e.stack))
      .then(() => client.end());

    return entities;
  }

  private populateEntity(entity: Type, fields: Field[], row: any): Type {
    const props: string[] = [];

    for (const field of fields) {
      const prop = field.name.replace(/_([a-z])/g, function (g) {
        return g[1].toUpperCase();
      });

      entity[prop] = row[field.name];
      props.push(prop);
    }

    console.info(`entity: ${Object.entries(entity)}`);

    return entity;
  }

  private tableName(entity: Type): string {
    const tableName: string[] = entity.constructor.name.split(/(?=[A-Z])/);
    tableName.pop();
    return tableName.join('_').toUpperCase();
  }

  private primaryKey(entity: Type): string {
    return this.tableName(entity) + '_ID';
  }

  private mustHavePrimaryKeyValue(entity: Type): void {
    if (!this.primaryKeyValue(entity)) {
      throw new Error(
        `${entity.constructor.name} missing ${this.primaryKey(entity)}`,
      );
    }
  }

  private primaryKeyValue(entity: Type): any {
    for (const [key, value] of Object.entries(entity)) {
      const column = this.inferColumnName(key);

      if (column == this.primaryKey(entity)) {
        return value;
      }
    }

    return undefined;
  }

  tableColumns(entity: Type): string[] {
    const columns: string[] = [];

    for (const [key] of Object.entries(entity)) {
      if (this.inferColumnName(key) != this.primaryKey(entity)) {
        columns.push(this.inferColumnName(key));
      }
    }

    return columns;
  }

  private tableColumnValues(entity: Type): string[] {
    const values: string[] = [];

    for (const [key, value] of Object.entries(entity)) {
      if (this.inferColumnName(key) != this.primaryKey(entity)) {
        values.push(this.inferValueType(value));
      }
    }

    return values;
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

  private buildWhereClause(entity: Type): string {
    return ` WHERE ${this.primaryKey(entity)} = ${this.primaryKeyValue(
      entity,
    )} `;
  }
}

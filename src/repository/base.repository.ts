import { Client } from 'pg';

export abstract class BaseRepository<Type> {
  abstract createEntity(row: any[]): Type;

  async create(entity: Type): Promise<Type> | undefined {
    const query =
      `INSERT INTO ${this.tableName(entity)}` +
      `( ${this.tableColumns(entity).join(',')} )` +
      ` VALUES( ${this.tableColumnValues(entity).join(',')})` +
      ` RETURNING ${this.primaryKey(entity)}`;

    console.log(`query: ${query}`);
    const entities: Type[] = await this.queryWithResults(query);

    return await this.findOne(entities[0]);
  }

  async findAll(entity: Type): Promise<Type[]> {
    const query = `SELECT * FROM ${this.tableName(entity)}`;
    return await this.queryWithResults(query);
  }

  async findOne(entity: Type): Promise<Type> | undefined {
    const query = `SELECT * FROM ${this.tableName(
      entity,
    )} ${this.buildWhereClause(entity)}`;
    const entities: Type[] = await this.queryWithResults(query);

    return entities && entities.length > 0 ? entities[0] : undefined;
  }

  async update(entity: Type): Promise<Type> {
    if (!this.primaryKeyValue(entity)) {
      throw new Error(
        `${entity.constructor.name} missing ${this.primaryKey(entity)}`,
      );
    }
    let setClause = '';

    for (const [key, value] of Object.entries(entity)) {
      const column = this.inferColumnName(key);

      if (column != this.primaryKey(entity)) {
        if (setClause.length != 0) {
          setClause = setClause + ', ';
        }

        setClause = setClause + `${column} = ${this.inferValueType(value)}`;
      }
    }

    const query = `UPDATE ${this.tableName(entity)} 
        SET ${setClause} ${this.buildWhereClause(entity)}`;
    console.log(`Update query: ${query}`);
    await this.queryNoReturn(query);

    return entity;
  }

  async delete(entity: Type): Promise<void> {
    if (!this.primaryKeyValue(entity)) {
      throw new Error(
        `${entity.constructor.name} is missing primary key value`,
      );
    }
    const query = `DELETE FROM ${this.tableName(
      entity,
    )} ${this.buildWhereClause(entity)}`;
    console.log(`Delete Query: ${query}`);
    await await this.queryNoReturn(query);
  }

  private async createClient(): Promise<Client> {
    const client: Client = new Client();
    await client.connect();
    return client;
  }

  private async queryNoReturn(query: string): Promise<void> {
    const client: Client = await this.createClient();
    await client
      .query(query)
      .then((result) => console.log(result))
      .catch((e) => console.error(e.stack))
      .then(() => client.end());
  }

  private async queryWithResults(query: string): Promise<Type[]> {
    const client: Client = await this.createClient();
    const entities: Type[] = [];

    try {
      const result = await client.query(query);
      const rows = result.rows;
      rows.forEach((row) => {
        entities.push(this.createEntity(row));
      });
    } catch (err) {
      console.error(err.stack);
    } finally {
      client.end();
    }
    console.log('entitycount: ' + entities.length);
    return entities;
  }

  private tableName(entity: Type): string {
    const tableName: string[] = entity.constructor.name.split(/(?=[A-Z])/);
    tableName.pop();
    return tableName.join('_').toUpperCase();
  }

  private primaryKey(entity: Type): string {
    return this.tableName(entity) + '_ID';
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

  private tableColumns(entity: Type): string[] {
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

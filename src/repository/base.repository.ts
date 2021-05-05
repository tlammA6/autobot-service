import { Client } from 'pg';
import { Entity } from 'src/entity/entity';

export abstract class BaseRepository<Type> {
  abstract createType(): Type;
  abstract convertToEntity(type: Type): Entity;

  async create(entity: Entity): Promise<Type> | undefined {
    const query =
      `INSERT INTO ${entity.tableName()}` +
      `( ${entity.columns().join(',')} )` +
      ` VALUES( ${entity.columnValues().join(',')})` +
      ` RETURNING ${entity.primaryKey()}`;

    return await this.findOne(
      this.convertToEntity((await this.runQuery(query))[0]),
    );
  }

  async findAll(entity: Entity): Promise<Type[]> {
    return await this.runQuery(`SELECT * FROM ${entity.tableName()}`);
  }

  async findOne(entity: Entity): Promise<Type> {
    const query =
      `SELECT * FROM ` +
      ` ${entity.tableName()} ` +
      ` ${this.buildWhereClause(entity)}`;

    return (await this.runQuery(query))[0];
  }

  async update(entity: Entity): Promise<void> {
    const setValues: string[] = [];

    for (let i = 0; i < entity.columns().length; i++) {
      setValues.push(entity.columns()[i] + ' = ' + entity.columnValues()[i]);
    }

    const query =
      `UPDATE ${entity.tableName()}  ` +
      ` SET ${setValues.join(', ')} ` +
      ` ${this.buildWhereClause} `;

    await this.runQuery(query);
  }

  async delete(entity: Entity): Promise<void> {
    const query =
      `DELETE FROM ` +
      ` ${entity.tableName()} ` +
      ` ${this.buildWhereClause(entity)}`;

    await this.runQuery(query);
  }

  private async createClient(): Promise<Client> {
    const client: Client = new Client();
    await client.connect();
    return client;
  }

  private async runQuery(query: string): Promise<Type[]> {
    console.log(`Query: ${query}`);

    const client: Client = await this.createClient();
    const entities: Type[] = [];
    await client
      .query(query)
      .then((result) => {
        const rows = result.rows;
        rows.forEach((row) => {
          const type: Type = this.createType();
          this.convertToEntity(type).populateEntity(result.fields, row);
          // entities.push(this.populateEntity(result.fields, row));
          entities.push(type);
        });
      })
      .catch((e) => console.error(e.stack))
      .then(() => client.end());

    return entities;
  }

  private buildWhereClause(entity: Entity): string {
    return ` WHERE ${entity.primaryKey()} = ${entity.primaryKeyValue()} `;
  }
}

import { Client } from 'pg';

export abstract class BaseRepository {
  client(): Client {
    const client: Client = new Client();
    client.connect();
    return client;
  }

  async query(query: string): Promise<any[]> {
    const client: Client = new Client();
    client.connect();

    try {
      const result = await client.query(query);
      return result.rows;
    } catch (err) {
      console.error(err.stack);
    } finally {
      client.end();
    }
  }

  async selectQuery(query: string, callback): Promise<any[]> {
    const client: Client = new Client();
    client.connect();
    const entities: any[] = [];

    try {
      const result = await client.query(query);
      const rows = result.rows;
      rows.forEach((row) => {
        entities.push(callback(row));
      });
    } catch (err) {
      console.error(err.stack);
    } finally {
      client.end();
    }
    console.log('entitycount: ' + entities.length);
    return entities;
  }
}

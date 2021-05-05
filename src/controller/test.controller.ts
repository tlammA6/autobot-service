import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TestService } from '../service/test.service';
import { TestEntity } from '../entity/test.entity';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  async generalTest(): Promise<any> {
    const testEntity: TestEntity = new TestEntity(23);
    // console.log(`entries: ${testEntity.primaryKeyValue()}`);
    return {
      tableName: testEntity.tableName(),
      primaryKey: testEntity.primaryKey(),
      primaryKeyValue: testEntity.primaryKeyValue(),
    };
  }
}

import { BaseEntity } from './base.entity';

export class TestEntity extends BaseEntity {
  constructor(testId?: number) {
    super();
    console.log('did it reach here: ' + testId);
    this.testId = testId;
  }

  testId: number;
  testName: string;
}

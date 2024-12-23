import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  async generateRandomExpenses() {
    const NUM_REC = 50;

    for (let i = 0; i <= NUM_REC; i++) {
      console.log(i);
    }
  }
}

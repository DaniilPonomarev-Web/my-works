import { Test } from '@nestjs/testing';
import { CheckoutService } from './checkout.service';

describe('CheckoutService', () => {
  let service: CheckoutService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CheckoutService],
    }).compile();

    service = module.get(CheckoutService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

import { Test } from '@nestjs/testing';
import { KeycloakService } from './keycloak.service';

describe('KeycloakService', () => {
  let service: KeycloakService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [KeycloakService],
    }).compile();

    service = module.get(KeycloakService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

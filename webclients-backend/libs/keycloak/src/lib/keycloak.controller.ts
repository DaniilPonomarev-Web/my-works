import { Controller } from '@nestjs/common';
import { KeycloakService } from './keycloak.service';

@Controller('keycloak')
export class KeycloakController {
  constructor(private keycloakService: KeycloakService) {}
}

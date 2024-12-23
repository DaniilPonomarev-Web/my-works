import { Module } from '@nestjs/common';
import { DashboardAdminService } from './dashboard-admin.service';
import { CheckoutModule } from '@erist-opt/checkout';
import { UserModule } from '@erist-opt/user';
import { ProductModule } from '@erist-opt/product';
import { DashboardAdminResolver } from './dashboard-admin.resolver';

@Module({
  imports: [CheckoutModule, UserModule, ProductModule],
  providers: [DashboardAdminService, DashboardAdminResolver],
  exports: [DashboardAdminService],
})
export class DashboardAdminModule {}

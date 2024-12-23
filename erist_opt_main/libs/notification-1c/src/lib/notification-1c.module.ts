import { Module } from '@nestjs/common';
import { Notification1cService } from './notification-1c.service';
import { KafkaModule } from '@erist-opt/kafka';
import { MinioLocalModule } from '@erist-opt/minio';

@Module({
  imports: [KafkaModule, MinioLocalModule],
  providers: [Notification1cService],
  exports: [Notification1cService],
})
export class Notification1cModule {}

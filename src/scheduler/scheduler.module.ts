import { Module } from '@nestjs/common';
import { SchedulerController } from './scheduler.controller';
import { SchedulerService } from './scheduler.service';
import { HttpPingProcessor } from './processors/httpPing.processor';
import { BullModule } from '@nestjs/bullmq';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

@Module({
  imports: [
    BullModule.registerQueue({
        name: 'httpPingQueue',
    }),
    BullBoardModule.forFeature({
        name: 'httpPingQueue',
        adapter: BullMQAdapter,
    }),
  ],
  controllers: [SchedulerController],
  providers: [SchedulerService, HttpPingProcessor],
  exports: [SchedulerService],
})
export class SchedulerModule {}
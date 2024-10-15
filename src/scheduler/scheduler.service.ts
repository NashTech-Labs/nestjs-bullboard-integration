import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue, JobsOptions } from 'bullmq';
import { CronExpression } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {
  constructor(@InjectQueue('httpPingQueue') private httpPingQueue: Queue) {}

  async createHttpPingJob(data: {
    url: string;
    method?: string;
    body?: string;
    headers?: string;
    cron?: CronExpression;
  }) {

    const jobOptions: JobsOptions = {};
    if(data.cron) {
      jobOptions.repeat = { pattern: data.cron };
    }

    await this.httpPingQueue.add('ping', data, jobOptions);
  }
}
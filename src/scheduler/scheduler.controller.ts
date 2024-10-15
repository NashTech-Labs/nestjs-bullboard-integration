import { Controller, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { CreateHttpPingJobDto } from './dtos/create-http-ping-job.dto';

@Controller('scheduler')
export class SchedulerController {
    constructor(private readonly schedulerService: SchedulerService) {}

    @Post('http-ping')
    @UsePipes(new ValidationPipe({ transform: true }))
    async createHttpPingJob(@Body() createHttpPingJobDto: CreateHttpPingJobDto) {
        await this.schedulerService.createHttpPingJob(createHttpPingJobDto);

        return {
            message: 'Job created successfully',
            data: createHttpPingJobDto,
        };
    }
}
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { CronExpression } from '@nestjs/schedule';

export class CreateHttpPingJobDto {
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  method: string;

  @IsOptional()
  @IsString()
  body: string;

  @IsOptional()
  @IsString()
  headers: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  cron: CronExpression;
}
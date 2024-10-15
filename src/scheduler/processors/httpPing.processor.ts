import { Processor, WorkerHost } from '@nestjs/bullmq';
import axios from 'axios';
import { Job } from 'bullmq';
import { stat } from 'fs';

@Processor('httpPingQueue')
export class HttpPingProcessor extends WorkerHost {

  async process(job: Job) {
    console.log('Processing job', job.id);
    const { data } = job;
    const { url, method, body, headers } = data;
    try {
      const response = await axios.request({
        url,
        method,
        data: body,
        headers: headers ? JSON.parse(headers) : {},
      });
      
      console.log('Response: ', response.status, response.statusText);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
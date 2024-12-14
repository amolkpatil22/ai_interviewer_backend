import { Injectable } from '@nestjs/common';
import { AxiosService } from './axios_interceptor/axios_interceptor.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private readonly axiosService: AxiosService;
  constructor(private configService: ConfigService) {
    this.axiosService = new AxiosService(configService, 'own');
  }
  getHello(): string {
    return 'ai_interviewer_server is working';
  }

  dontSleep() {
    setTimeout(
      () => {
        console.log(`request Triggered${new Date()}`);
        this.axiosService.post('/');
      },
      10 * 1000,
    );
    return true;
  }
}

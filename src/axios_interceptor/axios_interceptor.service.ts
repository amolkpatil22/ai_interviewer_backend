// src/common/services/axios.service.ts
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';

export const BaseAPI = {
  chatGpt: 'https://api.openai.com/v1/chat',
};

@Injectable()
export class AxiosService {
  private axiosInstance: AxiosInstance;

  constructor(
    private readonly configService: ConfigService,
    private readonly baseUrlKey: keyof typeof BaseAPI,
  ) {
    const baseUrl = BaseAPI[baseUrlKey];
    if (!baseUrl) {
      throw new Error(`Invalid base URL key: ${baseUrlKey}`);
    }

    // Create Axios instance
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = this.configService.get<string>('GPT_TOKEN');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
      },
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        console.error('Response Error:', error.response.data);

        const status = error.response?.status;
        if (status === 401) {
          throw new UnauthorizedException('Unauthorized access');
        }
        if (status >= 400 && status < 500) {
          throw new BadRequestException(
            error.response?.data?.message || 'Client error occurred',
          );
        }
        if (status >= 500) {
          throw new BadRequestException('Server error occurred');
        }
        return Promise.reject(error);
      },
    );
  }

  // GET request
  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(url, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // POST request
  async post<T>(url: string, data?: Record<string, any>): Promise<T> {
    try {
      const response = await this.axiosInstance.post<T>(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

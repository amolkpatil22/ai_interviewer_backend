// src/common/services/axios.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

export const BaseAPI= {
  chatGpt: 'https://api.openai.com/v1/chat/completions',
};

@Injectable()
export class AxiosService {
  private axiosInstance: AxiosInstance;
  private readonly configService: ConfigService;
  
  constructor(baseUrl: keyof typeof BaseAPI) {
    // Create Axios instance
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.configService.get('GPT_TOKEN');
        if (token) {
          // Add Authorization header if token exists
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
      },
    );

    // response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        console.error('Response Error:', error);

        if (error.response?.status === 401) {
          throw new BadRequestException('Unauthorized access');
        }
        return Promise.reject(error);
      },
    );
  }

  async get<T>(url?: string, params?: any): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(url, { params });
      return response.data;
    } catch (error) {
      throw new BadRequestException('Error fetching data');
    }
  }

  async post<T>(url?: string, data?: any): Promise<T> {
    try {
      const response = await this.axiosInstance.post<T>(url, data);
      return response.data;
    } catch (error) {
      throw new BadRequestException('Error posting data');
    }
  }
}

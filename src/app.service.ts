import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

    getWelcomeMessage(): string {
        return 'Welcome to our API!';
    }

    getHealthStatus(): string {
        return 'API is up and running!';
    }

    getVersion(): string {
        return 'v1.0.0';
    }

    getEnv(): string {
        return process.env.NODE_ENV || 'local';
    }
}

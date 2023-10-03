import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinoLoggerService } from 'src/main';
import { DataSource } from 'typeorm';

const ENV = process.env.NODE_ENV || 'local';

@Injectable()
export class DatabaseService {
    private dataSource: DataSource;
    private readonly logger: PinoLoggerService;

    constructor(
        private readonly configService: ConfigService,
    ) {
        this.logger = new PinoLoggerService();
        this.logger.setContext(this.constructor.name);
        this.logger.log(`🔍 INITIALIZING DATABASE CONNECTION... to. ${ENV.toUpperCase()}`);
        this.initDataSource();
        this.testConnection();
        this.logger.log(`✅ DATABASE CONNECTION INITIALIZED! 🎉🎉🎉`);
    }

    private initDataSource() {
        try {
            this.dataSource = new DataSource({
                type: 'mysql',
                host: this.configService.get<string>('DATABASE_HOST') || 'localhost',
                port: this.configService.get<number>('DATABASE_PORT') || 3306,
                username: this.configService.get<string>('DATABASE_USER') || 'root',
                password: this.configService.get<string>('DATABASE_PASSWORD') || '1234',
                database: this.configService.get<string>('DATABASE_NAME') || 'WoofMeow',
                entities: [__dirname + '../**/*.entity{.ts,.js}'],
            });
        } catch (error) {
            this.logger.error(`❌ DATABASE CONNECTION ERROR! ${error.message}`, error.stack);
        }
    }

    async testConnection(): Promise<void> {
        try {
            await this.dataSource.initialize();
        } catch (error) {
            this.logger.error(`❌ DATABASE CONNECTION ERROR! ${error.message}`, error.stack);
        }
    }
}

import { RequestMethod } from "@nestjs/common";

const { NODE_ENV = 'local' } = process.env;

export const loggerConfig = {
    pinoHttp: {
        redact: ['req.headers.authorization'],
        serializers: {
            req: () => ({}),
            res: () => ({}),
        },
        base: null,
        hooks: {
            logMethod: function (args: any[], method) {
                const currentTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                const originalMessage = args[1] || '';

                let contextOrMethodUrl = '';

                if (args[0].context) { // context is set when using the LoggerService
                    contextOrMethodUrl = `[${args[0].context}]`;
                } else {
                    const reqMethod = args[0]?.res?.req?.method || 'UNKNOWN_METHOD';
                    const reqUrl = args[0]?.res?.req?.url || 'UNKNOWN_URL';
                    contextOrMethodUrl = `[${reqMethod}] [${reqUrl}]`;
                }

                const formattedMessage = `[${currentTime}] - [${this.level.toUpperCase()}] (PID: ${process.pid}) [${NODE_ENV.toUpperCase()}] - ${contextOrMethodUrl} - ${originalMessage}`;

                const newArgs = [formattedMessage];

                method.apply(this, newArgs);
            }
        },
    },
    exclude: [
        { path: 'health', method: RequestMethod.ALL },
        { path: '/api-docs/(.*)', method: RequestMethod.ALL },
        { path: '/api-docs', method: RequestMethod.ALL },
        { path: 'api/version', method: RequestMethod.ALL },
    ],
}

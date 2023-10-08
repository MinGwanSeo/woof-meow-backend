import { RequestMethod } from "@nestjs/common";
import { IncomingMessage, ServerResponse } from 'http';

const { NODE_ENV = 'local' } = process.env;
/**
 * @description
 * This is the configuration for the logger.
 * It is used in the main.ts file to configure the logger.
 *
 * @see https://github.com/pinojs/pino
 * @see https://github.com/pinojs/pino-pretty
 */
export const loggerConfig = {
    pinoHttp: {
        level: NODE_ENV === 'local' ? 'debug' : 'info',
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                ignore: 'pid,hostname',
                singleLine: true,
            }
        },
        redact: ['req.headers.authorization'],
        serializers: {
            req: (req: Record<string, string | number | any>) => ({
                method: req.method,
                url: req.url,
                query: req.query,
                body: req.body,
            }),
            res: (res: Record<string, string | number | any>) => ({
                statusCode: res.statusCode,
                body: res.body,
            }),

        },
        base: null,
        hooks: {
            logMethod: function (args: Record<string, string | number | any>, method: Function) {
                const originalMessage = args[1] || '';

                let contextOrMethodUrl = '';

                if (args[0].context) { // context is set when using the LoggerService
                    contextOrMethodUrl = `[${args[0].context}]`;
                } else {
                    const reqMethod = args[0]?.res?.req?.method || 'UNKNOWN_METHOD';
                    const reqUrl = args[0]?.res?.req?.url || 'UNKNOWN_URL';
                    contextOrMethodUrl = `[${reqMethod}] [${reqUrl}]`;
                }

                const formattedMessage = `${process.pid} ${contextOrMethodUrl} - ${originalMessage}`;

                const newArgs = [formattedMessage];

                method.apply(this, newArgs);
            }
        },
    },
    exclude: [
        // { path: 'health', method: RequestMethod.ALL },
        { path: '/api-docs/(.*)', method: RequestMethod.ALL },
        { path: '/api-docs', method: RequestMethod.ALL },
        { path: 'api/version', method: RequestMethod.ALL },
    ],
}

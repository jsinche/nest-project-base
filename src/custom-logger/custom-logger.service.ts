import { Injectable } from '@nestjs/common';
import { format, createLogger, Logger, transports } from 'winston';
import 'winston-daily-rotate-file';
import * as fs from 'fs';
import * as path from 'path';
import { GetLogsByTypeDto } from './dto/get-logs-by-type.dto';
@Injectable()
export class CustomLoggerService {
  private loggerInfo: Logger;
  private loggerError: Logger;
  private logDirectory = 'logs';
  constructor() {
    this.createLoggers();
  }
  async getLogsByType(getLogsByTypeDto: GetLogsByTypeDto) {
    const { type } = getLogsByTypeDto;
    const logPath = path.join(this.logDirectory, type);
    const files = await fs.promises.readdir(logPath);
    const logFiles = files.filter((file) => file.endsWith('.log'));
    const logs: any[] = [];
    for (const file of logFiles) {
      const filePath = path.join(logPath, file);
      const content = await fs.promises.readFile(filePath, 'utf8');
      const lines = content.split('\n').filter((line) => line.trim() !== '');
      lines.forEach((line) => {
        const logMatch = line.match(
          /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) - \[(\w)\] \[([^\]]+)\] (.*)$/,
        );
        if (logMatch) {
          const [fullMessage, date, type, context, message] = logMatch;
          logs.push({
            fullMessage,
            date,
            type,
            context,
            message: this.parseMessage(message),
          });
        }
      });
    }
    return logs;
  }
  private parseMessage(message: string): string | object {
    try {
      const parsedMessage = JSON.parse(message);
      return parsedMessage;
    } catch {
      return message;
    }
  }

  createLoggers() {
    const dateFormat = format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    });

    const textFormat = format.printf((log) => {
      return `${log.timestamp} - [${log.level.toUpperCase().charAt(0)}] ${log.context ? `[${log.context}] ` : ''}${log.message}`;
    });

    this.loggerInfo = createLogger({
      level: 'info',
      format: format.combine(dateFormat, textFormat),
      transports: [
        new transports.DailyRotateFile({
          filename: 'logs/info/info-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '7d',
        }),
      ],
    });

    this.loggerError = createLogger({
      level: 'error',
      format: format.combine(dateFormat, textFormat),
      transports: [
        new transports.DailyRotateFile({
          filename: 'logs/error/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '7d',
        }),
      ],
    });
  }

  info(context: string, message: string) {
    this.loggerInfo.info(message, { context });
  }

  error(context: string, message: string) {
    this.loggerError.error(message, { context });
  }
}

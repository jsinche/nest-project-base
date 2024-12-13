import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const domain = req.headers['host'] || '';
    const tenant = this.getTenantFromDomain(domain);

    if (!tenant) {
      throw new Error('Tenant not found');
    }

    req['tenant'] = tenant;
    next();
  }

  private getTenantFromDomain(domain: string): string {
    return domain.split('.')[0];
  }
}

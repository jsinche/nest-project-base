import { IsIn } from 'class-validator';

export class GetLogsByTypeDto {
  @IsIn(['error', 'info'])
  type: string;
}

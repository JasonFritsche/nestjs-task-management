import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly AllowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];
  transform(value: any) {
    if (!this._isStatusValid(value)) {
      throw new BadRequestException(`Status: ${value} is an invalid status.`);
    }

    return value;
  }

  private _isStatusValid(status: any) {
    const idx = this.AllowedStatuses.indexOf(status);
    return idx !== -1;
  }
}

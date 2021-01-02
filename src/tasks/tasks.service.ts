import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Array<Task> = [];

  public getAllTasks(): Array<Task> {
    return this.tasks;
  }

  public getTaskById(taskId: string): Task {
    return this.tasks.find((task) => task.id === taskId);
  }

  public createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  public deleteTask(taskId: string): void {
    const task = this.getTaskById(taskId);
    if (task) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    }
  }
}

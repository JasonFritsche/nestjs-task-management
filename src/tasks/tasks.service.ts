import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { stat } from 'fs';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private _taskRepository: TaskRepository,
  ) {}
  // public getAllTasks(): Array<Task> {
  //   return this.tasks;
  // }

  // public getTaskById(taskId: string): Task {
  //   const found = this.tasks.find((task) => task.id === taskId);

  //   if (!found) {
  //     throw new NotFoundException(`Task with id ${taskId} not found`);
  //   } else {
  //     return found;
  //   }
  // }

  async getTaskById(taskId: number): Promise<Task> {
    const found = await this._taskRepository.findOne(taskId);

    if (!found) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }

    return found;
  }

  // public getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, searchTerm } = filterDto;

  //   let tasks = this.getAllTasks();

  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   if (searchTerm) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(searchTerm) ||
  //         task.description.includes(searchTerm),
  //     );
  //   }

  //   return tasks;
  // }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this._taskRepository.createTask(createTaskDTO);
  }

  async deleteTask(taskId: number): Promise<string> {
    const found = await this._taskRepository.findOne(taskId);

    if (!found) {
      throw new NotFoundException(
        `Task with id ${taskId} not found. Unable to delete`,
      );
    }
    await this._taskRepository.delete(taskId);
    return `Task with id ${taskId} was successfully deleted`;
  }

  // public deleteTask(taskId: string): void {
  //   const task = this.getTaskById(taskId);
  //   if (task) {
  //     this.tasks = this.tasks.filter((task) => task.id !== taskId);
  //   }
  // }

  // public updateTaskStatus(taskId: string, newStatus: TaskStatus): Task {
  //   const task = this.getTaskById(taskId);
  //   task.status = newStatus;
  //   return task;
  // }
}
